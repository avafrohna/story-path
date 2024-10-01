import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProject, getLocations, deleteLocation } from '../api';
import Footer from './footer';
import Header from './header';
import QRGenerator from './qr-generator';

function LocationList() {
  const { projectId } = useParams();
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [project, setProject] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  const [modalLocations, setModalLocations] = useState(null);
  const [modalLocation, setModalLocation] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const projectData = await getProject(projectId);
        setProject(projectData[0]);
        const locationsData = await getLocations();
        setLocations(locationsData);
      }
      catch (err) {
        setError(`Error fetching locations: ${err.message}`);
      }
    };

    fetchLocations();
  }, []);

  const deleteLocations = async (locationId) => {
    try {
      await deleteLocation(locationId);
      setLocations(locations.filter((location) => location.id !== locationId));
    } 
    catch (err) {
      setError(`Error deleting location: ${err.message}`);
    }
  };

  const createQRcode = (location) => {
    const locationUrl = `${window.location.origin}/location/${location.id}`;
    setQRCodeUrl(locationUrl);
    setModalLocation(location);
    setModalLocations(null);
    setShowModal(true);
  };

  const printAllQRcodes = () => {
    const projectLocations = locations.filter((location) => String(location.project_id) === String(projectId));
    setModalLocations(projectLocations);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div id="root">
      <Header />

      <div className="container-custom mt-3">
        <h1>
          {project.title} - Locations
          <Link to={`/preview/${projectId}`}>
            <button className="btn btn-success ms-4">Preview</button>
          </Link>
          <button className="btn btn-success ms-4" onClick={printAllQRcodes}>
            Print All QR Codes
          </button>
        </h1>

        <div className="mt-4">
          <Link to={`/add-location/${projectId}`}>
            <button className="btn btn-primary">Add Location</button>
          </Link>
        </div>

        {error && <p className="text-danger">{error}</p>}

        {locations.length === 0 ? ( 
          <p>No locations have been added.</p>
        ) : (
          locations.filter((location) => String(location.project_id) === String(projectId)).length === 0 ? (
            <p>No locations available for this project.</p>
          ) : (
            <table className="table table-striped mt-4">
              <tbody>
                {locations
                  .filter((location) => String(location.project_id) === String(projectId))
                  .map((location) => (
                    <tr key={location.id}>
                      <td>
                        <div className="fw-bold fs-5">{location.location_name}</div>
                        <div>Trigger: {location.location_trigger}</div>
                        <div>Position: {location.location_position}</div>
                        <div>Score: {location.score_points}</div>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => createQRcode(location)}
                        >
                          Print QR Code
                        </button>
                        <Link to={`/edit-location/${location.project_id}/${location.id}`}>
                          <button className="btn btn-secondary me-2">Edit</button>
                        </Link>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => deleteLocations(location.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>

      <Footer />

      <QRGenerator
        show={showModal}
        onClose={closeModal}
        locationUrl={qrCodeUrl}
        location={modalLocation}
        locations={modalLocations}
      />
    </div>
  );
}

export default LocationList;
