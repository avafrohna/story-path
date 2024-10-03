// imports components and resources
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PropTypes from 'prop-types';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

/**
 * This component is the map which is my advanced feature
 * Renders a map using React Leaflet
 * It displays location markers based on the given location data
 * Features:
 * - Validates and parses location positions.
 * - Calculates the center of the map based on the average coordinates of the provided locations.
 * - Displays markers for valid locations, with a popup showing the location name.
 * @param {Object[]} locations - array of location objects
 * @returns {JSX.Element}
 */
const MapView = ({ locations }) => {
  /**
   * Parses a location's position into an array of numbers [lat, lng].
   * @param {string} positionString - The string containing the latitude and longitude.
   * @returns {number[] | null} An array [lat, lng]
   */
  const parsePosition = (positionString) => {
    const cleanedPosition = positionString.replace(/[()]/g, '').trim();
    const positionArray = cleanedPosition.split(',').map(Number);
    if (positionArray.length === 2 && !isNaN(positionArray[0]) && !isNaN(positionArray[1])) {
      return positionArray;
    }
    return null;
  };

  /**
   * Calculates the center of the map based on the average of valid location coordinates.
   * @returns {number[]} Array [lat, lng] of map center
   */
  const calculateMapCenter = () => {
    if (locations.length === 0) return [-25.20, 130.20];

    const validPositions = locations
      .map(location => parsePosition(location.location_position))
      .filter(position => position !== null);

    if (validPositions.length === 0) return [-25.20, 130.20];

    const avgLat = validPositions.reduce((sum, pos) => sum + pos[0], 0) / validPositions.length;
    const avgLng = validPositions.reduce((sum, pos) => sum + pos[1], 0) / validPositions.length;

    return [avgLat, avgLng];
  };

  const mapCenter = calculateMapCenter();

  return (
    <MapContainer center={mapCenter} zoom={3} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* iterate over locations and render markers for valid positions */}
      {locations.map((location, index) => {
        const position = parsePosition(location.location_position);
        if (position) {
          return (
            <Marker key={index} position={position}>
              <Popup>{location.location_name}</Popup>
            </Marker>
          );
        } 
        else {
          console.warn(`Invalid location position for ${location.location_name}: ${location.location_position}`);
          return null;
        }
      })}
    </MapContainer>
  );
};

MapView.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      location_name: PropTypes.string.isRequired,
      location_position: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MapView;
