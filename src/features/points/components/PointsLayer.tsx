import { memo, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks/useRdxStore';
import { shallowEqual } from 'react-redux';
import PointMarker from './PointMarker';

const PointsLayer = () => {
  const points = useAppSelector((s) => s.pointsSlice.points, shallowEqual);

  const list = useMemo(() => points.slice(), [points]);

  return (
    <>
      {list.map((p) => (
        <PointMarker key={p.id} point={p}/>
      ))}
    </>
  );
};

export default memo(PointsLayer);
