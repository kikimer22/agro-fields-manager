import { Button } from '@/shared/components/ui/button';
import FieldsList from '@/features/fields/components/FieldsList';
import useFields from '@/features/fields/hooks/useFields';
import { useAppSelector } from '@/store/hooks/useRdxStore';

const SelectControlPanel = () => {
  const isSelectingFieldFlow = useAppSelector((s) => s.sharedSlice.isSelectingFieldFlow);

  const { handleToggleSelectingFlow } = useFields();

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-2 border w-full">
      <Button onClick={handleToggleSelectingFlow} className="w-full"
              variant={isSelectingFieldFlow ? 'secondary' : 'default'}
      >
        {isSelectingFieldFlow ? 'Disable polygon select' : 'Enable polygon select'}
      </Button>

      {isSelectingFieldFlow && <FieldsList/>}
    </div>
  );
};

export default SelectControlPanel;
