import type { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useAppSelector } from '@/store/hooks/useRdxStore';
import { useMapContext } from '@/context/MapContext';
import { MapProvider } from '@/context/MapProvider';
import ControlPanel from '@/widgets/ControlPanel';
import FieldCreator from '@/features/createField/components/FieldCreator';
import Fields from '@/features/fields/components/Fields';
import PointsCreator from '@/features/points/components/PointsCreator';
import PointsLayer from '@/features/points/components/PointsLayer';

const lat = 50.4501;
const lng = 30.53;
const center: LatLngExpression = [lat, lng];
const zoom = 13;

const MapInner = () => {
  const { setMap } = useMapContext();

  const isCreatingFieldFlow = useAppSelector((state) => state.sharedSlice.isCreatingFieldFlow);
  const isAddingPointsFlow = useAppSelector((state) => state.sharedSlice.isAddingPointsFlow);
  const isConfirmCreation = useAppSelector((state) => state.fieldSlice.isConfirmCreation);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      ref={setMap}
      className="w-full h-dvh"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {(isCreatingFieldFlow || isConfirmCreation) && <FieldCreator/>}

      <Fields/>

      <PointsLayer/>

      {isAddingPointsFlow && <PointsCreator/>}

    </MapContainer>
  );
};

const Map = () => {
  return (
    <MapProvider>
      <div className="flex items-center justify-center w-full h-dvh">
        <MapInner/>
        <ControlPanel/>
      </div>
    </MapProvider>
  );
};

export default Map;
