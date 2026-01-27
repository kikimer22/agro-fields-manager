import { useCallback } from 'react';
import { Polyline } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { addPoint } from '@/features/createField/slice/fieldSlice';
import { transformPositionsToLatLngExpression } from '@/lib/utils';
import ClickHandler from '@/shared/components/ClickHandler';
import FieldLayer from '@/features/createField/components/FieldLayer';
import PointsLayer from '@/features/createField/components/PointsLayer';
import type { LeafletMouseEvent } from 'leaflet';

export default function FieldCreator() {
  const dispatch = useAppDispatch();
  const vertices = useAppSelector((state) => state.fieldSlice.feature.geometry.coordinates[0]);
  const isCreatingFieldFlow = useAppSelector((state) => state.sharedSlice.isCreatingFieldFlow);
  const isShowingField = useAppSelector((state) => state.fieldSlice.isShowingField);
  const isAddingPointsMode = useAppSelector((state) => state.fieldSlice.isAddingPointsMode);

  const handleMapClick = useCallback(({ latlng: { lat, lng } }: LeafletMouseEvent) => {
    if (!isCreatingFieldFlow || !isAddingPointsMode) return;
    dispatch(addPoint([lng, lat]));
  }, [dispatch, isCreatingFieldFlow, isAddingPointsMode]);

  return (
    <>
      {isCreatingFieldFlow && <ClickHandler onMapClick={handleMapClick}/>}

      <PointsLayer/>

      {vertices.length > 1 && !isShowingField && (
        <Polyline positions={transformPositionsToLatLngExpression(vertices)} color="red" interactive={false}/>
      )}

      {isShowingField && <FieldLayer/>}
    </>
  );
}
