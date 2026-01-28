import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { Button } from '@/shared/components/ui/button';
import type { FieldFeature } from '@/shared/types';
import useFieldActions from '@/features/fields/hooks/useFields';
import { removeField } from '@/features/fields/slice/fieldsSlice';

const FieldsList = () => {
  const dispatch = useAppDispatch();
  const features = useAppSelector((state) => state.fieldsSlice.fieldsCollection.features);
  const selectedFieldId = useAppSelector((state) => state.fieldsSlice.selectedFieldId);
  const { selectAndCenter } = useFieldActions();

  const handleRemove = (id: string) => {
    dispatch(removeField(id));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full [&>*:not(:last-child)]:border-b">
      {features.map((f: FieldFeature) => {
        const isSelected = !!(selectedFieldId && selectedFieldId === f.properties.id);
        return (
          <div key={f.properties.id}
               className="flex flex-col justify-center items-start gap-2 pb-4 w-full"
          >
            <h3 className={clsx('font-bold', isSelected && 'text-green-600')}>{f.properties.name}</h3>
            <p className={clsx(isSelected && 'text-green-600')}>Площа: {f.properties.area.toFixed(4)} га</p>
            <p className={clsx(isSelected && 'text-green-600')}>Культура: {f.properties.crop}</p>
            <Button onClick={() => selectAndCenter(f)}
                    className="w-full"
            >
              {isSelected ? 'Unselect' : 'Select & center'}
            </Button>
            <Button variant="destructive" onClick={() => handleRemove(f.properties.id)}
                    className="w-full"
            >
              Remove
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default FieldsList;
