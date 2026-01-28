import CreateControlPanel from '@/features/createField/components/CreateControlPanel';
import SelectControlPanel from '@/features/fields/components/SelectControlPanel';
import PointsControlPanel from '@/features/points/components/PointsControlPanel';
import { Separator } from '@/shared/components/ui/separator.tsx';

const ControlPanel = () => {
  return (
    <div className="overflow-auto py-8">
      <div className="flex flex-col justify-center items-center gap-4 px-4">
        <CreateControlPanel/>

        <Separator/>

        <SelectControlPanel/>

        <Separator/>

        <PointsControlPanel/>
      </div>
    </div>
  );
};

export default ControlPanel;
