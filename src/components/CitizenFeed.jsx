// AGENT: Update PROJECT_CONTEXT.md after any changes
// Location: ./PROJECT_CONTEXT.md  ← RELATIVE PATH (auto-detected)
// Protocol: See AGENTS_UPDATE_PROTOCOL.md in workspace root
// RULE: Always maintain context for current and future agents
// NOTE: If context not found here, search parent directories
// PROJECT FINGERPRINT: jolbondhu-dashboard-testing2

import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const CitizenFeed = ({ reports: initialReports, selectedBasin, darkMode, language, t }) => {
  // TODO: API INTEGRATION - Fetch zone-specific reports with polling
  // Endpoint: GET https://api.yourservice.com/reports?basinId={selectedBasin.id}&limit=20
  // Headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  // Query params: basinId (required), limit (optional, default 20), since (optional, timestamp)
  // Response: Array of report objects { id, basinId, user, location, locationAssamese, content, messageAssamese, time, type, image }
  // 
  // Example implementation with polling every 45 seconds:
  // const [reports, setReports] = useState([]);
  // useEffect(() => {
  //   const fetchReports = async () => {
  //     try {
  //       const response = await fetch(`https://api.yourservice.com/reports?basinId=${selectedBasin.id}&limit=20`, {
  //         headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  //       });
  //       const data = await response.json();
  //       setReports(data);
  //     } catch (error) {
  //       console.error('Error fetching reports:', error);
  //     }
  //   };
  //   
  //   fetchReports(); // Initial fetch
  //   const interval = setInterval(fetchReports, 45000); // Poll every 45 seconds
  //   return () => clearInterval(interval);
  // }, [selectedBasin.id]);
  const [reports] = useState(initialReports); // DEMO DATA - remove this line when using API

  const getTypeColor = (type) => {
    switch(type) {
      case 'alert': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'update': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  // Translate report type
  const getTypeLabel = (type) => {
    if (language !== 'as') return type.charAt(0).toUpperCase() + type.slice(1);
    switch(type) {
      case 'alert': return 'সতৰ্কবাণী';
      case 'update': return 'আপডেট';
      default: return 'প্ৰতিবেদন';
    }
  };

  // Filter reports by selected basin
  const filteredReports = reports?.filter(report => report?.basinId === selectedBasin?.id) || [];

  // TODO: API INTEGRATION - Real-time report submission
  // When user submits a new report via API:
  // POST https://api.yourservice.com/reports
  // Headers: { 'Authorization': 'Bearer YOUR_API_KEY', 'Content-Type': 'application/json' }
  // Body: { basinId, user, location, content, type, image (optional) }
  // After successful POST, the polling will automatically fetch the new report

  // Get bilingual zone name for header
  const zoneName = language === 'as' && selectedBasin?.nameAssamese 
    ? selectedBasin.nameAssamese 
    : selectedBasin?.name;

  return (
    <div className={`rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} shadow-sm`}>
      <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
        <MessageSquare className="text-teal-500" size={20} />
        <div>
          <h3 className="font-semibold">{t.citizenReportsFeed}</h3>
          <p className="text-xs text-gray-500">{zoneName}</p>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-slate-700 max-h-80 overflow-y-auto">
        {filteredReports.length > 0 ? (
          filteredReports.map((report, idx) => {
            // Get bilingual content
            const reportContent = language === 'as' && report?.messageAssamese 
              ? report.messageAssamese 
              : report?.content;
            const reportLocation = language === 'as' && report?.locationAssamese 
              ? report.locationAssamese 
              : report?.location;

            return (
              <motion.div
                key={report?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getTypeColor(report?.type)}`}>
                      {report?.user?.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{report?.user}</div>
                      <div className="text-xs text-gray-500">{reportLocation}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    {report?.time}
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 ml-10">
                  {reportContent}
                </p>
                
                {report?.image && (
                  <div className="ml-10 mt-2">
                    <div className={`w-full h-32 rounded-lg border-2 border-dashed flex items-center justify-center ${darkMode ? 'border-slate-600 bg-slate-700/50' : 'border-gray-300 bg-gray-50'}`}>
                      <div className="text-center text-gray-400">
                        <ImageIcon size={24} className="mx-auto mb-1" />
                        <span className="text-xs">{t.photoAttached}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })
        ) : (
          <div className="p-8 text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'as' ? t.noReportsAs : t.noReports}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenFeed;
