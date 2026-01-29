import { useMemo } from 'react';
import { Button } from '@/shared/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { setCreatingFieldFlow } from '@/store/slices/sharedSlice';
import { setAddingPointsMode, setConfirm, reset } from '@/features/createField/slice/fieldSlice';
import { MIN_VERTICES_LENGTH_FOR_POLYGON } from '@/shared/constants';

const CreateControlPanel = () => {
  const dispatch = useAppDispatch();
  const isCreatingFieldFlow = useAppSelector((s) => s.sharedSlice.isCreatingFieldFlow);
  const feature = useAppSelector((s) => s.fieldSlice.feature);
  const isAddingPointsMode = useAppSelector((s) => s.fieldSlice.isAddingPointsMode);
  const isConfirm = useAppSelector((s) => s.fieldSlice.isConfirm);

  const vertices = useMemo(() => feature.geometry.coordinates[0], [feature]);
  const isShowingField = useMemo(() => vertices.length >= MIN_VERTICES_LENGTH_FOR_POLYGON, [vertices]);

  const handleToggleCreating = () => {
    dispatch(setCreatingFieldFlow(!isCreatingFieldFlow));
  };

  const handleToggleAddingPointsMode = () => {
    dispatch(setAddingPointsMode(!isAddingPointsMode));
  };

  const handleConfirm = () => {
    dispatch(setConfirm(true));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-2 border w-full">
      <Button onClick={handleToggleCreating} className="w-full"
              variant={isCreatingFieldFlow ? 'secondary' : 'default'}>
        {isCreatingFieldFlow ? 'Disable creating polygon' : 'Enable creating polygon'}
      </Button>

      {isCreatingFieldFlow && (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <p>Current mode: <br/> {isAddingPointsMode ? 'ADD' : 'REMOVE'} Points</p>
            <Button onClick={handleToggleAddingPointsMode} className="w-full"
                    disabled={!vertices.length || isConfirm}
                    variant={isAddingPointsMode ? 'default' : 'destructive'}>
              Toggle mode
            </Button>
          </div>
          <Button onClick={handleConfirm} className="w-full"
                  disabled={!isShowingField || isConfirm}>
            Confirm creation
          </Button>
          <Button onClick={handleReset} className="w-full" variant="destructive"
                  disabled={!vertices.length}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateControlPanel;
