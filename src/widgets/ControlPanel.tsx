import CreateControlPanel from '@/features/createField/components/CreateControlPanel';
import SelectControlPanel from '@/features/fields/components/SelectControlPanel';
import PointsControlPanel from '@/features/points/components/PointsControlPanel.tsx';

const ControlPanel = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 p-4">

      <CreateControlPanel/>

      <SelectControlPanel/>

      <PointsControlPanel/>

    </div>
  );
};

export default ControlPanel;
