import { memo, useCallback, useMemo, type MouseEvent } from 'react';
import { type Icon, icon } from 'leaflet';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import type { Point } from '@/features/points/types';
import { useAppDispatch } from '@/store/hooks/useRdxStore';
import { removePoint } from '@/features/points/slice/pointsSlice';
import { stopAndPrevent } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button.tsx';

const iconCache = new Map<string, Icon>();

function getIcon(filename: string) {
  if (iconCache.has(filename)) return iconCache.get(filename)!;
  const i = icon({
    iconUrl: `/icons/${filename}`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
  iconCache.set(filename, i);
  return i;
}

const Text = memo(({ point }: { point: Point }) => {
  return (
    <div>
      <p className="font-semibold">{point.type}</p>
      <p>Lat: {point.lat.toFixed(4)}</p>
      <p>Lng: {point.lng.toFixed(4)}</p>
      <p>MGRS: {point.mgrs}</p>
      {point.description && <p className="mt-2">{point.description}</p>}
      <p className="mt-2 text-xs text-gray-500">{new Date(point.date).toLocaleString()}</p>
    </div>
  );
});

const PointMarker = ({ point }: { point: Point }) => {
  const dispatch = useAppDispatch();

  const icon = useMemo(() => getIcon(point.icon), [point.icon]);

  const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    stopAndPrevent(e);
    dispatch(removePoint(point.id));
  }, [dispatch, point.id]);

  return (
    <Marker position={[point.lat, point.lng]} icon={icon}>
      <Tooltip interactive={false}>
        <Text point={point}/>
      </Tooltip>
      <Popup>
        <div className="w-64">
          <Text point={point}/>
          <div className="mt-2 flex justify-end">
            <Button onClick={handleDelete} variant="destructive">Delete</Button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default memo(PointMarker);
