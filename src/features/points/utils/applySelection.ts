import type { Point } from '@/features/points/types';
import type { Sort } from '@/shared/types';

const applySelection = (points: Point[], filter: string, search: string, sort: Sort): Point[] => {
  let list = [...points];

  if (filter) {
    list = list.filter((p) => p.type === filter);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    list = list.filter((p) => p.description.toLowerCase().includes(searchLower));
  }

  list.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sort === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return list;
};

export default applySelection;
