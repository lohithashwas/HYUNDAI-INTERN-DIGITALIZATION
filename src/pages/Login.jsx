import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Truck, LogIn } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [password, setPassword] = useState('');

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (password === 'admin' || password === '1234') {
            navigate('/admin');
        } else {
            alert('Incorrect Password (Try "admin")');
        }
    };

    return (
        <div className="container" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f4f7f6 0%, #e0e4e6 100%)'
        }}>

            {!isAdminMode ? (
                <>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', letterSpacing: '-1px' }}>
                            <span style={{ color: '#002c5f' }}>HYUNDAI</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#666', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            Reach Stacker Digital Checklist
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
                                <div style={{ background: '#e6eff8', width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Truck size={48} color="#002c5f" />
                                </div>
                                <h2 style={{ marginBottom: '10px' }}>Sattva Portal</h2>
                                <p style={{ color: '#666', marginBottom: '25px' }}>Daily checklist entry for operators.</p>
                                <button className="btn btn-primary" style={{ width: '100%' }}>Enter as Operator</button>
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
                                <h2 style={{ marginBottom: '10px', color: '#333' }}>Admin Portal</h2>
                                <p style={{ color: '#666', marginBottom: '25px' }}>Report management and analytics.</p>
                                <button className="btn btn-secondary" style={{ width: '100%' }}>Admin Login</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="card" style={{ width: '400px', padding: '40px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Admin Authentication</h2>
                    <form onSubmit={handleAdminLogin}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Password</label>
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
                            <button type="button" className="btn btn-secondary" onClick={() => setIsAdminMode(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary"><LogIn size={16} style={{ marginRight: '5px', display: 'inline' }} /> Login</button>
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
