import type { LatLngExpression, PathOptions } from 'leaflet';
import type { Sort } from '@/shared/types';

export const EPS = 1e-9;
export const MARKER_SIZE = 8;

const pathOptions: PathOptions = {
  stroke: false,
  opacity: 1,
  weight: 1,
  fillOpacity: 0.7,
};

export const POLYGON_BASE_OPTIONS: PathOptions = {
  ...pathOptions,
};
export const POLYGON_HIGHLIGHT_OPTIONS: PathOptions = {
  ...pathOptions,
  fillColor: 'green',
};

export const INIT_MAP_ZOOM = 13;
const lat = 50.4501;
const lng = 30.53;
export const INIT_MAP_CENTER: LatLngExpression = [lat, lng];

export const POINT_TYPE_SELECTOR: Record<string, string>[] = [
  { value: 'Проба ґрунту', label: 'Проба ґрунту' },
  { value: 'Шкідники', label: 'Шкідники' },
  { value: 'Хвороби рослин', label: 'Хвороби рослин' },
  { value: 'Інше', label: 'Інше' },
];

export const SORT_SELECTOR: Record<string, string>[] = [
  { value: 'asc', label: 'asc' },
  { value: 'desc', label: 'desc' },
];

export const INIT_FILTER_VALUE = '';
export const INIT_SEARCH_VALUE = '';
export const INIT_SORT_VALUE: Sort = 'asc';

export const POINT_SELECTOR_ICONS = [
  'alien-svgrepo-com.svg', 'axe-svgrepo-com.svg', 'anchor-svgrepo-com.svg', 'bee-svgrepo-com.svg',
];

export const ICON_MAP = POINT_TYPE_SELECTOR.reduce(
  (acc, item, idx) => {
    acc[item.label] = POINT_SELECTOR_ICONS[idx];
    return acc;
  },
  {}
);
