import type { Feature, FeatureCollection, Polygon } from 'geojson';

export type ColorPalette =
  | '#800026'
  | '#BD0026'
  | '#E31A1C'
  | '#FC4E2A'
  | '#FD8D3C'
  | '#FEB24C'
  | '#FED976'
  | '#FFEDA0';

export type FieldProperties = {
  id: string;
  name: string;
  area: number;
  crop?: string;
};

export type FieldFeature = Feature<Polygon, FieldProperties>;

export type FieldsCollection = FeatureCollection<Polygon, FieldProperties>;



