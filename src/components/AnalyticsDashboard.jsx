import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const AnalyticsDashboard = ({ checklists }) => {
    const { t } = useLanguage();

    if (!checklists || checklists.length === 0) return null;

    // --- 1. Calculate General Stats ---
    const totalSubmissions = checklists.length;
    const saddleCount = checklists.filter(c => c.portalType === 'sattva').length;
    const forkliftCount = checklists.filter(c => c.portalType === 'forklift').length;

    // --- 2. Calculate Health Score (OK vs NOT OK) ---
    let totalItems = 0;
    let okItems = 0;
    let notOkItems = 0;

    checklists.forEach(c => {
        if (c.items) {
            Object.values(c.items).forEach(item => {
                totalItems++;
                if (item.status === 'OK') okItems++;
                if (item.status === 'NOT OK') notOkItems++;
            });
        }
    });

    const healthData = [
        { name: 'OK', value: okItems },
        { name: 'NOT OK', value: notOkItems },
    ];
    const COLORS = ['#00C49F', '#FF8042'];

    // --- 3. Daily Submission Trends (Last 7 Days) ---
    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    }).reverse();

    const trendData = last7Days.map(date => {
        const dayChecks = checklists.filter(c => c.date === date);
        return {
            date: date.substring(5), // MM-DD
            Sattva: dayChecks.filter(c => c.portalType === 'sattva').length,
            Forklift: dayChecks.filter(c => c.portalType === 'forklift').length
        };
    });

    return (
        <div style={{ marginBottom: '30px', animation: 'fadeIn 0.5s ease-in' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>📊 {t('analytics') || "Performance Analytics"}</h2>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>

                {/* Card 1: Submission Volume Trend */}
                <div className="card" style={{ height: '350px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Checklist Trends (7 Days)</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Sattva" fill="#002c5f" name="Reach Stacker" />
                            <Bar dataKey="Forklift" fill="#e94560" name="Forklift" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Card 2: Equipment Compliance Health */}
                <div className="card" style={{ height: '350px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Compliance Health</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '85%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={healthData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    {healthData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Card 3: Key Metrics Summary */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem' }}>Summary Stats</h3>

                    <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #002c5f' }}>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Submissions</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>{totalSubmissions}</div>
                    </div>

                    <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #e94560' }}>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Issues Reported (NOT OK)</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF8042' }}>{notOkItems}</div>
                    </div>

                    <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #00C49F' }}>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Equipment Health</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00C49F' }}>
                            {totalItems > 0 ? ((okItems / totalItems) * 100).toFixed(1) : 0}%
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnalyticsDashboard;
