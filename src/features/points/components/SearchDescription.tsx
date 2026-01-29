import { useEffect, useState, useTransition } from 'react';
import { INIT_SEARCH_VALUE } from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { setSearch } from '@/features/points/slice/pointsSlice';
import { Input } from '@/shared/components/ui/input';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Button } from '@/shared/components/ui/button';

const SearchDescription = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((s) => s.pointsSlice.search);

  const [searchValue, setSearchValue] = useState(search || INIT_SEARCH_VALUE);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  const handleConfirm = () => {
    startTransition(() => {
      dispatch(setSearch(searchValue));
    });
  };

  const isDisabled = search === searchValue || isPending;

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <Field>
        <FieldLabel htmlFor="input-field-search">Search by description:</FieldLabel>
        <Input
          id="input-field-search"
          name="search"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Field>
      <Button onClick={handleConfirm} disabled={isDisabled} className="w-full">
        {isPending ? 'Searching...' : 'Search'}
      </Button>
    </div>
  );
};

export default SearchDescription;
