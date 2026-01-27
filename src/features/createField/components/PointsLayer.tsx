import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { CircleMarker } from 'react-leaflet';
import { stopAndPrevent } from '@/lib/utils';
import { removePoint } from '@/features/createField/slice/fieldSlice';

const PointsLayer = () => {
  const dispatch = useAppDispatch();
  const vertices = useAppSelector(
    (state) => state.fieldSlice.feature.geometry.coordinates[0]
  );
  const isCreatingField = useAppSelector((state) => state.sharedSlice.isCreatingFieldFlow);
  const isAddingPointsMode = useAppSelector((state) => state.fieldSlice.isAddingPointsMode);

  return (
    <>
      {vertices.map(([lng, lat], idx) => (
        <CircleMarker
          key={`${lng}-${lat}-${idx}`}
          center={[lat, lng]}
          radius={8}
          fill={true}
          opacity={1}
          fillOpacity={1}
          color={idx === 0 ? 'red' : 'green'}
          eventHandlers={{
            click: (e) => {
              stopAndPrevent(e);
              if (!isCreatingField || isAddingPointsMode) return;
              dispatch(removePoint([lng, lat]));
            },
          }}
        />
      ))}
    </>
  );
};

export default memo(PointsLayer);
