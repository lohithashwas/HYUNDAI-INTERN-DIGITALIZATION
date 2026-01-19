import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogIn, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import reachStackerImg from '../assets/reach_stacker.png';
import forkliftImg from '../assets/forklift.png';

const Login = () => {
    const navigate = useNavigate();
    const { t, setLanguage, language } = useLanguage();
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [password, setPassword] = useState('');

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (password === 'admin' || password === '1234') {
            navigate('/admin');
        } else {
            alert(t('incorrectPwd') + ' (Try "admin")');
        }
    };

    const LangBtn = ({ code, label }) => (
        <button
            onClick={() => setLanguage(code)}
            style={{
                background: language === code ? '#002c5f' : 'white',
                color: language === code ? 'white' : '#002c5f',
                border: '1px solid #002c5f',
                padding: '5px 15px',
                borderRadius: '20px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
        >
            {label}
        </button>
    );

    return (
        <div className="container" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f4f7f6 0%, #e0e4e6 100%)',
            position: 'relative'
        }}>

            <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Globe size={20} color="#002c5f" />
                <LangBtn code="en" label="English" />
                <LangBtn code="ta" label="தமிழ்" />
                <LangBtn code="hi" label="हिन्दी" />
            </div>

            {!isAdminMode ? (
                <>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', letterSpacing: '-1px' }}>
                            <span style={{ color: '#002c5f' }}>HYUNDAI</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#666', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            {t('dailyChecklist')}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {/* Sattva Card */}
                        <div
                            className="card login-option"
                            onClick={() => navigate('/sattva')}
                            style={{
                                width: '320px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                borderTop: '6px solid #002c5f'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ padding: '40px 20px' }}>
                                <div style={{ height: '120px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={reachStackerImg} alt="Reach Stacker" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                                <h2 style={{ marginBottom: '10px' }}>{t('sattvaPortal')}</h2>
                                <p style={{ color: '#666', marginBottom: '25px' }}>{t('sattvaDesc')}</p>
                                <button className="btn btn-primary" style={{ width: '100%' }}>{t('operatorEntry')}</button>
                            </div>
                        </div>

                        {/* Forklift Card */}
                        <div
                            className="card login-option"
                            onClick={() => navigate('/forklift')}
                            style={{
                                width: '320px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                borderTop: '6px solid #e94560'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ padding: '40px 20px' }}>
                                <div style={{ height: '120px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={forkliftImg} alt="Forklift" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                                <h2 style={{ marginBottom: '10px' }}>{t('forkliftPortal')}</h2>
                                <p style={{ color: '#666', marginBottom: '25px' }}>{t('forkliftDesc')}</p>
                                <button className="btn btn-primary" style={{ width: '100%', background: '#e94560', borderColor: '#e94560' }}>{t('operatorEntry')}</button>
                            </div>
                        </div>

                        {/* Admin Card */}
                        <div
                            className="card login-option"
                            onClick={() => setIsAdminMode(true)}
                            style={{
                                width: '320px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                borderTop: '6px solid #333'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ padding: '40px 20px' }}>
                                <div style={{ background: '#eeeeee', width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Shield size={48} color="#333" />
                                </div>
                                <h2 style={{ marginBottom: '10px', color: '#333' }}>{t('adminPortal')}</h2>
                                <p style={{ color: '#666', marginBottom: '25px' }}>{t('adminDesc')}</p>
                                <button className="btn btn-secondary" style={{ width: '100%' }}>{t('adminLogin')}</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="card" style={{ width: '400px', padding: '40px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>{t('adminAuth')}</h2>
                    <form onSubmit={handleAdminLogin}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{t('password')}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '1rem',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                                autoFocus
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => setIsAdminMode(false)}>{t('cancel')}</button>
                            <button type="submit" className="btn btn-primary"><LogIn size={16} style={{ marginRight: '5px', display: 'inline' }} /> {t('login')}</button>
                        </div>
                    </form>
                </div>
            )}

            <footer style={{ marginTop: 'auto', padding: '20px', color: '#999' }}>
                &copy; {new Date().getFullYear()} Hyundai Construction Equipment
            </footer>
        </div>
    );
};
export default Login;
