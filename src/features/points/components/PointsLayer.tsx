import { useAppSelector } from '@/store/hooks/useRdxStore';
import PointMarker from '@/features/points/components/PointMarker';

const PointsLayer = () => {
  const points = useAppSelector((s) => s.pointsSlice.selectedPoints);

  return points.map((p) => <PointMarker key={p.id} point={p}/>);
};

export default PointsLayer;
