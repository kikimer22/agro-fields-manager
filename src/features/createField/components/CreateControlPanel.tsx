import { useCallback } from 'react';
import { Button } from '@/shared/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { setCreatingFieldFlow } from '@/store/slices/sharedSlice';
import { setAddingPointsMode, setConfirmCreation } from '@/features/createField/slice/fieldSlice';

const CreateControlPanel = () => {
  const dispatch = useAppDispatch();
  const isCreatingFieldFlow = useAppSelector((state) => state.sharedSlice.isCreatingFieldFlow);
  const isConfirmCreation = useAppSelector((state) => state.fieldSlice.isConfirmCreation);
  const isShowingField = useAppSelector((state) => state.fieldSlice.isShowingField);
  const isAddingPointsMode = useAppSelector((state) => state.fieldSlice.isAddingPointsMode);

  const handleToggleCreating = useCallback(() => {
    dispatch(setCreatingFieldFlow(!isCreatingFieldFlow));
    if (isConfirmCreation) dispatch(setConfirmCreation(false));
  }, [isCreatingFieldFlow, dispatch, isConfirmCreation]);

  const handleToggleConfirm = useCallback(() => {
    dispatch(setConfirmCreation(!isConfirmCreation));
    if (isCreatingFieldFlow) dispatch(setCreatingFieldFlow(false));
  }, [isConfirmCreation, dispatch, isCreatingFieldFlow]);

  const handleToggleAddingPointsMode = useCallback(() => {
    dispatch(setAddingPointsMode(!isAddingPointsMode));
  }, [isAddingPointsMode, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-2 border w-full">
      <Button onClick={handleToggleCreating} className="w-full"
              variant={isCreatingFieldFlow ? 'destructive' : 'default'}>
        {isCreatingFieldFlow ? 'Disable creating polygon' : 'Enable creating polygon'}
      </Button>

      {isCreatingFieldFlow && (
        <div className="flex flex-col justify-center items-center gap-4">
          <Button onClick={handleToggleAddingPointsMode} className="w-full"
                  variant={isAddingPointsMode ? 'default' : 'destructive'}>
            current mode: {isAddingPointsMode ? 'ADD' : 'REMOVE'}
          </Button>
          <Button onClick={handleToggleConfirm} className="w-full" disabled={!isShowingField}>Confirm creation</Button>
        </div>
      )}
    </div>
  );
};

export default CreateControlPanel;
