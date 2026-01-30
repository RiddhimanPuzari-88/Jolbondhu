import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Droplets, TrendingUp, MapPin } from 'lucide-react';

const RiskStatusCard = ({ basin, darkMode, language, t }) => {
  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'Medium': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      default: return 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    }
  };

  // Get bilingual content
  const basinName = language === 'as' && basin?.nameAssamese ? basin.nameAssamese : basin?.name;
  const basinLocation = language === 'as' && basin?.locationAssamese ? basin.locationAssamese : basin?.location;

  // Translate risk level
  const riskLevelText = language === 'as'
    ? (basin?.riskLevel === 'High' ? 'উচ্চ' : basin?.riskLevel === 'Medium' ? 'মধ্যম' : 'নিম্ন')
    : basin?.riskLevel;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl p-6 border ${getRiskColor(basin?.riskLevel)} ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={18} />
            <h3 className="text-lg font-bold">{basinName}</h3>
          </div>
          <p className="text-sm opacity-80">{basinLocation || 'Assam, India'}</p>
        </div>
        {basin?.riskLevel === 'High' && (
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
          <p className="text-2xl font-bold">{basin?.rainfall || '45'} {t.mm}</p>
        </div>
        
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-white/50'} backdrop-blur`}>
          <div className="flex items-center gap-2 mb-2 opacity-70">
            <TrendingUp size={16} />
            <span className="text-sm">{t.riverLevel}</span>
          </div>
          <p className="text-2xl font-bold">{basin?.riverLevel || '12.5'} m</p>
        </div>
      </div>

      {basin?.riskLevel === 'High' && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm font-medium text-center">
          {t.floodAlertActive}
        </div>
      )}

      {/* Risk Level Badge */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm opacity-70">{t.riskLevel}:</span>
        <span className={`px-2 py-1 rounded text-sm font-semibold ${
          basin?.riskLevel === 'High' ? 'bg-red-500 text-white' :
          basin?.riskLevel === 'Medium' ? 'bg-amber-500 text-white' :
          'bg-green-500 text-white'
        }`}>
          {riskLevelText}
        </span>
      </div>
    </motion.div>
  );
};

export default RiskStatusCard;
