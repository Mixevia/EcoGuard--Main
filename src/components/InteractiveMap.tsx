import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export const InteractiveMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Basic default style
      center: [32.5825, 0.3476], // Kampala, Uganda
      zoom: 12,
      pitch: 45, // 3D effect
      bearing: -17.6,
      antialias: true
    });

    map.current.on('load', () => {
      // Add 3D buildings if needed, but demotiles might not have them easily.
      // For demo purposes, we'll just have the interactive 3D view.
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div ref={mapContainer} className="w-full h-full rounded-xl" />
  );
};
