import { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { Button } from '@/shared/components/ui/button';
import { removePoint } from '@/features/points/slice/pointsSlice';

const PointsList = () => {
  const dispatch = useAppDispatch();
  const pointsCollection = useAppSelector((s) => s.pointsSlice.pointsCollection);
  const filteredPointsCollection = useAppSelector((s) => s.pointsSlice.filteredPointsCollection);
  const selectedField = useAppSelector((s) => s.sharedSlice.selectedField);

  const handleRemove = useCallback(
    (pointId: string) => {
      if (!selectedField) return;
      dispatch(removePoint({ fieldId: selectedField.properties.id, pointId }));
    },
    [dispatch, selectedField]
  );

  const renderedPoints = useMemo(() => {
    return Object.entries(filteredPointsCollection).map(([fieldId, list]) => (
      <div
        key={fieldId}
        className="flex flex-col justify-center items-center gap-4 w-full"
      >
        {list.map((point) => (
          <div
            key={point.id}
            className="flex flex-col justify-center items-start gap-2 pb-4 w-full"
          >
            <h3 className="font-bold">{point.type}</h3>
            <p>Lat: {point.lat.toFixed(4)}</p>
            <p>Lng: {point.lng.toFixed(4)}</p>
            <p>MGRS: {point.mgrs}</p>
            {point.description && (
              <p className="mt-2">Description: {point.description}</p>
            )}
            <Button
              variant="destructive"
              onClick={() => handleRemove(point.id)}
              className="w-full"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    ));
  }, [filteredPointsCollection, handleRemove]);

  if (Object.values(pointsCollection).flat().length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <p>No points...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      {Object.keys(filteredPointsCollection).flat().length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <p>No points with this filters configuration...</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 w-full [&>*:not(:last-child)]:border-b">
          {renderedPoints}
        </div>
      )}
    </div>
  );
};

export default PointsList;
