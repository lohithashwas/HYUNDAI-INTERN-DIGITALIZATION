import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { generatePDF, exportToExcel } from '../utils/exportUtils';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Filter, RefreshCcw } from 'lucide-react';

const AdminPortal = () => {
    const [checklists, setChecklists] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const data = await api.getChecklists();
        // Sort descending by date
        data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setChecklists(data);
        setLoading(false);
    };

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

    const handleDelete = async (id, date) => {
        if (!window.confirm(`Are you sure you want to DELETE the checklist for ${date}? This will allow the operator to submit again.`)) {
            return;
        }

        const password = prompt("Enter Admin Password to Delete:");
        if (password === "123") {
            try {
                // Determine firebase ID (legacy data vs new data might differ, but our getChecklists maps it to firebaseId)
                await api.deleteChecklist(id);
                alert("Deleted successfully.");
                loadData(); // XMLHttprequest to refresh
            } catch (e) {
                alert("Failed to delete: " + e.message);
            }
        } else {
            alert("Incorrect Password!");
        }
    };

    return (
        <div className="container">
            <div className="header" style={{ borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h1>Admin Dashboard</h1>
                    <span style={{ opacity: 0.8 }}>Hyundai Reach Stacker Reports</span>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>Logout</button>
            </div>

            <div className="card toolbar" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Filter size={20} color="#666" />
                    <span style={{ fontWeight: 500 }}>Filter Date:</span>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={e => setFilterDate(e.target.value)}
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {filterDate && (
                        <button onClick={() => setFilterDate('')} style={{ textDecoration: 'underline', background: 'none', color: 'blue' }}>
                            Clear
                        </button>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-secondary" onClick={loadData} title="Refresh">
                        <RefreshCcw size={18} />
                    </button>
                    <button className="btn btn-primary" onClick={() => exportToExcel(checklists)} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <FileText size={18} /> Export All to Excel
                    </button>
                </div>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '15px' }}>Date</th>
                            <th style={{ padding: '15px' }}>Operator</th>
                            <th style={{ padding: '15px' }}>Time</th>
                            <th style={{ padding: '15px' }}>Status</th>
                            <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center' }}>Loading data...</td></tr>
                        ) : filtered.length > 0 ? (
                            filtered.map(c => (
                                <tr key={c.firebaseId} style={{ borderBottom: '1px solid #eee' }} className="hover-row">
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
                                            <button className="btn btn-secondary" onClick={() => setViewingChecklist(c)} style={{ padding: '6px 10px', fontSize: '0.8rem' }}>View</button>
                                            <button className="btn btn-secondary" onClick={() => generatePDF(c)} style={{ padding: '6px 10px', fontSize: '0.8rem' }}>PDF</button>
                                            <button className="btn btn-secondary" onClick={() => exportToExcel([c])} style={{ padding: '6px 10px', fontSize: '0.8rem' }}>Excel</button>
                                            <button className="btn btn-secondary" onClick={() => handlePrint(c)} style={{ padding: '6px 10px', fontSize: '0.8rem' }}>Print</button>
                                            <button
                                                className="btn"
                                                onClick={() => handleDelete(c.firebaseId, c.date)}
                                                style={{ padding: '6px 10px', fontSize: '0.8rem', background: '#dc3545', color: 'white' }}
                                                title="Delete this checklist"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#666' }}>No submissions found matching criteria.</td></tr>
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
                        <p><strong>Operator:</strong> {viewingChecklist.operatorName} | <strong>Submitted:</strong> {new Date(viewingChecklist.timestamp).toLocaleString()}</p>
                        <hr style={{ borderColor: '#eee', margin: '15px 0' }} />

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                            {Object.entries(viewingChecklist.items || {}).map(([key, val]) => (
                                <div key={key} style={{ border: '1px solid #eee', padding: '10px', borderRadius: '4px', background: val.status === 'NOT OK' ? '#fff5f5' : 'white' }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{key}</div>
                                    {/* Note: Key is ID, ideally we map back to Label but for now showing ID is okay or we can map if we import schema. 
                                         However since schema is imported, let's try to map it if possible, or just Show ID for MVP or Status.
                                     */}
                                    <div>Status: <strong style={{ color: val.status === 'OK' ? 'green' : 'red' }}>{val.status}</strong></div>
                                    {val.remarks && <div>Remarks: {val.remarks}</div>}
                                </div>
                            ))}
                        </div>
                        {viewingChecklist.signature && (
                            <div style={{ marginTop: '20px' }}>
                                <h4>Signature:</h4>
                                <img src={viewingChecklist.signature} alt="Signature" style={{ border: '1px solid #ccc', maxWidth: '300px' }} />
                            </div>
                        )}
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <button className="btn btn-primary" onClick={() => setViewingChecklist(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AdminPortal;
