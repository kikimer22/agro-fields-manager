import { Button } from '@/shared/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { setCreatingFieldFlow } from '@/store/slices/sharedSlice';
import { setAddingPointsMode, setConfirmCreation, reset } from '@/features/createField/slice/fieldSlice';

const CreateControlPanel = () => {
  const dispatch = useAppDispatch();
  const isCreatingFieldFlow = useAppSelector((state) => state.sharedSlice.isCreatingFieldFlow);
  const isConfirmCreation = useAppSelector((state) => state.fieldSlice.isConfirmCreation);
  const isShowingField = useAppSelector((state) => state.fieldSlice.isShowingField);
  const isAddingPointsMode = useAppSelector((state) => state.fieldSlice.isAddingPointsMode);

  const handleToggleCreating = () => {
    dispatch(setCreatingFieldFlow(!isCreatingFieldFlow));
    // if (isConfirmCreation) dispatch(setConfirmCreation(false));
  };

  const handleToggleAddingPointsMode = () => {
    dispatch(setAddingPointsMode(!isAddingPointsMode));
  };

  const handleToggleConfirm = () => {
    dispatch(setConfirmCreation(!isConfirmCreation));
    // if (isCreatingFieldFlow) dispatch(setCreatingFieldFlow(false));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-2 border w-full">
      <Button onClick={handleToggleCreating} className="w-full"
              variant={isCreatingFieldFlow ? 'destructive' : 'default'}>
        {isCreatingFieldFlow ? 'Disable creating polygon' : 'Enable creating polygon'}
      </Button>

      {isCreatingFieldFlow && (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <Button onClick={handleToggleAddingPointsMode} className="w-full"
                  variant={isAddingPointsMode ? 'default' : 'destructive'}>
            Current mode: {isAddingPointsMode ? 'ADD' : 'REMOVE'}
          </Button>
          <Button onClick={handleToggleConfirm} className="w-full" disabled={!isShowingField || isConfirmCreation}>Confirm creation</Button>
          <Button onClick={handleReset} className="w-full" variant="destructive">Reset</Button>
        </div>
      )}
    </div>
  );
};

export default CreateControlPanel;
