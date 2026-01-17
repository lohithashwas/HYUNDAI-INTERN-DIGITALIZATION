import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CHECKLIST_SCHEMA } from '../data/checklistSchema';

export const generatePDF = (checklist) => {
    const doc = new jsPDF();

    // Title
    doc.setFillColor(0, 44, 95); // Hyundai Blue
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("HYUNDAI", 14, 25);
    doc.setFontSize(14);
    doc.text("Reach Stacker Digital Checklist", 200, 25, { align: 'right' });

    // Metadata
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(`Date: ${checklist.date}`, 14, 50);
    doc.text(`Time: ${checklist.timestamp ? new Date(checklist.timestamp).toLocaleTimeString() : '-'}`, 14, 56);
    doc.text(`Operator: ${checklist.operatorName || 'Sattva Staff'}`, 14, 62);
    doc.text(`Status: ${checklist.status || 'Submitted'}`, 200, 50, { align: 'right' });

    // Prepare Table Data
    const rows = [];
    CHECKLIST_SCHEMA.forEach(section => {
        // Section Header Row
        rows.push([{ content: section.title, colSpan: 3, styles: { fillColor: [220, 220, 220], fontStyle: 'bold' } }]);

        section.items.forEach(item => {
            const status = checklist.items && checklist.items[item.id] ? checklist.items[item.id].status : 'N/A';
            const remarks = checklist.items && checklist.items[item.id] ? checklist.items[item.id].remarks : '';

            // Colorize NO/NOT OK
            let statusStyle = {};
            if (status === 'NOT OK') statusStyle = { textColor: [255, 0, 0], fontStyle: 'bold' };
            if (status === 'OK') statusStyle = { textColor: [0, 100, 0] };

            rows.push([
                item.label,
                { content: status, styles: statusStyle },
                remarks
            ]);
        });
    });

    doc.autoTable({
        startY: 70,
        head: [['Inspection Item', 'Status', 'Remarks']],
        body: rows,
        theme: 'grid',
        headStyles: { fillColor: [0, 44, 95] },
        styles: { fontSize: 10, cellPadding: 3 },
    });

    // Signature
    let finalY = doc.lastAutoTable.finalY + 15;
    if (checklist.signature) {
        // Add signature image
        try {
            doc.addImage(checklist.signature, 'PNG', 14, finalY, 60, 30);
            doc.text("Operator Signature", 14, finalY + 35);
        } catch (e) {
            console.error("Error adding signature to PDF", e);
            doc.text("(Signature Image Error)", 14, finalY + 10);
        }
    } else {
        doc.text("(No Signature Provided)", 14, finalY + 10);
    }

    // Save
    doc.save(`Hyundai_Checklist_${checklist.date}.pdf`);
};

export const exportToExcel = (checklists) => {
    // Flatten data
    const data = checklists.map(c => {
        const flat = {
            Date: c.date,
            Operator: c.operatorName,
        };

        CHECKLIST_SCHEMA.forEach(section => {
            section.items.forEach(item => {
                flat[item.label] = c.items && c.items[item.id] ? c.items[item.id].status : '-';
                if (c.items && c.items[item.id] && c.items[item.id].remarks) {
                    flat[`${item.label} Remarks`] = c.items[item.id].remarks;
                }
            });
        });

        return flat;
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Checklists");
    XLSX.writeFile(wb, "Hyundai_Checklists_Export.xlsx");
};
