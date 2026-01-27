import { memo, useCallback, useState } from 'react';
import type { FieldProperties } from '@/shared/types';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';

interface Props {
  onSave: (fieldFormData: Pick<FieldProperties, 'name' | 'crop'>) => void;
  onCancel: () => void;
}

const initFormData = { name: '', crop: '' };

const CreateFieldForm = ({ onSave, onCancel }: Props) => {
  const [fieldFormData, setFieldFormData] = useState<Pick<FieldProperties, 'name' | 'crop'>>(initFormData);

  const handleSave = useCallback(() => {
    onSave(fieldFormData);
  }, [onSave, fieldFormData]);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Field>
        <FieldLabel htmlFor="input-field-name">Name</FieldLabel>
        <Input
          id="input-field-name"
          name="name"
          type="text"
          placeholder="Enter field name"
          required
          minLength={1}
          value={fieldFormData.name}
          onChange={e => setFieldFormData({ ...fieldFormData, [e.target.name]: e.target.value })}
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
          onChange={e => setFieldFormData({ ...fieldFormData, [e.target.name]: e.target.value })}
        />
      </Field>
      <div className="flex justify-end gap-2">
        <Button onClick={onCancel} variant={'ghost'}>Cancel</Button>
        <Button onClick={handleSave} disabled={!fieldFormData.name}>Save</Button>
      </div>
    </div>
  );
};

export default memo(CreateFieldForm);
