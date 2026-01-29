import { useMemo } from 'react';
import { CircleMarker } from 'react-leaflet';
import { useAppSelector } from '@/store/hooks/useRdxStore';
import { MARKER_SIZE } from '@/shared/constants';

const PointsLayer = () => {
  const feature = useAppSelector((s) => s.fieldSlice.feature);
  const isAddingPointsMode = useAppSelector((s) => s.fieldSlice.isAddingPointsMode);

  const vertices = useMemo(() => feature.geometry.coordinates[0], [feature]);

  return vertices.map(([lng, lat], idx) => (
    <CircleMarker
      key={`${isAddingPointsMode}-${lng}-${lat}-${idx}`} // adding isAddingPointsMode to key to force remount on mode change
      center={[lat, lng]}
      radius={MARKER_SIZE}
      fill={true}
      fillOpacity={1}
      color={isAddingPointsMode ? 'green' : 'red'}
      interactive={!isAddingPointsMode}
    />
  ));
};

export default PointsLayer;
