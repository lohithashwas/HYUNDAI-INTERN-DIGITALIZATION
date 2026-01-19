import React, { useState } from 'react';
import { FORKLIFT_CHECKLIST_SCHEMA, FORKLIFT_INFO } from '../data/forkliftChecklistSchema';
import { AlertCircle, CheckCircle, Volume2 } from 'lucide-react';
import SignaturePad from './SignaturePad';
import { useLanguage } from '../context/LanguageContext';
import AudioRemarksInput from './AudioRemarksInput';

const ForkliftChecklistForm = ({ onSubmit, initialData }) => {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({});
    const [operatorSignature, setOperatorSignature] = useState(null);
    const [supervisorSignature, setSupervisorSignature] = useState(null);
    const [loading, setLoading] = useState(false);
    const [idNumber, setIdNumber] = useState('');
    const [forkliftId, setForkliftId] = useState('');

    const localT = {
        en: {
            company: "Company",
            equipmentType: "Equipment Type",
            forkliftId: "Forklift ID No.",
            idNumber: "ID Number",
            opSig: "Fork Lift Operator",
            supSig: "TVS Supervisor",
            optional: "(Optional)",
            checkPoints: "Check Points"
        },
        ta: {
            company: "நிறுவனம்",
            equipmentType: "சாதனம் வகை",
            forkliftId: "ஃபோர்க்லிஃப்ட் எண்",
            idNumber: "அடையாள எண்",
            opSig: "ஃபோர்க்லிஃப்ட் ஆபரேட்டர்",
            supSig: "TVS மேற்பார்வையாளர்",
            optional: "(விருப்பம்)",
            checkPoints: "சரிபார்ப்பு புள்ளிகள்"
        },
        hi: {
            company: "कंपनी",
            equipmentType: "उपकरण प्रकार",
            forkliftId: "फोर्कलिफ्ट आईडी",
            idNumber: "आईडी नंबर",
            opSig: "फोर्कलिफ्ट ऑपरेटर",
            supSig: "TVS पर्यवेक्षक",
            optional: "(वैकल्पिक)",
            checkPoints: "जाँच बिंदु"
        }
    };
    const lt = (key) => localT[language]?.[key] || localT['en'][key];

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

    const handleAudioChange = (itemId, audioData) => {
        setFormData(prev => ({
            ...prev,
            [itemId]: { ...prev[itemId], audio: audioData }
        }));
    };

    // Helper to get correct label based on language
    const getLabel = (item) => {
        if (language === 'ta') return item.labelTm || item.label;
        if (language === 'hi') return item.labelHi || item.label;
        return item.label;
    };

    // Helper for Section Title
    const getSectionTitle = (section) => {
        if (language === 'ta') return section.titleTm || section.title;
        if (language === 'hi') return section.titleHi || section.title;
        return section.title;
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            // Get all available voices
            const voices = window.speechSynthesis.getVoices();

            let targetLang = 'en-US';
            let voice = null;

            if (language === 'ta') {
                targetLang = 'ta-IN';
                // Try to find a Tamil voice
                voice = voices.find(v => v.lang.includes('ta') || v.name.toLowerCase().includes('tamil'));
            } else if (language === 'hi') {
                targetLang = 'hi-IN';
                voice = voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'));
            }

            utterance.lang = targetLang;
            if (voice) utterance.voice = voice;

            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final check on signature from state
        if (!operatorSignature) {
            alert(t('signatureReq') + " (" + lt('opSig') + ")");
            return;
        }

        if (!forkliftId.trim()) {
            alert("Please enter the " + lt('forkliftId'));
            return;
        }

        // Validation: Check if all items are filled
        let allFilled = true;
        FORKLIFT_CHECKLIST_SCHEMA.forEach(section => {
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
        onSubmit({
            items: formData,
            operatorSignature,
            supervisorSignature,
            idNumber,
            forkliftId,
            equipmentInfo: FORKLIFT_INFO
        });
    };

    return (
        <form onSubmit={handleSubmit} className="checklist-form">
            {/* Header Info */}
            <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                        <label style={{ opacity: 0.7, fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>{lt('company')}</label>
                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{FORKLIFT_INFO.company}</span>
                    </div>
                    <div>
                        <label style={{ opacity: 0.7, fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>{lt('equipmentType')}</label>
                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{FORKLIFT_INFO.equipmentType}</span>
                    </div>
                    <div>
                        <label style={{ opacity: 0.7, fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>{lt('forkliftId')}</label>
                        <input
                            type="text"
                            value={forkliftId}
                            onChange={(e) => setForkliftId(e.target.value)}
                            placeholder="e.g., FD2N80"
                            style={{
                                padding: '8px 12px',
                                borderRadius: '4px',
                                border: 'none',
                                fontSize: '1rem',
                                width: '100%',
                                maxWidth: '150px',
                                color: 'black'
                            }}
                        />
                    </div>
                </div>
            </div>

            {FORKLIFT_CHECKLIST_SCHEMA.map((section, idx) => (
                <div key={idx} className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '30px' }}>
                    <div style={{ background: 'linear-gradient(90deg, #0f3460 0%, #16213e 100%)', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: 'white', fontSize: '1.1rem', margin: 0 }}>{idx + 1}. {getSectionTitle(section)}</h3>
                    </div>

                    <div className="table-responsive" style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #ddd', fontSize: '0.9rem', color: '#666' }}>
                                    <th style={{ padding: '12px', textAlign: 'center', width: '5%' }}>S.No</th>
                                    <th style={{ padding: '12px', textAlign: 'left', width: '45%' }}>{lt('checkPoints')}</th>
                                    <th style={{ padding: '12px', textAlign: 'center', width: '25%' }}>{t('status')}</th>
                                    <th style={{ padding: '12px', textAlign: 'left', width: '25%' }}>{t('remarks')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {section.items.map((item, itemIdx) => {
                                    const itemState = formData[item.id] || {};
                                    const currentLabel = getLabel(item);

                                    return (
                                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '12px', textAlign: 'center', fontWeight: 600, color: '#666' }}>
                                                {itemIdx + 1}
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                                    <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>
                                                        <div>{currentLabel}</div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => speak(currentLabel)}
                                                        style={{ background: 'none', padding: '4px', color: '#0f3460', opacity: 0.7, border: 'none', cursor: 'pointer' }}
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
                                                        <span>✓</span>
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
                                                        <span>✗</span>
                                                    </label>

                                                    <label className={`status-btn ${itemState.status === 'NA' ? 'active-na' : ''}`}>
                                                        <input
                                                            type="radio"
                                                            name={`status-${item.id}`}
                                                            value="NA"
                                                            checked={itemState.status === 'NA'}
                                                            onChange={() => handleStatusChange(item.id, "NA")}
                                                            style={{ display: 'none' }}
                                                        />
                                                        <span>N/A</span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                <AudioRemarksInput
                                                    value={itemState.remarks}
                                                    onChange={(val) => handleRemarksChange(item.id, val)}
                                                    audioData={itemState.audio}
                                                    onAudioChange={(blob) => handleAudioChange(item.id, blob)}
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

            {/* Signatures Section */}
            <div className="card" style={{ marginTop: '30px' }}>
                <h3 style={{ marginBottom: '20px', color: '#0f3460' }}>{t('signature')}</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {/* Fork Lift Operator */}
                    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
                        <h4 style={{ marginBottom: '15px', color: '#333' }}>{lt('opSig')}</h4>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>{lt('idNumber')}</label>
                            <input
                                type="text"
                                value={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)}
                                placeholder="Enter ID Number"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <SignaturePad onEnd={setOperatorSignature} />
                        <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '0.9rem' }}>
                            {operatorSignature ? (
                                <span style={{ color: 'green', fontWeight: 'bold' }}>✅ {t('signatureCap')}</span>
                            ) : (
                                <span style={{ color: 'red' }}>❌ {t('signatureReq')}</span>
                            )}
                        </div>
                    </div>

                    {/* TVS Supervisor (Optional) */}
                    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
                        <h4 style={{ marginBottom: '15px', color: '#333' }}>{lt('supSig')} <span style={{ color: '#999', fontWeight: 'normal', fontSize: '0.85rem' }}>{lt('optional')}</span></h4>
                        <SignaturePad onEnd={setSupervisorSignature} />
                        <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '0.9rem' }}>
                            {supervisorSignature ? (
                                <span style={{ color: 'green', fontWeight: 'bold' }}>✅ {t('signatureCap')}</span>
                            ) : (
                                <span style={{ color: '#999' }}>⬜ Optional</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px', textAlign: 'center' }}>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                        fontSize: '1.2rem',
                        padding: '15px 30px',
                        minWidth: '300px',
                        background: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
                        border: 'none'
                    }}
                    disabled={loading}
                >
                    {loading ? t('submitting') : t('submit')}
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
                .active-na {
                    background: #e2e3e5 !important;
                    border-color: #6c757d !important;
                    color: #383d41 !important;
                }
            `}</style>
        </form>
    );
};

export default ForkliftChecklistForm;
