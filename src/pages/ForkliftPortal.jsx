import React, { useState, useEffect } from 'react';
import ForkliftChecklistForm from '../components/ForkliftChecklistForm';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ForkliftPortal = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const getTodayStr = () => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const checkStatus = async () => {
        const existing = await api.getTodayForkliftSubmission();
        if (existing) {
            setHasSubmitted(true);
        }
    };

    useEffect(() => {
        checkStatus();
    }, []);

    const handleSubmit = async (data) => {
        const payload = {
            ...data,
            date: getTodayStr(),
            timestamp: new Date().toISOString(),
            portalType: 'forklift',
            operatorName: 'Forklift Operator' // Mostly specific ID is in data.idNumber
        };
        await api.submitForkliftChecklist(payload);
        setHasSubmitted(true);
    };

    const localT = {
        en: {
            portalTitle: "Forklift Portal",
            subTitle: "Daily Checklist for Diesel Forklift",
            back: "Back to Home",
            shop: "Shop Code",
            contract: "Contract Code"
        },
        ta: {
            portalTitle: "ஃபோர்க்லிஃப்ட் போர்டல்",
            subTitle: "டீசல் ஃபோர்க்லிஃப்ட் பட்டியல்",
            back: "முகப்புக்கு திரும்பு",
            shop: "கடை எண்",
            contract: "ஒப்பந்த எண்"
        },
        hi: {
            portalTitle: "फोर्कलिफ्ट पोर्टल",
            subTitle: "डीजल फोर्कलिफ्ट चेकलिस्ट",
            back: "होम पर वापस जाएँ",
            shop: "शॉप कोड",
            contract: "अनुबंध कोड"
        }
    };
    const lt = (key) => localT[language]?.[key] || localT['en'][key];

    return (
        <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: '20px' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#666', fontSize: '1rem' }}>
                        <ArrowLeft size={20} /> {lt('back')}
                    </button>
                    <div style={{ marginLeft: 'auto', fontWeight: 'bold', color: '#e94560' }}>
                        {new Date().toDateString()}
                    </div>
                </div>

                <div className="card" style={{ marginBottom: '20px', borderLeft: '5px solid #e94560', background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                            <h1 style={{ margin: 0, color: '#e94560', fontSize: '1.8rem' }}>{lt('portalTitle')}</h1>
                            <p style={{ margin: '5px 0 0', color: '#666' }}>TVS • {lt('subTitle')}</p>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.9rem', color: '#555' }}>
                            <div><strong>{lt('shop')}:</strong> C1Y</div>
                            <div><strong>{lt('contract')}:</strong> TV65C3</div>
                        </div>
                    </div>
                </div>

                {!hasSubmitted ? (
                    <ForkliftChecklistForm onSubmit={handleSubmit} />
                ) : (
                    <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ marginBottom: '20px', color: 'green' }}>
                            <CheckCircle size={80} />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{t('allSet')}</h2>
                        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>
                            {t('submittedMsg')}
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('/')}>{lt('back')}</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForkliftPortal;
