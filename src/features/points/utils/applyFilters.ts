import type { PointsCollection } from '@/features/points/types';
import type { Sort } from '@/shared/types';

const applyFilters = (
  points: PointsCollection,
  filter: string,
  search: string,
  sort: Sort
): PointsCollection => {
  const result: PointsCollection = {};

  Object.entries(points).forEach(([fieldId, list]) => {
    let filtered = [...list];

    if (filter && filter !== '') {
      filtered = filtered.filter((p) => p.type === filter);
    }

    if (search && search !== '') {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((p) =>
        p.description.toLowerCase().includes(searchLower)
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sort === 'asc' ? dateA - dateB : dateB - dateA;
    });

    result[fieldId] = filtered;
  });

  return result;
};

export default applyFilters;
