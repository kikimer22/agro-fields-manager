import { useCallback, useMemo } from 'react';
import { latLng, type LeafletMouseEvent } from 'leaflet';
import { Polyline, useMap } from 'react-leaflet';
import { transformPositionsToLatLngExpression } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { addPoint, removePoint } from '@/features/createField/slice/fieldSlice';
import ClickHandler from '@/shared/components/ClickHandler';
import FieldLayer from '@/features/createField/components/FieldLayer';
import PointsLayer from '@/features/createField/components/PointsLayer';
import { MARKER_SIZE, MIN_VERTICES_LENGTH_FOR_POLYGON } from '@/shared/constants.ts';

const FieldCreator = () => {
  const dispatch = useAppDispatch();
  const isCreatingFieldFlow = useAppSelector((s) => s.sharedSlice.isCreatingFieldFlow);
  const feature = useAppSelector((s) => s.fieldSlice.feature);
  const isAddingPointsMode = useAppSelector((s) => s.fieldSlice.isAddingPointsMode);
  const isConfirm = useAppSelector((s) => s.fieldSlice.isConfirm);

  const vertices = useMemo(() => feature.geometry.coordinates[0], [feature]);
  const isShowingField = useMemo(() => vertices.length >= MIN_VERTICES_LENGTH_FOR_POLYGON, [vertices]);
  const isShowingLine = useMemo(() => vertices.length > 1 && vertices.length < MIN_VERTICES_LENGTH_FOR_POLYGON, [vertices]);

  const map = useMap();

  const handleMapClick = useCallback(
    ({ latlng }: LeafletMouseEvent) => {
      if (!isCreatingFieldFlow) return;
      if (isConfirm) return;

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
    [dispatch, isCreatingFieldFlow, isAddingPointsMode, vertices, map, isConfirm]
  );

  return (
    <>
      {isCreatingFieldFlow && <ClickHandler onMapClick={handleMapClick}/>}

      <PointsLayer/>

      {isShowingLine && (
        <Polyline positions={transformPositionsToLatLngExpression(vertices)} color="green" interactive={false}/>
      )}

      {isShowingField && <FieldLayer/>}
    </>
  );
};

export default FieldCreator;
