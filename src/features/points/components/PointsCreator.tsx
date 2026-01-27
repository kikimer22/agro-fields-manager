import { memo, useCallback, useState } from 'react';
import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { addPoint } from '@/features/points/slice/pointsSlice';
import { convertToMGRS } from '@/lib/utils';
import type { LeafletMouseEvent } from 'leaflet';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import type { Feature, Point as GeoJSONPoint, Polygon } from 'geojson';
import { nanoid } from 'nanoid';
import PointsForm from '@/features/points/components/PointsForm';
import type { Point } from '@/features/points/types';
import ClickHandler from '@/shared/components/ClickHandler';
import type { DraftPoint } from '@/features/points/types';
import { ICON_MAP, POINT_SELECTOR_ICONS } from '@/shared/constants';

const PointsCreator = () => {
  const dispatch = useAppDispatch();
  const isAddingPointsFlow = useAppSelector((s) => s.sharedSlice.isAddingPointsFlow);
  const selectedField = useAppSelector((s) => s.sharedSlice.selectedField);

  const [draftPoint, setDraftPoint] = useState<DraftPoint | null>(null);

  const handleMapClick = useCallback(({ latlng: { lat, lng } }: LeafletMouseEvent) => {
      if (!isAddingPointsFlow || !selectedField) return;

      const pt: Feature<GeoJSONPoint> = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        properties: {},
      };

      const inside = booleanPointInPolygon(pt, selectedField as Feature<Polygon>);
      if (!inside) return;

      setDraftPoint({ lat, lng });
    },
    [isAddingPointsFlow, selectedField]
  );

  const handleCancel = useCallback(() => {
    setDraftPoint(null);
  }, []);

  const handleSave = useCallback(({ type, description }: Pick<Point, 'type' | 'description'>) => {
      if (!draftPoint) return;
      const id = nanoid();
      const { lat, lng } = draftPoint;
      const mgrs = convertToMGRS(lat, lng);
      const time = new Date().toISOString();
      const icon = ICON_MAP[type] || POINT_SELECTOR_ICONS[0];

      dispatch(
        addPoint({ id, mgrs, lng, lat, type, description, time, icon })
      );

      setDraftPoint(null);
    },
    [dispatch, draftPoint]
  );

  return (
    <>
      <ClickHandler onMapClick={handleMapClick}/>

      {draftPoint && (
        <>
          <CircleMarker
            center={[draftPoint.lat, draftPoint.lng]}
            radius={8}
            fill={true}
            opacity={1}
            fillOpacity={1}
            color={'red'}
          >
            <Tooltip>
              <p>Lat: {draftPoint.lat.toFixed(4)}</p>
              <p>Lng: {draftPoint.lng.toFixed(4)}</p>
            </Tooltip>
            <Popup position={[draftPoint.lat, draftPoint.lng]}>
              <PointsForm
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </Popup>
          </CircleMarker>
        </>
      )}
    </>
  );
};

export default memo(PointsCreator);
