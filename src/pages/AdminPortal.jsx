import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { generatePDF, exportToExcel } from '../utils/exportUtils';
import { useNavigate } from 'react-router-dom';
import { Filter, RefreshCcw, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AdminPortal = () => {
    const { t, language } = useLanguage();
    const [checklists, setChecklists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState('');
    const navigate = useNavigate();

    const localT = {
        en: {
            dashboard: "Admin Dashboard",
            reports: "Daily Checklist Reports",
            filter: "Filter Date",
            clear: "Clear",
            refresh: "Refresh",
            export: "Export All to Excel",
            type: "Type",
            date: "Date",
            operator: "Operator",
            time: "Time",
            status: "Status",
            actions: "Actions",
            view: "View",
            delete: "Delete",
            close: "Close",
            noData: "No submissions found matching criteria.",
            confirmDelete: "Are you sure you want to DELETE the checklist for",
            enterPwd: "Enter Admin Password to Delete:",
            deleted: "Deleted successfully.",
            forkliftDeleted: "Forklift checklist deleted successfully.",
            incorrectPwd: "Incorrect Password!",
            audio: "Audio Note"
        },
        ta: {
            dashboard: "நிர்வாகக் குழு",
            reports: "தினசரி அறிக்கைகள்",
            filter: "தேதியை வடிகட்டவும்",
            clear: "அழி",
            refresh: "புதுப்பி",
            export: "எக்செல் ஏற்றுமதி",
            type: "வகை",
            date: "தேதி",
            operator: "ஆபரேட்டர்",
            time: "நேரம்",
            status: "நிலை",
            actions: "செயல்கள்",
            view: "பார்வை",
            delete: "அழி",
            close: "மூடு",
            noData: "தரவு எதுவும் இல்லை.",
            confirmDelete: "நீங்கள் நிச்சயமாக நீக்க விரும்புகிறீர்களா",
            enterPwd: "நீக்க நிர்வாக கடவுச்சொல்லை உள்ளிடவும்:",
            deleted: "வெற்றிகரமாக நீக்கப்பட்டது.",
            forkliftDeleted: "ஃபோர்க்லிஃப்ட் பட்டியல் நீக்கப்பட்டது.",
            incorrectPwd: "தவறான கடவுச்சொல்!",
            audio: "ஆடியோ குறிப்பு"
        },
        hi: {
            dashboard: "एडमिन डैशबोर्ड",
            reports: "दैनिक चेकलिस्ट रिपोर्ट",
            filter: "दिनांक फ़िल्टर",
            clear: "साफ़ करें",
            refresh: "रिफ्रेश",
            export: "एक्सेल में निर्यात करें",
            type: "प्रकार",
            date: "दिनांक",
            operator: "ऑपरेटर",
            time: "समय",
            status: "स्थिति",
            actions: "क्रियाएँ",
            view: "देखें",
            delete: "हटाएं",
            close: "बंद करें",
            noData: "कोई डेटा नहीं मिला।",
            confirmDelete: "क्या आप वाकई इसे हटाना चाहते हैं",
            enterPwd: "हटाने के लिए एडमिन पासवर्ड दर्ज करें:",
            deleted: "सफलतापूर्वक हटा दिया गया।",
            forkliftDeleted: "फोर्कलिफ्ट चेकलिस्ट हटा दी गई।",
            incorrectPwd: "गलत पासवर्ड!",
            audio: "ऑडियो नोट"
        }
    };
    const lt = (key) => localT[language]?.[key] || localT['en'][key];

    const loadData = async () => {
        setLoading(true);
        try {
            const [sattvaData, forkliftData] = await Promise.all([
                api.getChecklists(),
                api.getForkliftChecklists()
            ]);

            // Normalize data (add portalType if missing for legacy sattva)
            const sattvaNormalized = sattvaData.map(d => ({ ...d, portalType: 'sattva' }));

            const combined = [...sattvaNormalized, ...forkliftData];

            // Sort descending by date
            combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setChecklists(combined);
        } catch (e) {
            console.error("Error loading data", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filtered = filterDate
        ? checklists.filter(c => c.date === filterDate)
        : checklists;

    const [viewingChecklist, setViewingChecklist] = useState(null);

    const handlePrint = (checklist) => {
        // Generate PDF and open in new window to print
        const doc = generatePDF(checklist, true); // true = return doc, don't save
        if (doc) doc.autoPrint();
        if (doc) window.open(doc.output('bloburl'), '_blank');
    };

    const handleDelete = async (checklist) => {
        if (!window.confirm(`${lt('confirmDelete')} ${checklist.date}?`)) {
            return;
        }

        const password = prompt(lt('enterPwd'));
        if (password === "123") {
            try {
                if (checklist.portalType === 'forklift') {
                    await api.deleteForkliftChecklist(checklist.firebaseId);
                    alert(lt('forkliftDeleted'));
                    loadData();
                } else {
                    await api.deleteChecklist(checklist.firebaseId);
                    alert(lt('deleted'));
                    loadData();
                }
            } catch (e) {
                alert("Failed to delete: " + e.message);
            }
        } else {
            alert(lt('incorrectPwd'));
        }
    };

    return (
        <div className="container">
            <div className="header" style={{ borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>{lt('dashboard')}</h1>
                    <span style={{ opacity: 0.8 }}>{lt('reports')}</span>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>{t('logout')}</button>
            </div>

            <div className="card toolbar" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Filter size={20} color="#666" />
                    <span style={{ fontWeight: 500 }}>{lt('filter')}:</span>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={e => setFilterDate(e.target.value)}
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {filterDate && (
                        <button onClick={() => setFilterDate('')} style={{ textDecoration: 'underline', background: 'none', color: 'blue' }}>
                            {lt('clear')}
                        </button>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-secondary" onClick={loadData} title={lt('refresh')}>
                        <RefreshCcw size={18} />
                    </button>
                    <button className="btn btn-primary" onClick={() => exportToExcel(checklists)} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <FileText size={18} /> {lt('export')}
                    </button>
                </div>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '15px' }}>{lt('type')}</th>
                            <th style={{ padding: '15px' }}>{lt('date')}</th>
                            <th style={{ padding: '15px' }}>{lt('operator')}</th>
                            <th style={{ padding: '15px' }}>{lt('time')}</th>
                            <th style={{ padding: '15px' }}>{lt('status')}</th>
                            <th style={{ padding: '15px', textAlign: 'center' }}>{lt('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center' }}>{t('loading')}</td></tr>
                        ) : filtered.length > 0 ? (
                            filtered.map(c => (
                                <tr key={c.firebaseId} style={{ borderBottom: '1px solid #eee' }} className="hover-row">
                                    <td style={{ padding: '15px' }}>
                                        {c.portalType === 'forklift' ? (
                                            <span style={{ background: '#ffe6e6', color: '#e94560', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>TVS Forklift</span>
                                        ) : (
                                            <span style={{ background: '#e6eff8', color: '#002c5f', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Hyundai Sattva</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '15px', fontWeight: 500 }}>{c.date}</td>
                                    <td style={{ padding: '15px' }}>{c.operatorName}</td>
                                    <td style={{ padding: '15px', color: '#666' }}>{new Date(c.timestamp).toLocaleTimeString()}</td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ background: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                                            Submitted
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button className="btn btn-secondary" onClick={() => setViewingChecklist(c)} style={{ padding: '6px 10px', fontSize: '0.8rem' }}>{lt('view')}</button>
                                            <button className="btn btn-secondary" onClick={() => generatePDF(c)} style={{ padding: '6px 10px', fontSize: '0.8rem' }}>PDF</button>
                                            <button className="btn btn-secondary" onClick={() => exportToExcel([c])} style={{ padding: '6px 10px', fontSize: '0.8rem' }}>Excel</button>
                                            <button className="btn btn-secondary" onClick={() => handlePrint(c)} style={{ padding: '6px 10px', fontSize: '0.8rem' }}>Print</button>
                                            <button
                                                className="btn"
                                                onClick={() => handleDelete(c)}
                                                style={{ padding: '6px 10px', fontSize: '0.8rem', background: '#dc3545', color: 'white' }}
                                                title="Delete this checklist"
                                            >
                                                {lt('delete')}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#666' }}>{lt('noData')}</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            {viewingChecklist && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
                        <button
                            onClick={() => setViewingChecklist(null)}
                            style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            &times;
                        </button>
                        <h2>Checklist Details: {viewingChecklist.date}</h2>
                        <p>
                            <strong>{lt('type')}:</strong> {viewingChecklist.portalType === 'forklift' ? 'TVS Forklift' : 'Hyundai Reach Stacker'} |
                            <strong> {lt('operator')}:</strong> {viewingChecklist.operatorName} |
                            <strong> Submitted:</strong> {new Date(viewingChecklist.timestamp).toLocaleString()}
                        </p>
                        {viewingChecklist.forkliftId && (
                            <p><strong>Forklift ID:</strong> {viewingChecklist.forkliftId} | <strong>ID No:</strong> {viewingChecklist.idNumber}</p>
                        )}
                        <hr style={{ borderColor: '#eee', margin: '15px 0' }} />

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                            {Object.entries(viewingChecklist.items || {}).map(([key, val]) => (
                                <div key={key} style={{ border: '1px solid #eee', padding: '10px', borderRadius: '4px', background: val.status === 'NOT OK' ? '#fff5f5' : 'white' }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{key}</div>
                                    <div>{lt('status')}: <strong style={{ color: val.status === 'OK' ? 'green' : 'red' }}>{val.status}</strong></div>
                                    {val.remarks && <div>{lt('remarks') || 'Remarks'}: {val.remarks}</div>}
                                    {val.audio && (
                                        <div style={{ marginTop: '10px', background: '#f1f8e9', padding: '5px', borderRadius: '4px', border: '1px solid #a5d6a7' }}>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#2e7d32', marginBottom: '4px' }}>{lt('audio')}</div>
                                            <audio controls src={val.audio} style={{ width: '100%', height: '30px' }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Signatures */}
                        <div style={{ marginTop: '20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                            {viewingChecklist.signature && (
                                <div>
                                    <h4>Operator Signature:</h4>
                                    <img src={viewingChecklist.signature} alt="Signature" style={{ border: '1px solid #ccc', maxWidth: '300px' }} />
                                </div>
                            )}
                            {viewingChecklist.operatorSignature && (
                                <div>
                                    <h4>Operator Signature:</h4>
                                    <img src={viewingChecklist.operatorSignature} alt="Operator Signature" style={{ border: '1px solid #ccc', maxWidth: '300px' }} />
                                </div>
                            )}
                            {viewingChecklist.supervisorSignature && (
                                <div>
                                    <h4>Supervisor Signature:</h4>
                                    <img src={viewingChecklist.supervisorSignature} alt="Supervisor Signature" style={{ border: '1px solid #ccc', maxWidth: '300px' }} />
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <button className="btn btn-primary" onClick={() => setViewingChecklist(null)}>{lt('close')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPortal;
