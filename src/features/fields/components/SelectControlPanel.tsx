import { Button } from '@/shared/components/ui/button';
import FieldsList from '@/features/fields/components/FieldsList';
import useFields from '@/features/fields/hooks/useFields.ts';
import { useAppSelector } from '@/store/hooks/useRdxStore';

const SelectControlPanel = () => {
  const isSelectingFieldFlow = useAppSelector((state) => state.sharedSlice.isSelectingFieldFlow);
  const { handleToggleSelectingFlow } = useFields();

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-2 border w-full">
      <Button onClick={handleToggleSelectingFlow} className="w-full"
              variant={isSelectingFieldFlow ? 'destructive' : 'default'}
      >
        {isSelectingFieldFlow ? 'Disable polygon select' : 'Enable polygon select'}
      </Button>

      {isSelectingFieldFlow && <FieldsList/>}
    </div>
  );
};

export default SelectControlPanel;
