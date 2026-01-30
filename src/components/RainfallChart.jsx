import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CloudRain } from 'lucide-react';

const RainfallChart = ({ selectedBasin, darkMode, language, t }) => {
  // Use zone-specific rainfall data from selectedBasin
  const chartData = selectedBasin?.rainfallData || [
    { time: '06:00', rainfall: 12 },
    { time: '07:00', rainfall: 18 },
    { time: '08:00', rainfall: 45 },
    { time: '09:00', rainfall: 38 },
    { time: '10:00', rainfall: 52 },
    { time: '11:00', rainfall: 48 },
  ];

  // Get bilingual zone name for title
  const zoneName = language === 'as' && selectedBasin?.nameAssamese 
    ? selectedBasin.nameAssamese 
    : selectedBasin?.name;

  return (
    <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} shadow-sm`}>
      <div className="flex items-center gap-2 mb-2">
        <CloudRain className="text-teal-500" size={20} />
        <h3 className="font-semibold">{t.rainfallTrend}</h3>
      </div>
      <p className="text-xs text-gray-500 mb-6">{zoneName}</p>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e5e7eb'} />
            <XAxis 
              dataKey="time" 
              stroke={darkMode ? '#94a3b8' : '#6b7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={darkMode ? '#94a3b8' : '#6b7280'}
              fontSize={12}
              label={{ value: t.mm, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1e293b' : '#fff',
                border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`,
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="rainfall" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              dot={{ fill: '#0ea5e9', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainfallChart;
