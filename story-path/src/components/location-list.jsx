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
  const [title, setTitle] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  const [modalLocations, setModalLocations] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const projectData = await getProject(projectId);
        setTitle(projectData[0].title);
        const locationsData = await getLocations();
        setLocations(locationsData);

        if (locationsData.length === 0) {
          const sampleLocation = {
            id: 'sample-id',
            name: 'Sample Location',
            info: 'This is a sample location for demonstration purposes.',
          };
          setLocations([sampleLocation]);
        }
      } catch (err) {
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

  const createQRcode = (locationId) => {
    const locationUrl = `${window.location.origin}/location/${locationId}`;
    setQRCodeUrl(locationUrl);
    setModalLocations(null);
    setShowModal(true);
  };

  const printAllQRcodes = () => {
    setModalLocations(locations);
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
          {title} - Locations
          <Link to={`/preview`}>
            <button className="btn btn-success ms-4">Preview</button>
          </Link>
          <button className="btn btn-success ms-4" onClick={printAllQRcodes}>
            Print All QR Codes
          </button>
        </h1>

        <div className="mt-4">
          <Link to={`/add-location/${projectId}`}>
            <button className="btn btn-success">Add Location</button>
          </Link>
        </div>

        {error && <p className="text-danger">{error}</p>}

        {locations.length > 0 ? (
          <table className="table table-striped mt-4">
            <tbody>
              {locations.map((location) => (
                <tr key={location.id}>
                  <td>
                    <div className="fw-bold fs-5">{location.name}</div>
                    <div>{location.info}</div>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => createQRcode(location.id)}
                    >
                      Print QR Code
                    </button>
                    <Link to={`/edit-location/${location.id}`}>
                      <button className="btn btn-primary me-2">Edit</button>
                    </Link>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => deleteLocations(location.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No locations available for this project.</p>
        )}
      </div>

      <Footer />

      <QRGenerator
        show={showModal}
        onClose={closeModal}
        locationUrl={qrCodeUrl}
        locations={modalLocations}
      />
    </div>
  );
}

export default LocationList;
