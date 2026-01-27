import { clsx, type ClassValue } from 'clsx';
import { type MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ColorPalette } from '@/shared/types';
import type { Position } from 'geojson';
import type { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import { forward, inverse } from 'mgrs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateFieldColor = (v: number): ColorPalette => {
  return v > 1000 ? '#800026' :
    v > 500 ? '#BD0026' :
      v > 200 ? '#E31A1C' :
        v > 100 ? '#FC4E2A' :
          v > 50 ? '#FD8D3C' :
            v > 20 ? '#FEB24C' :
              v > 10 ? '#FED976' :
                '#FFEDA0';
};

export const transformPositionToLatLngExpression = ([lng, lat]: Position): LatLngExpression => ([lat, lng]);

export const transformPositionsToLatLngExpression = (arr: Position[]): LatLngExpression[] => arr.map(transformPositionToLatLngExpression);

export const ensureClosedPolygon = (coords: Position[]): Position[] => {
  if (coords.length === 0) return coords;

  const [firstLng, firstLat] = coords[0];
  const [lastLng, lastLat] = coords[coords.length - 1];

  if (firstLng !== lastLng || firstLat !== lastLat) {
    return [...coords, [firstLng, firstLat]];
  }

  return coords;
};

export const convertToMGRS = (lat: number, lng: number): string => {
  return forward([lng, lat]);
};

export const convertFromMGRS = (mgrsString: string): [number, number, number, number] => {
  return inverse(mgrsString);
};

export const stopAndPrevent = (e?: LeafletMouseEvent | MouseEvent) => {
  if (!e) return;
  const orig = (e as LeafletMouseEvent).originalEvent || e;
  if (!orig) return;

  if (typeof orig.stopPropagation === 'function') {
    orig.stopPropagation();
  }
  if (typeof orig.preventDefault === 'function') {
    orig.preventDefault();
  }
};
