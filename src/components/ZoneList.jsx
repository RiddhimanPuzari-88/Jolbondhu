// AGENT: Update PROJECT_CONTEXT.md after any changes
// Location: ./PROJECT_CONTEXT.md  ← RELATIVE PATH (auto-detected)
// Protocol: See AGENTS_UPDATE_PROTOCOL.md in workspace root
// RULE: Always maintain context for current and future agents
// NOTE: If context not found here, search parent directories
// PROJECT FINGERPRINT: jolbondhu-dashboard-testing2

import React from 'react';
import { ChevronRight, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ZoneList = ({ basins, selectedBasin, onSelect, darkMode, language, t }) => {
  const getIcon = (risk) => {
    switch(risk) {
      case 'High': return <AlertTriangle className="text-red-500" size={20} />;
      case 'Medium': return <AlertCircle className="text-amber-500" size={20} />;
      default: return <CheckCircle className="text-green-500" size={20} />;
    }
  };

  // Translate risk level
  const getRiskLabel = (risk) => {
    if (language !== 'as') return risk;
    switch(risk) {
      case 'High': return 'উচ্চ';
      case 'Medium': return 'মধ্যম';
      default: return 'নিম্ন';
    }
  };

  return (
    <div className={`rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} shadow-sm`}>
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <h3 className="font-semibold">{t.zoneStatus}</h3>
        <p className="text-xs text-gray-500 mt-1">{basins?.length} {t.monitoringZones}</p>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-slate-700 max-h-64 overflow-y-auto">
        {basins?.map((basin, idx) => {
          // Get bilingual content
          const basinName = language === 'as' && basin?.nameAssamese ? basin.nameAssamese : basin?.name;
          
          return (
            <motion.button
              key={basin?.id || idx}
              whileHover={{ x: 4 }}
              onClick={() => onSelect(basin)}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                selectedBasin?.id === basin?.id 
                  ? (darkMode ? 'bg-slate-700' : 'bg-teal-50') 
                  : (darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50')
              }`}
            >
              <div className="flex items-center gap-3">
                {getIcon(basin?.riskLevel)}
                <div className="text-left">
                  <div className="font-medium text-sm">{basinName}</div>
                  <div className="text-xs text-gray-500">{basin?.rainfall}{t.mmRain}</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ZoneList;
