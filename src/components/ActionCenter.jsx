import React from 'react';
import { Phone, Shield, Radio, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ActionCenter = ({ darkMode, language, t }) => {
  const actions = [
    { icon: Phone, labelKey: 'emergencyContacts', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
    { icon: Shield, labelKey: 'safetyGuidelines', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Radio, labelKey: 'broadcastAlert', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { icon: Send, labelKey: 'sendWarning', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  ];

  return (
    <div className={`rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} shadow-sm`}>
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <h3 className="font-semibold">{t.actionCenter}</h3>
        <p className="text-xs text-gray-500 mt-1">{t.quickActions}</p>
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-3">
        {actions.map((action, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}
          >
            <div className={`w-10 h-10 rounded-lg ${action.bg} ${action.color} flex items-center justify-center mb-2`}>
              <action.icon size={20} />
            </div>
            <span className="text-sm font-medium block text-left">{t[action.labelKey]}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ActionCenter;
