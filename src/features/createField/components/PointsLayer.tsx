import { CircleMarker } from 'react-leaflet';
import { useAppSelector } from '@/store/hooks/useRdxStore';
import { MARKER_SIZE } from '@/shared/constants';

const PointsLayer = () => {
  const vertices = useAppSelector((state) => state.fieldSlice.feature.geometry.coordinates[0]);
  const isAddingPointsMode = useAppSelector((state) => state.fieldSlice.isAddingPointsMode);

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
