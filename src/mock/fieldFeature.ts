import type { FieldFeature } from '@/shared/types.ts';

export const fieldFeature: FieldFeature = {
  'type': 'Feature',
  'properties': {
    'id': 'field-1',
    'name': 'Поле №1 - Пшениця',
    'area': 45.2,
    'crop': 'Пшениця'
  },
  'geometry': {
    'type': 'Polygon',
    'coordinates': [[
      [30.5234, 50.4501],
      [30.5334, 50.4501],
      [30.5334, 50.4601],
      [30.5234, 50.4601],
      [30.5234, 50.4501]
    ]]
  }
};
