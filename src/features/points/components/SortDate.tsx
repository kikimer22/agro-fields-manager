import { useState, useEffect, useTransition } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { setSort } from '@/features/points/slice/pointsSlice';
import { INIT_SORT_VALUE, SORT_SELECTOR } from '@/shared/constants';
import { Button } from '@/shared/components/ui/button.tsx';
import { Field, FieldLabel } from '@/shared/components/ui/field.tsx';
import { NativeSelect, NativeSelectOption } from '@/shared/components/ui/native-select';
import type { Sort } from '@/shared/types';

const SortDate = () => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((s) => s.pointsSlice.sort);

  const [sortValue, setSortValue] = useState(sort || INIT_SORT_VALUE);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSortValue(sort);
  }, [sort]);

  const handleConfirm = () => {
    startTransition(() => {
      dispatch(setSort(sortValue));
    });
  };

  const isDisabled = sort === sortValue || isPending;

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <Field>
        <FieldLabel htmlFor="input-field-sort-date">
          {sort ? `Sort by date: ${sort}` : 'Sort by date'}
        </FieldLabel>
        <NativeSelect
          id="input-field-sort-date"
          name="sort-date"
          aria-label="Sort by date"
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value as Sort)}
        >
          {SORT_SELECTOR.map(({ value, label }) => (
            <NativeSelectOption key={value} value={value}>
              {label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>
      <Button onClick={handleConfirm} disabled={isDisabled} className="w-full">
        {isPending ? 'Sorting...' : 'Sort by date'}
      </Button>
    </div>
  );
};

export default SortDate;
