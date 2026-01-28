import { memo, useCallback, useState, type MouseEvent, useRef, useEffect } from 'react';
import { stopAndPrevent } from '@/lib/utils';
import { POINT_TYPE_SELECTOR } from '@/shared/constants';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { NativeSelect, NativeSelectOption } from '@/shared/components/ui/native-select';
import { Textarea } from '@/shared/components/ui/textarea';
import type { Point } from '@/features/points/types';

interface Props {
  onSave: (data: Pick<Point, 'type' | 'description'>) => void;
  onCancel: () => void;
}

const initFormData = { type: POINT_TYPE_SELECTOR[0].value, description: '' };

const PointsForm = ({ onSave, onCancel }: Props) => {
  const [fieldFormData, setFieldFormData] = useState<Pick<Point, 'type' | 'description'>>(initFormData);

  const inputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSave = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    stopAndPrevent(e);
    onSave(fieldFormData);
  }, [onSave, fieldFormData]);

  const handleCancel = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    stopAndPrevent(e);
    onCancel();
  }, [onCancel]);

  return (
    <div className="relative z-10 flex flex-col justify-center items-center gap-2">
      <Field>
        <FieldLabel htmlFor="input-field-type">Type</FieldLabel>
        <NativeSelect
          ref={inputRef}
          id="input-field-type"
          name="type"
          required
          value={fieldFormData.type}
          onChange={(e) =>
            setFieldFormData({ ...fieldFormData, type: e.target.value })
          }
        >
          {POINT_TYPE_SELECTOR.map((item) => (
            <NativeSelectOption key={item.value} value={item.value}>
              {item.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>
      <Field>
        <FieldLabel htmlFor="textarea-message-description">Description</FieldLabel>
        <Textarea
          id="textarea-message-description"
          name="description"
          placeholder="Type description here."
          value={fieldFormData.description}
          onChange={e => setFieldFormData({ ...fieldFormData, [e.target.name]: e.target.value })}
        />
      </Field>
      <div className="flex justify-end gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel} variant="ghost">Cancel</Button>
      </div>
    </div>
  );
};

export default memo(PointsForm);
