import { memo, useCallback } from 'react';
import { Button } from '@/shared/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { setAddingPointsFlow } from '@/store/slices/sharedSlice';

const PointsControlPanel = () => {
  const dispatch = useAppDispatch();
  const isAddingPointsFlow = useAppSelector((state) => state.sharedSlice.isAddingPointsFlow);

  const handleToggleAddingFlow = useCallback(() => {
    dispatch(setAddingPointsFlow(!isAddingPointsFlow));
  }, [isAddingPointsFlow, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-2 border w-full">
      <Button onClick={handleToggleAddingFlow} className="w-full"
              variant={isAddingPointsFlow ? 'destructive' : 'default'}>
        {isAddingPointsFlow ? 'Disable points adding' : 'Enable points adding'}
      </Button>
    </div>
  );
};

export default memo(PointsControlPanel);
