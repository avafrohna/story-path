import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from './footer';
import Header from './header';
import { getProject, getLocations, deleteLocation } from '../api';
import QRGenerator from './qr-generator';

function LocationList() {
  const { projectId } = useParams();
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [qrCodeUrl, setQRCodeUrl] = useState(''); 

  useEffect(() => {
    const fetchLocations = async () => {
      console.log(projectId);
      try {
        const projectData = await getProject(projectId);
        setTitle(projectData[0].title);
        const locationsData = await getLocations();
        console.log(locationsData);
        setLocations(locationsData);

        if (locationsData.length === 0) {
          const sampleLocation = {
            id: 'sample-id',
            name: 'Sample Location',
            info: 'This is a sample location for demonstration purposes.',
          };
          setLocations([sampleLocation]);
        } 
        else {
          setLocations(locationsData);
        }
      }
      catch (err) {
        console.log(projectId);
        setError(`Error fetching locations: ${err.message}`);
      }
    };

    fetchLocations();
  }, [projectId]);

  const handleDelete = async (locationId) => {
    try {
      await deleteLocation(locationId);
      setLocations(locations.filter((location) => location.id !== locationId));
    } catch (err) {
      setError(`Error deleting location: ${err.message}`);
    }
  };

  const handleQRCode = (locationId) => {
    const locationUrl = `${window.location.origin}/location/${locationId}`;
    setQRCodeUrl(locationUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
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
          <button className="btn btn-success ms-4">Print All QR Codes</button>
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
                    <div className='fw-bold fs-5'>{location.name}</div>
                    <div>{location.info}</div>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleQRCode(location.id)}>Print QR Code</button>
                    <Link to={`/edit-location/${location.id}`}>
                      <button className="btn btn-primary me-2">Edit</button>
                    </Link>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleDelete(location.id)}
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
        onClose={handleCloseModal}
        locationUrl={qrCodeUrl}
      />
    </div>
  );
}

export default LocationList;
