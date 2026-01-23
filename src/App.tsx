import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const position: LatLngExpression = [51.505, -0.09];

  return (
    <div className="flex items-center justify-center w-full h-dvh">
      <MapContainer center={position} zoom={16} scrollWheelZoom={false} className="w-full h-dvh">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <p className="text-amber-400">A pretty CSS3 popup. <br/> Easily customizable.</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
