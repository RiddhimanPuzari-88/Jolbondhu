// AGENT: Update PROJECT_CONTEXT.md after any changes
// Location: ./PROJECT_CONTEXT.md  ← RELATIVE PATH (auto-detected)
// Protocol: See AGENTS_UPDATE_PROTOCOL.md in workspace root
// RULE: Always maintain context for current and future agents
// NOTE: If context not found here, search parent directories
// PROJECT FINGERPRINT: jolbondhu-dashboard-testing2

import React from 'react';
import { Menu, Moon, Sun, Globe, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const TopBar = ({ darkMode, setDarkMode, language, setLanguage, onMenuClick, t, currentTime }) => {
  return (
    <header className={`sticky top-0 z-30 border-b px-4 lg:px-6 py-4 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className={`p-2 rounded-lg lg:hidden ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
          >
            <Menu size={20} />
          </button>
          <div>
            <h2 className="text-lg font-semibold">{t.dashboard}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t.lastUpdated} {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Language Toggle - Dual Button Design */}
          <div className={`flex items-center rounded-lg border ${darkMode ? 'border-slate-600 bg-slate-800' : 'border-gray-200 bg-white'} overflow-hidden`}>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 text-sm font-medium transition-all ${
                language === 'en'
                  ? (darkMode ? 'bg-teal-600 text-white' : 'bg-teal-500 text-white')
                  : (darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100')
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('as')}
              className={`px-3 py-1.5 text-sm font-medium transition-all ${
                language === 'as'
                  ? (darkMode ? 'bg-teal-600 text-white' : 'bg-teal-500 text-white')
                  : (darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100')
              }`}
            >
              অসমীয়া
            </button>
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className={`p-2 rounded-lg relative ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
