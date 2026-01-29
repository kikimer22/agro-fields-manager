import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { setAddingPointsFlow } from '@/store/slices/sharedSlice';
import { Button } from '@/shared/components/ui/button';
import PointsList from '@/features/points/components/PointsList';
import { useCallback, useState } from 'react';
import { resetFilters } from '@/features/points/slice/pointsSlice.ts';
import { INIT_FILTER_VALUE, INIT_SEARCH_VALUE, INIT_SORT_VALUE } from '@/shared/constants.ts';
import SearchDescription from '@/features/points/components/SearchDescription.tsx';
import SortDate from '@/features/points/components/SortDate.tsx';
import FilterType from '@/features/points/components/FilterType.tsx';
import { Separator } from '@/shared/components/ui/separator.tsx';

const PointsControlPanel = () => {
  const dispatch = useAppDispatch();
  const isAddingPointsFlow = useAppSelector((s) => s.sharedSlice.isAddingPointsFlow);
  const selectedField = useAppSelector((s) => s.sharedSlice.selectedField);
  const filter = useAppSelector((s) => s.pointsSlice.filter);
  const search = useAppSelector((s) => s.pointsSlice.search);
  const sort = useAppSelector((s) => s.pointsSlice.sort);

  const [isShowFilters, setIsShowFilters] = useState(false);

  const isFiltered =
    filter !== INIT_FILTER_VALUE ||
    search !== INIT_SEARCH_VALUE ||
    sort !== INIT_SORT_VALUE;

  const handleToggleAddingFlow = () => {
    dispatch(setAddingPointsFlow(!isAddingPointsFlow));
  };

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-2 border w-full">
      <Button onClick={handleToggleAddingFlow} className="w-full"
              variant={isAddingPointsFlow ? 'secondary' : 'default'}
              disabled={!selectedField?.properties?.id}
      >
        {isAddingPointsFlow ? 'Disable points adding' : 'Enable points adding'}
      </Button>

      {isAddingPointsFlow && (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <Button
              variant="secondary"
              onClick={() => setIsShowFilters(!isShowFilters)}
              className="w-full"
            >
              {isShowFilters ? 'Hide filters' : 'Show filters'}
            </Button>
            {isShowFilters && (
              <>
                {isFiltered && (
                  <Button
                    variant="destructive"
                    onClick={handleResetFilters}
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                )}
                <FilterType/>
                <SearchDescription/>
                <SortDate/>
              </>
            )}
          </div>

          <Separator/>

          <PointsList/>
        </div>
      )}
    </div>
  );
};

export default PointsControlPanel;
