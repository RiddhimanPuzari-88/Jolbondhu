// AGENT: Update PROJECT_CONTEXT.md after any changes
// Location: ./PROJECT_CONTEXT.md  ← RELATIVE PATH (auto-detected)
// Protocol: See AGENTS_UPDATE_PROTOCOL.md in workspace root
// RULE: Always maintain context for current and future agents
// NOTE: If context not found here, search parent directories
// PROJECT FINGERPRINT: jolbondhu-dashboard-testing2

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Droplets, TrendingUp, MapPin } from 'lucide-react';

const RiskStatusCard = ({ basin: initialBasin, darkMode, language, t }) => {
  // TODO: API INTEGRATION - Fetch real-time risk status with polling
  // Endpoint: GET https://api.yourservice.com/basins/{basin.id}/status
  // Headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  // Response: { 
  //   id, name, nameAssamese, location, locationAssamese,
  //   riskLevel, rainfall, riverLevel, drainageBlockage, 
  //   estimatedWaterLevel, lastUpdated, coords, polygon 
  // }
  // 
  // Example implementation with polling every 30 seconds:
  // const [basinData, setBasinData] = useState(initialBasin);
  // useEffect(() => {
  //   const fetchRiskStatus = async () => {
  //     try {
  //       const response = await fetch(`https://api.yourservice.com/basins/${initialBasin.id}/status`, {
  //         headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  //       });
  //       const data = await response.json();
  //       setBasinData(data);
  //     } catch (error) {
  //       console.error('Error fetching risk status:', error);
  //     }
  //   };
  //   
  //   fetchRiskStatus(); // Initial fetch
  //   const interval = setInterval(fetchRiskStatus, 30000); // Poll every 30 seconds
  //   return () => clearInterval(interval);
  // }, [initialBasin.id]);
  const [basinData, setBasinData] = useState(initialBasin); // DEMO DATA - remove this line when using API

  // Sync local state when prop changes (zone selection)
  useEffect(() => {
    setBasinData(initialBasin);
  }, [initialBasin]);

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'Medium': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      default: return 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    }
  };

  // Get bilingual content
  const basinName = language === 'as' && basinData?.nameAssamese ? basinData.nameAssamese : basinData?.name;
  const basinLocation = language === 'as' && basinData?.locationAssamese ? basinData.locationAssamese : basinData?.location;

  // Translate risk level
  const riskLevelText = language === 'as'
    ? (basinData?.riskLevel === 'High' ? 'উচ্চ' : basinData?.riskLevel === 'Medium' ? 'মধ্যম' : 'নিম্ন')
    : basinData?.riskLevel;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl p-6 border ${getRiskColor(basinData?.riskLevel)} ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={18} />
            <h3 className="text-lg font-bold">{basinName}</h3>
          </div>
          <p className="text-sm opacity-80">{basinLocation || 'Assam, India'}</p>
        </div>
        {basinData?.riskLevel === 'High' && (
          <div className="pulse-alert p-2 rounded-full bg-red-500 text-white">
            <AlertTriangle size={24} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-white/50'} backdrop-blur`}>
          <div className="flex items-center gap-2 mb-2 opacity-70">
            <Droplets size={16} />
            <span className="text-sm">{t.currentRainfall}</span>
          </div>
          <p className="text-2xl font-bold">{basinData?.rainfall || '45'} {t.mm}</p>
        </div>
        
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-white/50'} backdrop-blur`}>
          <div className="flex items-center gap-2 mb-2 opacity-70">
            <TrendingUp size={16} />
            <span className="text-sm">{t.riverLevel}</span>
          </div>
          <p className="text-2xl font-bold">{basinData?.riverLevel || '12.5'} m</p>
        </div>
      </div>

      {basinData?.riskLevel === 'High' && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm font-medium text-center">
          {t.floodAlertActive}
        </div>
      )}

      {/* Risk Level Badge */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm opacity-70">{t.riskLevel}:</span>
        <span className={`px-2 py-1 rounded text-sm font-semibold ${
          basinData?.riskLevel === 'High' ? 'bg-red-500 text-white' :
          basinData?.riskLevel === 'Medium' ? 'bg-amber-500 text-white' :
          'bg-green-500 text-white'
        }`}>
          {riskLevelText}
        </span>
      </div>
    </motion.div>
  );
};

export default RiskStatusCard;
