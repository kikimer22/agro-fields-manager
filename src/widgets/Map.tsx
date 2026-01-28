import { MapContainer, TileLayer } from 'react-leaflet';
import { useAppSelector } from '@/store/hooks/useRdxStore';
import { useMapContext } from '@/shared/context/MapContext';
import FieldCreator from '@/features/createField/components/FieldCreator';
import Fields from '@/features/fields/components/Fields';
import PointsCreator from '@/features/points/components/PointsCreator';
import PointsLayer from '@/features/points/components/PointsLayer';
import { INIT_MAP_CENTER, INIT_MAP_ZOOM } from '@/shared/constants.ts';

const Map = () => {
  const { setMap } = useMapContext();

  const isCreatingFieldFlow = useAppSelector((state) => state.sharedSlice.isCreatingFieldFlow);
  const isAddingPointsFlow = useAppSelector((state) => state.sharedSlice.isAddingPointsFlow);
  const isConfirmCreation = useAppSelector((state) => state.fieldSlice.isConfirmCreation);

  return (
    <MapContainer
      center={INIT_MAP_CENTER}
      zoom={INIT_MAP_ZOOM}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      ref={setMap}
      className="w-full flex-1"
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

export default Map;
