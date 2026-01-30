// AGENT: Update PROJECT_CONTEXT.md after any changes
// Location: ./PROJECT_CONTEXT.md  ← RELATIVE PATH (auto-detected)
// Protocol: See AGENTS_UPDATE_PROTOCOL.md in workspace root
// RULE: Always maintain context for current and future agents
// NOTE: If context not found here, search parent directories
// PROJECT FINGERPRINT: jolbondhu-dashboard-testing2

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CloudRain } from 'lucide-react';

const RainfallChart = ({ selectedBasin, darkMode, language, t }) => {
  // TODO: API INTEGRATION - Fetch 6-hour rainfall history with polling
  // Endpoint: GET https://api.yourservice.com/rainfall/history?basinId={selectedBasin.id}&hours=6
  // Headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  // Query params: basinId (required), hours (optional, default 6)
  // Response: Array of { time: "06:00", rainfall: 25.2 } objects
  // 
  // Example implementation with polling every 60 seconds:
  // const [rainfallHistory, setRainfallHistory] = useState([]);
  // useEffect(() => {
  //   const fetchRainfallHistory = async () => {
  //     try {
  //       const response = await fetch(`https://api.yourservice.com/rainfall/history?basinId=${selectedBasin.id}&hours=6`, {
  //         headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  //       });
  //       const data = await response.json();
  //       setRainfallHistory(data);
  //     } catch (error) {
  //       console.error('Error fetching rainfall history:', error);
  //     }
  //   };
  //   
  //   fetchRainfallHistory(); // Initial fetch
  //   const interval = setInterval(fetchRainfallHistory, 60000); // Poll every 60 seconds
  //   return () => clearInterval(interval);
  // }, [selectedBasin.id]);
  
  // TODO: API INTEGRATION - Alternative: Real-time rainfall updates via WebSocket
  // For more real-time updates, use WebSocket instead of polling:
  // const ws = new WebSocket('wss://api.yourservice.com/ws/rainfall');
  // ws.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   if (data.basinId === selectedBasin.id) {
  //     setRainfallHistory(prev => [...prev.slice(1), data]);
  //   }
  // };
  
  // Use zone-specific rainfall data from selectedBasin (DEMO DATA)
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
