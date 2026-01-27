import type { PathOptions } from 'leaflet';

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

export const POINT_SELECTOR = [
  { value: 'Проба ґрунту', label: 'Проба ґрунту' },
  { value: 'Шкідники', label: 'Шкідники' },
  { value: 'Хвороби рослин', label: 'Хвороби рослин' },
  { value: 'Інше', label: 'Інше' },
];

export const POINT_SELECTOR_ICONS = [
  'alien-svgrepo-com.svg', 'axe-svgrepo-com.svg', 'anchor-svgrepo-com.svg', 'bee-svgrepo-com.svg',
];

export const ICON_MAP: Record<string, string> = POINT_SELECTOR.reduce(
  (acc, item, idx) => {
    acc[item.label] = POINT_SELECTOR_ICONS[idx];
    return acc;
  },
  {} as Record<string, string>
);
