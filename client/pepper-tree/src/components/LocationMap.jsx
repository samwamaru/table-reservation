import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = () => {
  return (
    <div className="w-full h-80 mb-4">
      <MapContainer
        center={[-1.266095, 36.802112]}
        zoom={18}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[-1.266095, 36.802112]} />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
