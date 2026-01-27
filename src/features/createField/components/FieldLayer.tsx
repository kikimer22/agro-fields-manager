import { memo, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { Polygon as ViewPolygon } from 'react-leaflet/Polygon';
import { ensureClosedPolygon, transformPositionsToLatLngExpression } from '@/lib/utils';
import { Popup } from 'react-leaflet';
import CreateFieldForm from '@/features/createField/components/CreateFieldForm';
import type { Polygon as LeafletPolygon } from 'leaflet';
import type { FieldProperties } from '@/shared/types';
import { area, polygon } from '@turf/turf';
import { generateField, reset as resetField } from '@/features/createField/slice/fieldSlice';
import { saveFieldAction } from '@/store/actions/saveFieldAction.ts';
import { reset as resetFlow } from '@/store/slices/sharedSlice';

const FieldLayer = () => {
  const dispatch = useAppDispatch();
  const vertices = useAppSelector(
    (state) => state.fieldSlice.feature.geometry.coordinates[0]
  );
  const isConfirmCreation = useAppSelector((state) => state.fieldSlice.isConfirmCreation);
  const isShowingField = useAppSelector((state) => state.fieldSlice.isShowingField);

  const polygonRef = useRef<LeafletPolygon>(null);

  useEffect(() => {
    if (isConfirmCreation && polygonRef.current) {
      polygonRef.current.openPopup();
    }
  }, [isConfirmCreation]);

  const addField = ({ name, crop }: Pick<FieldProperties, 'name' | 'crop'>) => {
    if (!isShowingField) return;
    const turfPolygon = polygon([ensureClosedPolygon(vertices)]);
    const areaInSqMeters = area(turfPolygon);
    const areaInHectares = (areaInSqMeters / 10000); // calc area move to Web Workers
    console.log('Area in hectares:', areaInHectares);
    dispatch(generateField({ name, area: areaInHectares, crop }));
    dispatch(saveFieldAction());
  };

  const onCancel = () => {
    dispatch(resetField());
    dispatch(resetFlow());
  };

  return (
    <ViewPolygon positions={transformPositionsToLatLngExpression(vertices)} color="green" ref={polygonRef}>
      <Popup interactive={true}>
        <CreateFieldForm onSave={addField} onCancel={onCancel}/>
      </Popup>
    </ViewPolygon>
  );
};

export default memo(FieldLayer);
