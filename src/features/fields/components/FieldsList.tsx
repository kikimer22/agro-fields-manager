import { useAppSelector } from '@/store/hooks/useRdxStore';
import { Button } from '@/shared/components/ui/button';
import type { FieldFeature } from '@/shared/types';
import useFieldActions from '@/features/fields/hooks/useFields';
import clsx from 'clsx';

const FieldsList = () => {
  const features = useAppSelector((state) => state.fieldsSlice.fieldsCollection.features);
  const selectedFieldId = useAppSelector((state) => state.fieldsSlice.selectedFieldId);
  const { selectAndCenter } = useFieldActions();

  return (
    <div className="flex flex-col justify-center items-center gap-4 [&>*:not(:last-child)]:border-b">
      {features.map((f: FieldFeature) => (
        <div key={f.properties.id}
             className={clsx('flex flex-col justify-center items-center gap-2 pb-4', selectedFieldId === f.properties.id && 'bg-amber-400')}>
          <h3 className="font-bold">{f.properties.name}</h3>
          <p>Площа: {f.properties.area.toFixed(4)} га</p>
          <p>Культура: {f.properties.crop}</p>
          <div className="flex gap-2">
            <Button onClick={() => selectAndCenter(f)}>Select & center</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FieldsList;
