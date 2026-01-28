import { type ChangeEvent, memo, type MouseEvent, useEffect, useEffectEvent, useRef, useState } from 'react';
import type { FieldProperties } from '@/shared/types';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { stopAndPrevent } from '@/lib/utils.ts';

interface Props {
  onSave: (fieldFormData: Pick<FieldProperties, 'name' | 'crop'>) => void;
  onCancel: () => void;
}

const initFormData: Pick<FieldProperties, 'name' | 'crop'> = { name: '', crop: '' };

const CreateFieldForm = ({ onSave, onCancel }: Props) => {
  const [fieldFormData, setFieldFormData] = useState(initFormData);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = useEffectEvent(() => {
    inputRef.current?.select();
  });

  useEffect(() => {
    focusInput();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = (e: MouseEvent) => {
    stopAndPrevent(e);
    onCancel();
  };

  const handleSave = (e: MouseEvent) => {
    stopAndPrevent(e);
    onSave(fieldFormData);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Field>
        <FieldLabel htmlFor="input-field-name">Name</FieldLabel>
        <Input
          ref={inputRef}
          id="input-field-name"
          name="name"
          type="text"
          placeholder="Enter field name"
          required
          minLength={1}
          value={fieldFormData.name}
          onChange={handleChange}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-field-crop">Crop</FieldLabel>
        <Input
          id="input-field-crop"
          name="crop"
          type="text"
          placeholder="Enter field crop"
          value={fieldFormData.crop}
          onChange={handleChange}
        />
      </Field>
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleSave}
          disabled={!fieldFormData.name}
          aria-disabled={!fieldFormData.name}
        >
          Save
        </Button>
        <Button onClick={handleCancel} variant="ghost">Cancel</Button>
      </div>
    </div>
  );
};

export default memo(CreateFieldForm);
