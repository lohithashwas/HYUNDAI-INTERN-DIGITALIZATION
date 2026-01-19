import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CHECKLIST_SCHEMA } from '../data/checklistSchema';
import { FORKLIFT_CHECKLIST_SCHEMA } from '../data/forkliftChecklistSchema';

const getSchema = (checklist) => {
    return checklist.portalType === 'forklift' ? FORKLIFT_CHECKLIST_SCHEMA : CHECKLIST_SCHEMA;
};

export const generatePDF = (checklist, returnDoc = false) => {
    const doc = new jsPDF();
    const isForklift = checklist.portalType === 'forklift';
    const schema = getSchema(checklist);
    const title = isForklift ? "TVS" : "HYUNDAI";
    const subTitle = isForklift ? "DAILY CHECKLIST FOR DIESEL FORKLIFT" : "REACH STACKER DIGITAL CHECKLIST";
    const primaryColor = isForklift ? [233, 69, 96] : [0, 44, 95]; // Red vs Blue

    // --- 1. Top Header Banner ---
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(title, 14, 13);
    doc.setFontSize(10);
    const pageWidth = doc.internal.pageSize.width;
    doc.text(subTitle, pageWidth - 14, 13, { align: 'right' });

    // --- 2. Info Header Table (Grid Layout) ---
    const infoBody = [];

    // Row 1
    infoBody.push([
        { content: 'Company:', styles: { fontStyle: 'bold' } },
        { content: isForklift ? 'TVS' : 'Hyundai', styles: { fontStyle: 'normal' } },
        { content: 'Date:', styles: { fontStyle: 'bold' } },
        { content: checklist.date, styles: { fontStyle: 'normal' } }
    ]);

    // Row 2
    infoBody.push([
        { content: 'Equipment:', styles: { fontStyle: 'bold' } },
        { content: isForklift ? 'Diesel Forklift' : 'Reach Stacker', styles: { fontStyle: 'normal' } },
        { content: 'Time:', styles: { fontStyle: 'bold' } },
        { content: checklist.timestamp ? new Date(checklist.timestamp).toLocaleTimeString() : '-', styles: { fontStyle: 'normal' } }
    ]);

    // Row 3 (Specifics)
    if (isForklift) {
        infoBody.push([
            { content: 'Forklift ID:', styles: { fontStyle: 'bold' } },
            { content: checklist.forkliftId || '-', styles: { fontStyle: 'normal' } },
            { content: 'Shop Code:', styles: { fontStyle: 'bold' } },
            { content: 'C1Y', styles: { fontStyle: 'normal' } }
        ]);
        infoBody.push([
            { content: 'Operator ID:', styles: { fontStyle: 'bold' } },
            { content: checklist.idNumber || '-', styles: { fontStyle: 'normal' } },
            { content: 'Contract:', styles: { fontStyle: 'bold' } },
            { content: 'TV65C3', styles: { fontStyle: 'normal' } }
        ]);
    } else {
        infoBody.push([
            { content: 'Shop Code:', styles: { fontStyle: 'bold' } },
            { content: 'HMI', styles: { fontStyle: 'normal' } },
            { content: 'Contract:', styles: { fontStyle: 'bold' } },
            { content: 'C1Y', styles: { fontStyle: 'normal' } }
        ]);
        infoBody.push([
            { content: 'Operator:', styles: { fontStyle: 'bold' } },
            { content: checklist.operatorName || 'Sattva Operator', styles: { fontStyle: 'normal' } },
            { content: 'Reach Stacker No:', styles: { fontStyle: 'bold' } },
            { content: checklist.reachStackerId || '-', styles: { fontStyle: 'normal' } }
        ]);
    }

    doc.autoTable({
        startY: 25,
        body: infoBody,
        theme: 'grid',
        styles: {
            fontSize: 9,
            cellPadding: 3,
            lineColor: [200, 200, 200],
            textColor: [0, 0, 0]
        },
        columnStyles: {
            0: { cellWidth: 30, fillColor: [240, 240, 240] },
            1: { cellWidth: 65 },
            2: { cellWidth: 30, fillColor: [240, 240, 240] },
            3: { cellWidth: 65 }
        }
    });

    // --- 3. Main Checklist Table ---
    const rows = [];
    let sectionCounter = 1;

    schema.forEach(section => {
        rows.push([{
            content: `${sectionCounter}. ${section.title}`,
            colSpan: 4,
            styles: {
                fillColor: [230, 230, 230],
                fontStyle: 'bold',
                halign: 'left',
                textColor: [0, 0, 0]
            }
        }]);
        sectionCounter++;

        section.items.forEach((item, idx) => {
            const itemData = checklist.items && checklist.items[item.id];
            const status = itemData ? itemData.status : 'N/A';
            const remarks = itemData ? itemData.remarks : '';
            const hasAudio = itemData && itemData.audio ? '[Audio Note]' : '';

            let finalRemarks = remarks;
            if (hasAudio) finalRemarks = finalRemarks ? `${finalRemarks} ${hasAudio}` : hasAudio;

            let statusStyle = { halign: 'center', fontStyle: 'bold' };
            if (status === 'NOT OK') statusStyle = { ...statusStyle, textColor: [200, 0, 0] };
            else if (status === 'OK') statusStyle = { ...statusStyle, textColor: [0, 100, 0] };

            rows.push([
                idx + 1,
                item.label,
                { content: status, styles: statusStyle },
                finalRemarks
            ]);
        });
    });

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 5,
        head: [['S.No', 'Check Points / Activity', 'Status', 'Remarks']],
        body: rows,
        theme: 'grid',
        headStyles: {
            fillColor: primaryColor,
            halign: 'center',
            fontStyle: 'bold',
            fontSize: 10
        },
        styles: {
            fontSize: 9,
            cellPadding: 3,
            valign: 'middle',
            lineColor: [200, 200, 200]
        },
        columnStyles: {
            0: { cellWidth: 15, halign: 'center' },
            1: { cellWidth: 90, cellPadding: { top: 3, bottom: 3, left: 2, right: 2 } },
            2: { cellWidth: 25 },
            3: { cellWidth: 55 }
        }
    });

    // --- 4. Signatures Area ---
    let finalY = doc.lastAutoTable.finalY + 10;
    if (finalY > 250) {
        doc.addPage();
        finalY = 20;
    }

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    doc.setDrawColor(150, 150, 150);
    doc.rect(15, finalY, 80, 40);
    doc.setFont("helvetica", "bold");
    doc.text(isForklift ? "Forklift Operator" : "Operator", 20, finalY + 8);
    doc.setFont("helvetica", "normal");

    const opSig = isForklift ? checklist.operatorSignature : checklist.signature;
    if (opSig) {
        try { doc.addImage(opSig, 'PNG', 20, finalY + 10, 70, 25); } catch (e) { }
    } else {
        doc.setFontSize(8);
        doc.text("(Not Signed)", 20, finalY + 25);
    }

    doc.rect(110, finalY, 80, 40);
    doc.setFont("helvetica", "bold");
    doc.text(isForklift ? "TVS Supervisor" : "Supervisor", 115, finalY + 8);
    doc.setFont("helvetica", "normal");

    const supSig = isForklift ? checklist.supervisorSignature : null;
    if (supSig) {
        try { doc.addImage(supSig, 'PNG', 115, finalY + 10, 70, 25); } catch (e) { }
    } else if (isForklift) {
        doc.setFontSize(8);
        doc.text("(Not Signed)", 115, finalY + 25);
    } else {
        doc.setFontSize(8);
        doc.text("(N/A)", 115, finalY + 25);
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Generated by Hyundai Digital Checklist Portal - ${new Date().toLocaleDateString()}`, 105, 290, { align: 'center' });
    }

    if (returnDoc) return doc;
    doc.save(`${title}_Checklist_${checklist.date}.pdf`);
};

export const exportToExcel = (checklists) => {
    const data = checklists.map(c => {
        const isForklift = c.portalType === 'forklift';
        const schema = getSchema(c);
        const flat = {
            Type: isForklift ? 'Forklift' : 'Reach Stacker',
            Date: c.date,
            Operator: c.operatorName || (isForklift ? 'Forklift Operator' : 'Sattva Staff'),
            ...(isForklift ? { 'Vehicle ID': c.forkliftId } : {}),
            ...(!isForklift ? { 'Reach Stacker No': c.reachStackerId } : {})
        };

        schema.forEach(section => {
            section.items.forEach(item => {
                const itemData = c.items && c.items[item.id];
                flat[item.label] = itemData ? itemData.status : '-';
                if (itemData?.remarks) {
                    flat[`${item.label} Remarks`] = itemData.remarks;
                }
                if (itemData?.audio) {
                    flat[`${item.label} Audio`] = "Yes";
                }
            });
        });
        return flat;
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Checklists");
    XLSX.writeFile(wb, "Checklists_Export.xlsx");
};
