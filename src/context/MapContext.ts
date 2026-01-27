import { createContext, useContext } from 'react';
import type { Map as LeafletMap } from 'leaflet';

type MapContextType = {
  map: LeafletMap | null;
  setMap: (m: LeafletMap | null) => void;
};

export const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMapContext = (): MapContextType => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error('useMapContext must be used inside MapProvider');
  return ctx;
};
