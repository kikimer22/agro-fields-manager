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
  const vertices = useAppSelector(
    (state) => state.fieldSlice.feature.geometry.coordinates[0]
  );
  const isCreatingField = useAppSelector((state) => state.sharedSlice.isCreatingFieldFlow);
  const isAddingPoints = useAppSelector((state) => state.sharedSlice.isAddingPointsFlow);
  const isShowingField = useAppSelector((state) => state.fieldSlice.isShowingField);

  const handleMapClick = useCallback(({ latlng: { lat, lng } }: LeafletMouseEvent) => {
    if (!isCreatingField) return;
    if (!isAddingPoints) return;
    dispatch(addPoint([lng, lat]));
  }, [dispatch, isAddingPoints, isCreatingField]);

  return (
    <>
      {isCreatingField && <ClickHandler onMapClick={handleMapClick}/>}

      <PointsLayer/>

      {vertices.length > 1 && !isShowingField && (
        <Polyline positions={transformPositionsToLatLngExpression(vertices)} color="red"/>
      )}

      {isShowingField && <FieldLayer/>}
    </>
  );
}
