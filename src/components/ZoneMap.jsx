import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const riskColors = {
  High: { fill: '#ef4444', stroke: '#dc2626' },
  Medium: { fill: '#eab308', stroke: '#ca8a04' },
  Low: { fill: '#22c55e', stroke: '#16a34a' },
};

const ZoneMap = ({ basins, selectedBasin, onBasinSelect, darkMode, language, t }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const polygonsRef = useRef([]);
  const [isClient, setIsClient] = useState(false);

  // Center on Guwahati area
  const center = [26.1480, 91.6750];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize map only once on client
  useEffect(() => {
    if (!isClient || !mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Use CartoDB Voyager tiles (like MainProject)
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);

    mapInstanceRef.current = map;

    // Handle resize
    const handleResize = () => {
      setTimeout(() => map.invalidateSize(), 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient]);

  // Update polygons when basins or selection changes
  useEffect(() => {
    if (!mapInstanceRef.current || !isClient) return;

    // Remove existing polygons
    polygonsRef.current.forEach((polygon) => polygon.remove());
    polygonsRef.current = [];

    // Add new polygons for each basin
    basins.forEach((basin) => {
      if (!basin.polygon || basin.polygon.length === 0) return;

      const isSelected = selectedBasin?.id === basin.id;
      const colors = riskColors[basin.riskLevel] || riskColors.Low;
      
      // Get bilingual name
      const name = language === 'as' && basin.nameAssamese 
        ? basin.nameAssamese 
        : basin.name;

      const polygon = L.polygon(basin.polygon, {
        color: isSelected ? '#0d9488' : colors.stroke,
        fillColor: colors.fill,
        fillOpacity: isSelected ? 0.5 : 0.35,
        weight: isSelected ? 3 : 2,
        dashArray: isSelected ? undefined : '5, 5',
      }).addTo(mapInstanceRef.current);

      // Add tooltip with bilingual content
      const riskLevelText = language === 'as' 
        ? (basin.riskLevel === 'High' ? 'উচ্চ' : basin.riskLevel === 'Medium' ? 'মধ্যম' : 'নিম্ন')
        : basin.riskLevel;

      const tooltipContent = `
        <div style="min-width: 180px; padding: 4px;">
          <p style="font-weight: 600; margin: 0 0 4px 0;">${name}</p>
          <div style="font-size: 12px; color: #666;">
            <p style="margin: 2px 0;"><strong>${t.riskLevel}:</strong> <span style="color: ${
              basin.riskLevel === 'High' ? '#dc2626' : basin.riskLevel === 'Medium' ? '#ca8a04' : '#16a34a'
            }; font-weight: 600;">${riskLevelText}</span></p>
            <p style="margin: 2px 0;"><strong>${t.currentRainfall}:</strong> ${basin.rainfall} ${t.mm}</p>
            <p style="margin: 2px 0;"><strong>${t.riverLevel}:</strong> ${basin.riverLevel} m</p>
            <p style="margin: 2px 0;"><strong>${t.drainageBlockage}:</strong> ${basin.drainageBlockage}%</p>
          </div>
        </div>
      `;

      polygon.bindTooltip(tooltipContent, { sticky: true });

      // Handle click
      polygon.on('click', () => onBasinSelect(basin));

      // Hover effects
      polygon.on('mouseover', () => {
        polygon.setStyle({ fillOpacity: 0.6, weight: 3 });
      });
      polygon.on('mouseout', () => {
        polygon.setStyle({
          fillOpacity: isSelected ? 0.5 : 0.35,
          weight: isSelected ? 3 : 2,
        });
      });

      polygonsRef.current.push(polygon);
    });

    // Fly to selected basin
    if (selectedBasin && selectedBasin.coords) {
      mapInstanceRef.current.flyTo(selectedBasin.coords, 14, {
        duration: 0.8,
      });
    }
  }, [basins, selectedBasin, language, t, isClient, onBasinSelect]);

  if (!isClient) {
    return (
      <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} shadow-sm`}>
        <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
          <MapPin className="text-teal-500" size={20} />
          <h3 className="font-semibold">{t.liveZoneMap}</h3>
        </div>
        <div className="h-64 w-full flex items-center justify-center">
          <div className="text-gray-400">Loading map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} shadow-sm`}>
      <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
        <MapPin className="text-teal-500" size={20} />
        <h3 className="font-semibold">{t.liveZoneMap}</h3>
      </div>
      
      <div className="relative h-64 w-full">
        <div ref={mapContainerRef} className="h-full w-full" />
        
        {/* Legend */}
        <div className={`absolute bottom-3 left-3 z-[1000] rounded-lg p-2 shadow-lg backdrop-blur-sm ${darkMode ? 'bg-slate-800/90' : 'bg-white/90'}`}>
          <p className={`mb-1.5 text-[10px] font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t.riskLevel}
          </p>
          <div className="space-y-1">
            {['High', 'Medium', 'Low'].map((level) => {
              const label = language === 'as' 
                ? (level === 'High' ? 'উচ্চ' : level === 'Medium' ? 'মধ্যম' : 'নিম্ন')
                : level;
              return (
                <div key={level} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: riskColors[level].fill }}
                  />
                  <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guwahati Label */}
        <div className={`absolute bottom-3 right-3 z-[1000] rounded-lg px-2 py-1 text-xs font-medium shadow-lg backdrop-blur-sm ${darkMode ? 'bg-slate-800/90 text-gray-300' : 'bg-white/90 text-gray-700'}`}>
          Guwahati, Assam
        </div>
      </div>
    </div>
  );
};

export default ZoneMap;
