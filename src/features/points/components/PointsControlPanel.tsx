import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { setAddingPointsFlow } from '@/store/slices/sharedSlice';
import { Button } from '@/shared/components/ui/button';
import PointsList from '@/features/points/components/PointsList';

const PointsControlPanel = () => {
  const dispatch = useAppDispatch();
  const isAddingPointsFlow = useAppSelector((state) => state.sharedSlice.isAddingPointsFlow);
  const selectedField = useAppSelector((state) => state.sharedSlice.selectedField);

  const handleToggleAddingFlow = () => {
    dispatch(setAddingPointsFlow(!isAddingPointsFlow));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-2 border w-full">
      <Button onClick={handleToggleAddingFlow} className="w-full"
              variant={isAddingPointsFlow ? 'destructive' : 'default'}
              disabled={!selectedField?.properties?.id}
      >
        {isAddingPointsFlow ? 'Disable points adding' : 'Enable points adding'}
      </Button>

      {isAddingPointsFlow && (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <PointsList/>
        </div>
      )}
    </div>
  );
};

export default PointsControlPanel;
