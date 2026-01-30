// AGENT: Update PROJECT_CONTEXT.md after any changes
// Location: ./PROJECT_CONTEXT.md  ← RELATIVE PATH (auto-detected)
// Protocol: See AGENTS_UPDATE_PROTOCOL.md in workspace root
// RULE: Always maintain context for current and future agents
// NOTE: If context not found here, search parent directories
// PROJECT FINGERPRINT: jolbondhu-dashboard-testing2

import React, { useState } from 'react';
import { Phone, Shield, Radio, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ActionCenter = ({ darkMode, language, t, selectedBasin }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});

  const actions = [
    { 
      icon: Phone, 
      labelKey: 'emergencyContacts', 
      color: 'text-red-500', 
      bg: 'bg-red-50 dark:bg-red-900/20',
      action: 'emergency'
    },
    { 
      icon: Shield, 
      labelKey: 'safetyGuidelines', 
      color: 'text-green-500', 
      bg: 'bg-green-50 dark:bg-green-900/20',
      action: 'safety'
    },
    { 
      icon: Radio, 
      labelKey: 'broadcastAlert', 
      color: 'text-amber-500', 
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      action: 'broadcast'
    },
    { 
      icon: Send, 
      labelKey: 'sendWarning', 
      color: 'text-blue-500', 
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      action: 'warning'
    },
  ];

  // TODO: API INTEGRATION - Handle Emergency Contacts
  // Endpoint: GET https://api.yourservice.com/emergency-contacts?basinId={selectedBasin.id}
  // Headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  // Response: Array of { name, phone, type, priority }
  const handleEmergencyContacts = async () => {
    setActiveModal('emergency');
    setLoading(true);
    
    // DEMO: Simulated API call
    setTimeout(() => {
      setModalData({
        contacts: [
          { name: 'Assam State Disaster Management', phone: '1070', type: 'Emergency', priority: 'High' },
          { name: 'Guwahati Municipal Corporation', phone: '0361-2545002', type: 'Municipal', priority: 'High' },
          { name: 'District Collector Office', phone: '1077', type: 'District', priority: 'Medium' },
          { name: 'Fire Department', phone: '101', type: 'Emergency', priority: 'High' },
        ]
      });
      setLoading(false);
    }, 1000);
    
    // TODO: Replace with real API call:
    // try {
    //   const response = await fetch(`https://api.yourservice.com/emergency-contacts?basinId=${selectedBasin.id}`, {
    //     headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
    //   });
    //   const data = await response.json();
    //   setModalData({ contacts: data });
    // } catch (error) {
    //   console.error('Error fetching emergency contacts:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  // TODO: API INTEGRATION - Handle Safety Guidelines
  // Endpoint: GET https://api.yourservice.com/safety-guidelines?riskLevel={selectedBasin.riskLevel}
  // Headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
  // Response: { title, guidelines: Array of { step, description } }
  const handleSafetyGuidelines = async () => {
    setActiveModal('safety');
    setLoading(true);
    
    // DEMO: Simulated API call
    setTimeout(() => {
      const guidelines = selectedBasin?.riskLevel === 'High' 
        ? [
            { step: 1, description: 'Evacuate immediately to higher ground' },
            { step: 2, description: 'Turn off electricity and gas supply' },
            { step: 3, description: 'Move valuables to upper floors' },
            { step: 4, description: 'Keep emergency kit ready' },
            { step: 5, description: 'Stay tuned to local news and alerts' },
          ]
        : selectedBasin?.riskLevel === 'Medium'
        ? [
            { step: 1, description: 'Monitor water levels closely' },
            { step: 2, description: 'Prepare emergency supplies' },
            { step: 3, description: 'Keep important documents safe' },
            { step: 4, description: 'Have evacuation plan ready' },
          ]
        : [
            { step: 1, description: 'Stay alert and monitor situation' },
            { step: 2, description: 'Keep emergency numbers handy' },
            { step: 3, description: 'Avoid low-lying areas' },
          ];
      
      setModalData({ 
        title: `Safety Guidelines - ${selectedBasin?.riskLevel} Risk`,
        guidelines 
      });
      setLoading(false);
    }, 1000);
    
    // TODO: Replace with real API call:
    // try {
    //   const response = await fetch(`https://api.yourservice.com/safety-guidelines?riskLevel=${selectedBasin.riskLevel}`, {
    //     headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
    //   });
    //   const data = await response.json();
    //   setModalData(data);
    // } catch (error) {
    //   console.error('Error fetching safety guidelines:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  // TODO: API INTEGRATION - Handle Broadcast Alert
  // Endpoint: POST https://api.yourservice.com/alerts/broadcast
  // Headers: { 'Authorization': 'Bearer YOUR_API_KEY', 'Content-Type': 'application/json' }
  // Body: { basinId, message, severity, channels: ['sms', 'push', 'email'] }
  // Response: { success: true, recipientsNotified: 1500 }
  const handleBroadcastAlert = async (message, severity = 'high') => {
    setLoading(true);
    
    // DEMO: Simulated API call
    setTimeout(() => {
      alert(`Broadcast Alert Sent!\n\nZone: ${selectedBasin?.name}\nMessage: ${message}\nSeverity: ${severity}\n\nRecipients: ~1,500 citizens`);
      setLoading(false);
      setActiveModal(null);
    }, 1500);
    
    // TODO: Replace with real API call:
    // try {
    //   const response = await fetch('https://api.yourservice.com/alerts/broadcast', {
    //     method: 'POST',
    //     headers: { 
    //       'Authorization': 'Bearer YOUR_API_KEY',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       basinId: selectedBasin.id,
    //       message: message,
    //       severity: severity,
    //       channels: ['sms', 'push', 'email'],
    //       timestamp: new Date().toISOString()
    //     })
    //   });
    //   const data = await response.json();
    //   alert(`Alert broadcasted successfully! ${data.recipientsNotified} recipients notified.`);
    // } catch (error) {
    //   console.error('Error broadcasting alert:', error);
    //   alert('Failed to broadcast alert. Please try again.');
    // } finally {
    //   setLoading(false);
    //   setActiveModal(null);
    // }
  };

  // TODO: API INTEGRATION - Handle Send Warning
  // Endpoint: POST https://api.yourservice.com/alerts/warning
  // Headers: { 'Authorization': 'Bearer YOUR_API_KEY', 'Content-Type': 'application/json' }
  // Body: { basinId, recipients: ['citizens', 'authorities'], message, priority }
  // Response: { success: true, smsSent: 1200, pushSent: 800, emailSent: 450 }
  const handleSendWarning = async (message, recipients = ['citizens']) => {
    setLoading(true);
    
    // DEMO: Simulated API call
    setTimeout(() => {
      alert(`Warning Sent!\n\nZone: ${selectedBasin?.name}\nMessage: ${message}\nRecipients: ${recipients.join(', ')}\n\nSMS: 1,200 sent\nPush: 800 sent\nEmail: 450 sent`);
      setLoading(false);
      setActiveModal(null);
    }, 1500);
    
    // TODO: Replace with real API call:
    // try {
    //   const response = await fetch('https://api.yourservice.com/alerts/warning', {
    //     method: 'POST',
    //     headers: { 
    //       'Authorization': 'Bearer YOUR_API_KEY',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       basinId: selectedBasin.id,
    //       message: message,
    //       recipients: recipients,
    //       priority: 'high',
    //       timestamp: new Date().toISOString()
    //     })
    //   });
    //   const data = await response.json();
    //   alert(`Warning sent! SMS: ${data.smsSent}, Push: ${data.pushSent}, Email: ${data.emailSent}`);
    // } catch (error) {
    //   console.error('Error sending warning:', error);
    //   alert('Failed to send warning. Please try again.');
    // } finally {
    //   setLoading(false);
    //   setActiveModal(null);
    // }
  };

  const handleAction = (actionType) => {
    switch(actionType) {
      case 'emergency':
        handleEmergencyContacts();
        break;
      case 'safety':
        handleSafetyGuidelines();
        break;
      case 'broadcast':
        setActiveModal('broadcast');
        break;
      case 'warning':
        setActiveModal('warning');
        break;
      default:
        console.log('Unknown action:', actionType);
    }
  };

  return (
    <>
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
              onClick={() => handleAction(action.action)}
              disabled={loading}
              className={`p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className={`w-10 h-10 rounded-lg ${action.bg} ${action.color} flex items-center justify-center mb-2`}>
                <action.icon size={20} />
              </div>
              <span className="text-sm font-medium block text-left">{t[action.labelKey]}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[1100] flex items-center justify-center p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border shadow-xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {activeModal === 'emergency' && t.emergencyContacts}
                  {activeModal === 'safety' && t.safetyGuidelines}
                  {activeModal === 'broadcast' && t.broadcastAlert}
                  {activeModal === 'warning' && t.sendWarning}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                  <span className="ml-3 text-gray-500">Loading...</span>
                </div>
              )}

              {/* Emergency Contacts Modal */}
              {!loading && activeModal === 'emergency' && modalData.contacts && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 mb-4">Zone: {selectedBasin?.name}</p>
                  {modalData.contacts.map((contact, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-500">{contact.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-teal-600">{contact.phone}</p>
                          <span className={`text-xs px-2 py-1 rounded ${contact.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            {contact.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Safety Guidelines Modal */}
              {!loading && activeModal === 'safety' && modalData.guidelines && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 mb-4">{modalData.title}</p>
                  {modalData.guidelines.map((guideline, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold flex-shrink-0">
                        {guideline.step}
                      </div>
                      <p className="text-sm pt-1.5">{guideline.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Broadcast Alert Modal */}
              {!loading && activeModal === 'broadcast' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Zone: {selectedBasin?.name}</p>
                  <textarea
                    placeholder="Enter alert message..."
                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    rows={4}
                    onChange={(e) => setModalData({ ...modalData, message: e.target.value })}
                  />
                  <div className="flex gap-3">
                    <select 
                      className={`flex-1 p-2 rounded-lg border ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-300'}`}
                      onChange={(e) => setModalData({ ...modalData, severity: e.target.value })}
                    >
                      <option value="high">High Severity</option>
                      <option value="medium">Medium Severity</option>
                      <option value="low">Low Severity</option>
                    </select>
                    <button
                      onClick={() => handleBroadcastAlert(modalData.message, modalData.severity || 'high')}
                      disabled={!modalData.message}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send Alert
                    </button>
                  </div>
                </div>
              )}

              {/* Send Warning Modal */}
              {!loading && activeModal === 'warning' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Zone: {selectedBasin?.name}</p>
                  <textarea
                    placeholder="Enter warning message..."
                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    rows={4}
                    onChange={(e) => setModalData({ ...modalData, message: e.target.value })}
                  />
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        defaultChecked 
                        className="rounded"
                      />
                      <span className="text-sm">Citizens</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        className="rounded"
                      />
                      <span className="text-sm">Authorities</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        className="rounded"
                      />
                      <span className="text-sm">Emergency Services</span>
                    </label>
                  </div>
                  <button
                    onClick={() => handleSendWarning(modalData.message, ['citizens'])}
                    disabled={!modalData.message}
                    className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Warning
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ActionCenter;
