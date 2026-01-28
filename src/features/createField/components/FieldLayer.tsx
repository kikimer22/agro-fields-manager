import { useCallback, useEffect, useRef } from 'react';
import { area as calcArea, polygon as createPolygon } from '@turf/turf';
import type { Polygon as LeafletPolygon } from 'leaflet';
import { Popup, useMap } from 'react-leaflet';
import { Polygon as ViewPolygon } from 'react-leaflet/Polygon';
import type { FieldProperties } from '@/shared/types';
import { ensureClosedPolygon, transformPositionsToLatLngExpression } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { saveFieldAction } from '@/store/actions/saveFieldAction';
import { generateField, setConfirmCreation } from '@/features/createField/slice/fieldSlice';
import CreateFieldForm from '@/features/createField/components/CreateFieldForm';

const FieldLayer = () => {
  const dispatch = useAppDispatch();
  const vertices = useAppSelector((state) => state.fieldSlice.feature.geometry.coordinates[0]);
  const isConfirmCreation = useAppSelector((state) => state.fieldSlice.isConfirmCreation);
  const isShowingField = useAppSelector((state) => state.fieldSlice.isShowingField);

  const polygonRef = useRef<LeafletPolygon>(null);

  const map = useMap();

  useEffect(() => {
    if (isConfirmCreation && polygonRef.current) {
      polygonRef.current.openPopup();
    }
  }, [isConfirmCreation]);

  const addField = useCallback(({ name, crop }: Pick<FieldProperties, 'name' | 'crop'>) => {
    if (!isShowingField) return;
    const turfPolygon = createPolygon([ensureClosedPolygon(vertices)]);
    const areaInSqMeters = calcArea(turfPolygon);
    const areaInHectares = (areaInSqMeters / 10000); // calc area move to Web Workers
    dispatch(generateField({ name, area: areaInHectares, crop }));
    dispatch(saveFieldAction());
    map.closePopup();
  }, [dispatch, vertices, isShowingField, map]);

  const onCancel = useCallback(() => {
    dispatch(setConfirmCreation(false));
    map.closePopup();
  }, [dispatch, map]);

  return (
    <ViewPolygon positions={transformPositionsToLatLngExpression(vertices)}
      // interactive={isConfirmCreation}
                 ref={polygonRef}
                 color="green"
    >
      <Popup>
        <CreateFieldForm onSave={addField} onCancel={onCancel}/>
      </Popup>
    </ViewPolygon>
  );
};

export default FieldLayer;
