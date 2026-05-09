import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Drawer } from 'vaul';
import { motion } from 'motion/react';
import { Search, Sliders, MapPin, Wind, Thermometer, Info, Target, Flame, Droplets, Hash, Trees } from 'lucide-react';
import { Incident } from '../types';
import { cn } from '../lib/utils';

// Mock Incidents
const mockIncidents: Incident[] = [
  { id: '1', type: 'FIRE', location: [0.3476, 32.5825], title: 'Surface Fire Detected', description: 'Small grass fire reported near Kololo Hill. NEMA alerted.', time: '1h ago', severity: 'HIGH' },
  { id: '2', type: 'FLOOD', location: [0.3200, 32.6100], title: 'Rising Water Levels', description: 'Nakivubo channel overflowing due to heavy rain.', time: '3h ago', severity: 'MEDIUM' },
  { id: '3', type: 'DEFORESTATION', location: [0.3800, 32.5500], title: 'Illegal Logging', description: 'Unidentified activity in suburban green zone.', time: '12h ago', severity: 'CRITICAL' },
];

const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

export const MapScreen: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMarkerClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsDrawerOpen(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return '#ef4444';
      case 'HIGH': return '#f97316';
      case 'MEDIUM': return '#eab308';
      default: return '#22c55e';
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'FIRE': return <Flame size={20} className="text-orange-500" />;
      case 'FLOOD': return <Droplets size={20} className="text-blue-500" />;
      case 'DEFORESTATION': return <Trees size={20} className="text-green-600" />;
      default: return <Info size={20} />;
    }
  };

  return (
    <div className="relative h-full -mx-4 -mt-5">
      {/* Map Control Overlays */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col gap-3">
        <div className="w-full h-12 bg-surface/90 backdrop-blur-xl rounded-xl border border-outline-variant shadow-lg flex items-center px-4 gap-3">
          <Search size={20} className="text-outline" />
          <input 
            type="text" 
            placeholder="Search areas or incidents..." 
            className="bg-transparent border-none w-full focus:ring-0 text-sm font-medium"
          />
          <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
            <Sliders size={18} />
          </button>
        </div>
      </div>

      <div className="w-full h-full z-0">
        <MapContainer 
          center={[0.3476, 32.5825]} 
          zoom={12} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {mockIncidents.map((incident) => (
            <CircleMarker
              key={incident.id}
              center={incident.location}
              radius={10}
              pathOptions={{
                fillColor: getSeverityColor(incident.severity),
                fillOpacity: 0.6,
                color: 'white',
                weight: 2
              }}
              eventHandlers={{
                click: () => handleMarkerClick(incident),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* FAB - My Location */}
      <button className="absolute bottom-24 right-4 z-[1000] w-12 h-12 bg-surface rounded-full shadow-xl border border-outline-variant flex items-center justify-center text-primary hover:bg-surface-container transition-all active:scale-95">
        <Target size={20} />
      </button>

      {/* shadcn Drawer (via vaul) */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[2000]" />
          <Drawer.Content className="bg-surface flex flex-col rounded-t-[32px] h-[400px] mt-24 fixed bottom-0 left-0 right-0 z-[2001] outline-none border-t border-outline-variant">
            <div className="flex-1 p-6 rounded-t-[32px]">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-outline-variant mb-8" />
              
              {selectedIncident && (
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider",
                          selectedIncident.severity === 'CRITICAL' ? 'bg-error-container text-error' : 
                          selectedIncident.severity === 'HIGH' ? 'bg-orange-100 text-orange-600' : 
                          'bg-primary/10 text-primary'
                        )}>
                          {selectedIncident.severity} Severity
                        </span>
                        <span className="text-xs font-bold text-outline">• {selectedIncident.time}</span>
                      </div>
                      <Drawer.Title className="text-2xl font-black text-on-surface leading-tight tracking-tight">
                        {selectedIncident.title}
                      </Drawer.Title>
                    </div>
                    <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center shadow-sm">
                      {getIncidentIcon(selectedIncident.type)}
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-2xl mb-6">
                    <p className="text-sm text-on-surface font-medium leading-relaxed">
                      {selectedIncident.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-primary text-white h-14 rounded-2xl font-black text-sm shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                      Verify Report
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-surface-container text-on-surface h-14 rounded-2xl font-black text-sm border border-outline-variant active:scale-95 transition-transform">
                      Share Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};
