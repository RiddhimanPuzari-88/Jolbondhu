import React from 'react';
import { X, LayoutDashboard, Map, BarChart3, Users, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, onClose, darkMode, t, language }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: t.dashboard, active: true },
    { icon: Map, label: t.liveMap },
    { icon: BarChart3, label: t.analytics },
    { icon: Users, label: t.citizenReports },
    { icon: Settings, label: t.settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <motion.aside 
        className={`fixed left-0 top-0 h-full w-64 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-r`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold gradient-text">Jolbondhu</h1>
            <button onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400' 
                    : `hover:bg-gray-100 ${darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-600'}`
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
        
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            {t.systemOnline}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
