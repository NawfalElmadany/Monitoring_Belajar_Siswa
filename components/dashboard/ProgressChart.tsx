
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TartiliLog, HafalanLog } from '../../types';

interface ProgressChartProps {
    data: (TartiliLog | HafalanLog)[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
    const chartData = data
        .map(log => ({
            name: new Date(log.tanggal).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
            Nilai: log.nilai,
        }))
        .reverse();
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 20,
                    left: -10,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" tick={{ fill: '#D1D5DB' }} />
                <YAxis stroke="rgba(255, 255, 255, 0.7)" domain={[0, 100]} tick={{ fill: '#D1D5DB' }} />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'rgba(30, 41, 59, 0.8)',
                        borderColor: '#3BB77E',
                        color: '#FFFFFF'
                    }}
                    labelStyle={{ color: '#E5E7EB' }}
                />
                <Legend wrapperStyle={{color: '#FFFFFF'}}/>
                <Line type="monotone" dataKey="Nilai" stroke="#3BB77E" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ProgressChart;