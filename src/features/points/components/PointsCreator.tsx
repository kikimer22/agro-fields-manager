import { useCallback, useState } from 'react';
import type { LeafletMouseEvent } from 'leaflet';
import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import type { Feature, Point as GeoJSONPoint, Polygon } from 'geojson';
import { nanoid } from 'nanoid';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { convertToMGRS } from '@/lib/utils';
import { ICON_MAP, MARKER_SIZE, POINT_SELECTOR_ICONS } from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks/useRdxStore';
import { addPoint } from '@/features/points/slice/pointsSlice';
import type { Point, DraftPoint } from '@/features/points/types';
import ClickHandler from '@/shared/components/ClickHandler';
import PointsForm from '@/features/points/components/PointsForm';

const PointsCreator = () => {
  const dispatch = useAppDispatch();
  const isAddingPointsFlow = useAppSelector((s) => s.sharedSlice.isAddingPointsFlow);
  const selectedField = useAppSelector((s) => s.sharedSlice.selectedField);

  const [draftPoint, setDraftPoint] = useState<DraftPoint | null>(null);

  const handleMapClick = useCallback(({ latlng: { lat, lng } }: LeafletMouseEvent) => {
      if (!isAddingPointsFlow || !selectedField) return;
      if (draftPoint && draftPoint.lat === lat && draftPoint.lng === lng) return;

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
    [isAddingPointsFlow, selectedField, draftPoint]
  );

  const handleCancel = useCallback(() => {
    setDraftPoint(null);
  }, []);

  const handleSave = useCallback(({ type, description }: Pick<Point, 'type' | 'description'>) => {
      if (!draftPoint) return;
      if (!selectedField) return;
      const { lat, lng } = draftPoint;
      const point: Point = {
        id: nanoid(),
        lng,
        lat,
        mgrs: convertToMGRS(lat, lng),
        type,
        description,
        date: new Date().toISOString(),
        icon: ICON_MAP[type] || POINT_SELECTOR_ICONS[0],
      };
      dispatch(addPoint({ fieldId: selectedField.properties.id, point }));

      setDraftPoint(null);
    },
    [dispatch, draftPoint, selectedField]
  );

  return (
    <>
      {isAddingPointsFlow && (<ClickHandler onMapClick={handleMapClick}/>)}

      {draftPoint && (
        <>
          <CircleMarker
            center={[draftPoint.lat, draftPoint.lng]}
            radius={MARKER_SIZE}
            fill={true}
            opacity={1}
            fillOpacity={1}
            color={'red'}
          >
            <Tooltip interactive={false}>
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

export default PointsCreator;
