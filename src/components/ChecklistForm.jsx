import React, { useState } from 'react';
import { CHECKLIST_SCHEMA } from '../data/checklistSchema';
import { AlertCircle, CheckCircle, Volume2 } from 'lucide-react';
import SignaturePad from './SignaturePad';

const ChecklistForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({});
    const [signature, setSignature] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = (itemId, status) => {
        setFormData(prev => ({
            ...prev,
            [itemId]: { ...prev[itemId], status }
        }));
    };

    const handleRemarksChange = (itemId, remarks) => {
        setFormData(prev => ({
            ...prev,
            [itemId]: { ...prev[itemId], remarks }
        }));
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            // Attempt to use a Tamil voice if the text looks like Tamil/English mix or just let the browser decide
            // For now, standard voice.
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final check on signature from state
        if (!signature) {
            alert("Please sign the checklist before submitting.");
            return;
        }

        // Validation: Check if all items are filled
        let allFilled = true;
        CHECKLIST_SCHEMA.forEach(section => {
            section.items.forEach(item => {
                if (!formData[item.id]?.status) {
                    allFilled = false;
                }
            });
        });

        if (!allFilled) {
            if (!confirm("Some items are not marked. Are you sure you want to submit?")) return;
        }

        setLoading(true);
        onSubmit({ items: formData, signature });
    };

    return (
        <form onSubmit={handleSubmit} className="checklist-form">
            {CHECKLIST_SCHEMA.map((section, idx) => (
                <div key={idx} className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '30px' }}>
                    <div style={{ background: '#002c5f', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: 'white', fontSize: '1.1rem' }}>{idx + 1}. {section.title} / {section.titleTm}</h3>
                    </div>

                    <div className="table-responsive" style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #ddd', fontSize: '0.9rem', color: '#666' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', width: '40%' }}>Activity / செயல்பாடு</th>
                                    <th style={{ padding: '12px', textAlign: 'center', width: '30%' }}>Status / நிலை</th>
                                    <th style={{ padding: '12px', textAlign: 'left', width: '30%' }}>Remarks / குறிப்புகள்</th>
                                </tr>
                            </thead>
                            <tbody>
                                {section.items.map((item, itemIdx) => {
                                    const itemState = formData[item.id] || {};
                                    return (
                                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '12px' }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                                    <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>
                                                        <div>{item.label}</div>
                                                        <div style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px' }}>{item.labelTm}</div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            speak(item.label);
                                                            setTimeout(() => speak(item.labelTm), 2000);
                                                        }}
                                                        style={{ background: 'none', padding: '4px', color: '#0056b3', opacity: 0.7 }}
                                                        title="Read Aloud"
                                                    >
                                                        <Volume2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                                                    <label className={`status-btn ${itemState.status === 'OK' ? 'active-ok' : ''}`}>
                                                        <input
                                                            type="radio"
                                                            name={`status-${item.id}`}
                                                            value="OK"
                                                            checked={itemState.status === 'OK'}
                                                            onChange={() => handleStatusChange(item.id, "OK")}
                                                            style={{ display: 'none' }}
                                                        />
                                                        <CheckCircle size={18} />
                                                        <span>OK</span>
                                                    </label>

                                                    <label className={`status-btn ${itemState.status === 'NOT OK' ? 'active-not-ok' : ''}`}>
                                                        <input
                                                            type="radio"
                                                            name={`status-${item.id}`}
                                                            value="NOT OK"
                                                            checked={itemState.status === 'NOT OK'}
                                                            onChange={() => handleStatusChange(item.id, "NOT OK")}
                                                            style={{ display: 'none' }}
                                                        />
                                                        <AlertCircle size={18} />
                                                        <span>NOT OK</span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter remarks..."
                                                    value={itemState.remarks || ''}
                                                    onChange={(e) => handleRemarksChange(item.id, e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 12px',
                                                        borderRadius: '4px',
                                                        border: '1px solid #ddd',
                                                        fontSize: '0.9rem'
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            <div className="card" style={{ marginTop: '30px' }}>
                <SignaturePad onEnd={setSignature} />
                <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '0.9rem' }}>
                    {signature ? (
                        <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Signature Captured</span>
                    ) : (
                        <span style={{ color: 'red' }}>❌ Signature Required</span>
                    )}
                </div>
            </div>

            <div style={{ padding: '20px', textAlign: 'center' }}>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ fontSize: '1.2rem', padding: '15px 30px', minWidth: '300px' }}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "SUBMIT CHECKLIST"}
                </button>
            </div>

            <style>{`
                .status-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    cursor: pointer;
                    color: #666;
                    transition: all 0.2s;
                    font-weight: 500;
                    user-select: none;
                }
                .status-btn:hover {
                    background: #f8f9fa;
                }
                .active-ok {
                    background: #d4edda !important;
                    border-color: #28a745 !important;
                    color: #155724 !important;
                }
                .active-not-ok {
                    background: #f8d7da !important;
                    border-color: #dc3545 !important;
                    color: #721c24 !important;
                }
            `}</style>
        </form>
    );
};

export default ChecklistForm;
