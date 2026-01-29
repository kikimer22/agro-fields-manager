import { useCallback, useEffect, useMemo, useRef } from 'react';
import { area as calcArea, polygon as createPolygon } from '@turf/turf';
import type { Polygon as LeafletPolygon } from 'leaflet';
import { Popup } from 'react-leaflet';
import { Polygon } from 'react-leaflet/Polygon';
import type { FieldProperties } from '@/shared/types';
import { ensureClosedPolygon, transformPositionsToLatLngExpression } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { saveFieldAction } from '@/store/actions/saveFieldAction';
import { setConfirm } from '@/features/createField/slice/fieldSlice';
import CreateFieldForm from '@/features/createField/components/CreateFieldForm';
import { MIN_VERTICES_LENGTH_FOR_POLYGON } from '@/shared/constants';

const FieldLayer = () => {
  const dispatch = useAppDispatch();
  const feature = useAppSelector((s) => s.fieldSlice.feature);
  const isConfirm = useAppSelector((s) => s.fieldSlice.isConfirm);
  const isSaving = useAppSelector((s) => s.fieldSlice.isSaving);

  const vertices = useMemo(() => feature.geometry.coordinates[0], [feature]);
  const isShowingField = useMemo(() => vertices.length >= MIN_VERTICES_LENGTH_FOR_POLYGON, [vertices]);

  const polygonRef = useRef<LeafletPolygon>(null);

  useEffect(() => {
    if (isConfirm && polygonRef.current) {
      polygonRef.current.openPopup();
    }
  }, [isConfirm]);

  const handleClickOnPolygon = useCallback(() => {
    dispatch(setConfirm(true));
  }, [dispatch]);

  const handlePopupCloseOnPolygon = useCallback(() => {
    dispatch(setConfirm(false));
  }, [dispatch]);

  const onCancel = useCallback(() => {
    polygonRef?.current?.openPopup();
  }, []);

  const onSave = useCallback(({ name, crop }: Pick<FieldProperties, 'name' | 'crop'>) => {
    if (!isShowingField) return;
    const turfPolygon = createPolygon([ensureClosedPolygon(vertices)]);
    const areaInSqMeters = calcArea(turfPolygon);
    const areaInHectares = (areaInSqMeters / 10000); // calc area move to Web Workers
    dispatch(saveFieldAction({ name, area: areaInHectares, crop }));
    onCancel();
  }, [dispatch, isShowingField, vertices, onCancel]);

  return (
    <Polygon positions={transformPositionsToLatLngExpression(vertices)}
             ref={polygonRef}
             color="green"
             eventHandlers={{
               click: handleClickOnPolygon,
               popupclose: handlePopupCloseOnPolygon,
             }}
    >
      <Popup>
        <CreateFieldForm onSave={onSave} isSaveDisabled={isSaving} onCancel={onCancel}/>
      </Popup>
    </Polygon>
  );
};

export default FieldLayer;
