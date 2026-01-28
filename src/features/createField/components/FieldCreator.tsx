import { useCallback } from 'react';
import { latLng, type LeafletMouseEvent } from 'leaflet';
import { Polyline, useMap } from 'react-leaflet';
import { transformPositionsToLatLngExpression } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { addPoint, removePoint } from '@/features/createField/slice/fieldSlice';
import ClickHandler from '@/shared/components/ClickHandler';
import FieldLayer from '@/features/createField/components/FieldLayer';
import PointsLayer from '@/features/createField/components/PointsLayer';
import { MARKER_SIZE } from '@/shared/constants.ts';

const FieldCreator = () => {
  const dispatch = useAppDispatch();
  const vertices = useAppSelector((state) => state.fieldSlice.feature.geometry.coordinates[0]);
  const isCreatingFieldFlow = useAppSelector((state) => state.sharedSlice.isCreatingFieldFlow);
  const isShowingField = useAppSelector((state) => state.fieldSlice.isShowingField);
  const isAddingPointsMode = useAppSelector((state) => state.fieldSlice.isAddingPointsMode);
  const isConfirmCreation = useAppSelector((state) => state.fieldSlice.isConfirmCreation);

  const map = useMap();

  const handleMapClick = useCallback(
    ({ latlng }: LeafletMouseEvent) => {
      if (!isCreatingFieldFlow) return;
      if (isConfirmCreation) return;

      const { lat, lng } = latlng;

      if (isAddingPointsMode) {
        if (vertices.some((p) => p[0] === lng && p[1] === lat)) return;
        dispatch(addPoint([lng, lat]));
      } else {
        const clickPoint = map.latLngToLayerPoint(latlng);

        for (const v of vertices) {
          const markerPoint = map.latLngToLayerPoint(latLng(v[1], v[0]));
          const distance = markerPoint.distanceTo(clickPoint);

          if (distance <= MARKER_SIZE) {
            dispatch(removePoint([v[0], v[1]]));
          }
        }
      }
    },
    [dispatch, isCreatingFieldFlow, isAddingPointsMode, vertices, map, isConfirmCreation]
  );

  return (
    <>
      {isCreatingFieldFlow && <ClickHandler onMapClick={handleMapClick} isSkip={true}/>}

      <PointsLayer/>

      {vertices.length > 1 && !isShowingField && (
        <Polyline positions={transformPositionsToLatLngExpression(vertices)} color="red" interactive={false}/>
      )}

      {isShowingField && <FieldLayer/>}
    </>
  );
};

export default FieldCreator;
