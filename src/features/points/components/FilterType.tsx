import { useState, useEffect, useTransition } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { setFilter } from '@/features/points/slice/pointsSlice';
import { INIT_FILTER_VALUE, POINT_TYPE_SELECTOR } from '@/shared/constants';
import { Button } from '@/shared/components/ui/button.tsx';
import { Field, FieldLabel } from '@/shared/components/ui/field.tsx';
import { NativeSelect, NativeSelectOption } from '@/shared/components/ui/native-select.tsx';

const FilterType = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.pointsSlice.filter);

  const [filterValue, setFilterValue] = useState(filter || INIT_FILTER_VALUE);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setFilterValue(filter);
  }, [filter]);

  const handleConfirm = () => {
    startTransition(() => {
      dispatch(setFilter(filterValue));
    });
  };

  const isDisabled = filter === filterValue || isPending;

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <Field>
        <FieldLabel htmlFor="input-field-filter-type">
          {filter ? `Filter: ${filter}` : 'Filter'}
        </FieldLabel>
        <NativeSelect
          id="input-field-filter-type"
          name="filter-type"
          aria-label="Filter by type"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <NativeSelectOption value={INIT_FILTER_VALUE}>
            No filter
          </NativeSelectOption>
          {POINT_TYPE_SELECTOR.map(({ value, label }) => (
            <NativeSelectOption key={value} value={value}>
              {label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>
      <Button onClick={handleConfirm} disabled={isDisabled} className="w-full">
        {isPending ? 'Applying...' : 'Apply filter'}
      </Button>
    </div>
  );
};

export default FilterType;
