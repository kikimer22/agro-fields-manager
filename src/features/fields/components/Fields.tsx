import { Polygon, Tooltip } from 'react-leaflet';
import { POLYGON_BASE_OPTIONS, POLYGON_HIGHLIGHT_OPTIONS } from '@/shared/constants';
import { transformPositionsToLatLngExpression, generateFieldColor, stopAndPrevent } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks/useRdxStore';
import useFields from '@/features/fields/hooks/useFields';

const Fields = () => {
  const features = useAppSelector((s) => s.fieldsSlice.fieldsCollection.features);
  const selectedFieldId = useAppSelector((s) => s.fieldsSlice.selectedFieldId);
  const isSelectingFieldFlow = useAppSelector((s) => s.sharedSlice.isSelectingFieldFlow);

  const { selectAndCenter } = useFields();

  return features.map((f) => (
    <Polygon
      key={`${isSelectingFieldFlow}-${f.properties.id}`} // adding isSelectingFieldFlow to key to force remount on flow change
      positions={transformPositionsToLatLngExpression(f.geometry.coordinates[0])}
      pathOptions={{
        fillColor: generateFieldColor(f.properties.area),
        ...(selectedFieldId && selectedFieldId === f.properties.id ? POLYGON_HIGHLIGHT_OPTIONS : POLYGON_BASE_OPTIONS),
      }}
      interactive={isSelectingFieldFlow}
      eventHandlers={{
        click: (e) => {
          console.log('select');
          if (!isSelectingFieldFlow) return;
          stopAndPrevent(e);
          selectAndCenter(f);
        },
      }}
    >
      <Tooltip sticky interactive={false}>
        <ul>
          <li>{f.properties.name}</li>
          <li>Площа: {f.properties.area.toFixed(4)} га</li>
          {f.properties.crop && <li>Культура: {f.properties.crop}</li>}
        </ul>
      </Tooltip>
    </Polygon>
  ));
};

export default Fields;
