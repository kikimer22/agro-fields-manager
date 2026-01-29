import { useMemo, Fragment } from 'react';
import { useAppSelector } from '@/store/hooks/useRdxStore';
import PointMarker from '@/features/points/components/PointMarker';

const PointsLayer = () => {
  const pointsCollection = useAppSelector((s) => s.pointsSlice.filteredPointsCollection);

  const markers = useMemo(() => {
    // return Object.values(pointsCollection).flatMap((list) => list.map((p) => <PointMarker key={p.id} point={p} />));
    return Object.entries(pointsCollection).map(([fieldId, list]) => (
      <Fragment key={fieldId}>
        {list.map((p) => (
          <PointMarker key={`${fieldId}-${p.id}`} point={p}/>
        ))}
      </Fragment>
    ));
  }, [pointsCollection]);

  return <>{markers}</>;
};

export default PointsLayer;
