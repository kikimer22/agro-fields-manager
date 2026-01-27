import { Polygon, Tooltip } from 'react-leaflet';
import { POLYGON_BASE_OPTIONS, POLYGON_HIGHLIGHT_OPTIONS } from '@/shared/constants';
import { transformPositionsToLatLngExpression, generateFieldColor, stopAndPrevent } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks/useRdxStore';
import useFieldActions from '@/features/fields/hooks/useFields';

const Fields = () => {
  const features = useAppSelector((state) => state.fieldsSlice.fieldsCollection.features);
  const selectedFieldId = useAppSelector((state) => state.fieldsSlice.selectedFieldId);
  const isSelectingFieldFlow = useAppSelector((state) => state.sharedSlice.isSelectingFieldFlow);
  const { selectAndCenter } = useFieldActions();

  return features.map((f) => (
    <Polygon key={f.properties.id}
             positions={transformPositionsToLatLngExpression(f.geometry.coordinates[0])}
             pathOptions={{
               fillColor: generateFieldColor(f.properties.area),
               ...(selectedFieldId && selectedFieldId === f.properties.id ? POLYGON_HIGHLIGHT_OPTIONS : POLYGON_BASE_OPTIONS),
             }}
             eventHandlers={{
               click: (e) => {
                 if (!isSelectingFieldFlow) return;
                 stopAndPrevent(e);
                 selectAndCenter(f);
               },
             }}
    >
      <Tooltip sticky>
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
