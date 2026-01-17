import React, { useEffect, useState } from 'react';
import { api, getTodayStr } from '../api';
import ChecklistForm from '../components/ChecklistForm';
import { useNavigate } from 'react-router-dom';

const SattvaPortal = () => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        try {
            const existing = await api.getTodaySubmission();
            if (existing) setHasSubmitted(true);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data) => {
        try {
            const payload = {
                ...data, // items, signature
                date: getTodayStr(),
                timestamp: new Date().toISOString(),
                operatorName: 'Sattva Staff' // Can make this an input too if needed, prompting user just to be valid.
            };
            await api.submitChecklist(payload);
            setHasSubmitted(true);
            alert("Checklist Submitted Successfully!");
        } catch (e) {
            alert("Error submitting: " + e.message);
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: '50px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container">
            <div className="header" style={{ borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h1>Hyundai Reach Stacker</h1>
                    <span style={{ opacity: 0.8 }}>Sattva Portal - Daily Check</span>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>Logout</button>
            </div>

            {!hasSubmitted ? (
                <>
                    <div className="card" style={{ background: '#fff3cd', borderLeft: '5px solid #ffc107', color: '#856404' }}>
                        <h3>⚠️ Action Required</h3>
                        <p style={{ margin: 0 }}>Please complete today's checklist ({getTodayStr()}).</p>
                    </div>
                    <ChecklistForm onSubmit={handleSubmit} />
                </>
            ) : (
                <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
                    <h1 style={{ color: 'green', fontSize: '3rem', marginBottom: '20px' }}>✅</h1>
                    <h2 style={{ color: 'green' }}>You're All Set!</h2>
                    <p>Today's checklist for {getTodayStr()} has been submitted.</p>
                </div>
            )}
        </div>
    );
};
export default SattvaPortal;
