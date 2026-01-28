import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import FilterType from '@/features/points/components/FilterType';
import SearchDescription from '@/features/points/components/SearchDescription';
import SortDate from '@/features/points/components/SortDate';
import { Separator } from '@/shared/components/ui/separator';
import { Button } from '@/shared/components/ui/button.tsx';
import { removePoint, resetFilters } from '@/features/points/slice/pointsSlice.ts';
import { INIT_FILTER_VALUE, INIT_SEARCH_VALUE, INIT_SORT_VALUE } from '@/shared/constants.ts';

const PointsList = () => {
  const dispatch = useAppDispatch();
  const pointsData = useAppSelector((s) => s.pointsSlice.points);
  const points = useAppSelector((s) => s.pointsSlice.selectedPoints);
  const filter = useAppSelector((s) => s.pointsSlice.filter);
  const search = useAppSelector((s) => s.pointsSlice.search);
  const sort = useAppSelector((s) => s.pointsSlice.sort);

  const isFiltered = filter !== INIT_FILTER_VALUE || search !== INIT_SEARCH_VALUE || sort !== INIT_SORT_VALUE;

  const handleRemove = (id: string) => {
    dispatch(removePoint(id));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  if (!pointsData.length) {
    return (
      <div>No points...</div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      {isFiltered && (
        <Button variant="destructive" onClick={handleResetFilters} className="w-full">
          Reset Filters
        </Button>
      )}
      <FilterType/>
      <SearchDescription/>
      <SortDate/>
      <Separator/>
      {!points.length ? (
        <div><p>No points with this filters configuration...</p></div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 w-full [&>*:not(:last-child)]:border-b">
          {points.map((point) => (
            <div key={point.id}
                 className="flex flex-col justify-center items-start gap-2 pb-4 w-full">
              <h3 className="font-bold">{point.type}</h3>
              <p>Lat: {point.lat.toFixed(4)}</p>
              <p>Lng: {point.lng.toFixed(4)}</p>
              <p>MGRS: {point.mgrs}</p>
              {point.description && <p className="mt-2">Description: {point.description}</p>}
              <Button variant="destructive" onClick={() => handleRemove(point.id)} className="w-full">Remove</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PointsList;
