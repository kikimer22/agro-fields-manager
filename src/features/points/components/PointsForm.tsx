import { memo, useCallback, useState, type MouseEvent } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/shared/components/ui/native-select';
import { Textarea } from '@/shared/components/ui/textarea';
import type { Point } from '@/features/points/types';
import { POINT_SELECTOR } from '@/shared/constants';
import { stopAndPrevent } from '@/lib/utils';

interface Props {
  onSave: (data: Pick<Point, 'type' | 'description'>) => void;
  onCancel: () => void;
}

const initFormData = { type: '', description: '' };

const PointsForm = ({ onSave, onCancel }: Props) => {
  const [fieldFormData, setFieldFormData] = useState<Pick<Point, 'type' | 'description'>>(initFormData);

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
        <FieldLabel htmlFor="textarea-message-description">Description</FieldLabel>
        <Textarea id="textarea-message-description"
                  name="description"
                  placeholder="Type description here."
                  value={fieldFormData.description}
                  onChange={e => setFieldFormData({ ...fieldFormData, [e.target.name]: e.target.value })}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-field-type">Type</FieldLabel>
        <NativeSelect
          id="input-field-type"
          name="type"
          value={fieldFormData.type}
          onChange={(e) =>
            setFieldFormData({ ...fieldFormData, type: e.target.value })
          }
        >
          {POINT_SELECTOR.map((item) => (
            <NativeSelectOption key={item.value} value={item.value}>
              {item.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>
      <div className="flex justify-end gap-2">
        <Button onClick={handleCancel} variant="ghost">Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default memo(PointsForm);
