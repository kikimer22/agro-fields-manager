import { useState, type ReactNode } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import { MapContext } from '@/context/MapContext';

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<LeafletMap | null>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};
