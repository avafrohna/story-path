// imports components and resources such as header, footer
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProject, getLocations, deleteLocation } from '../api';
import Footer from './footer';
import Header from './header';
import QRGenerator from './qr-generator';

/**
 * This component is the list of locations
 * This component displays a list of locations associated with a specific project.
 * Features:
 * - Display a list of locations belonging to a project.
 * - Add a new location.
 * - Delete a location.
 * - Edit a location.
 * - Generate a QR code for a location or print all QR codes for the project.
 * @returns {JSX.Element}
 */
function LocationList() {
  const { projectId } = useParams(); // gets projectId from URL parameters
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [project, setProject] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  const [modalLocations, setModalLocations] = useState(null);
  const [modalLocation, setModalLocation] = useState(null);

  // fetches project and location data when rendered
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // fetch project data using project ID
        const projectData = await getProject(projectId);
        setProject(projectData[0]);
        // fetches all locations
        const locationsData = await getLocations();
        setLocations(locationsData);
      }
      catch (err) {
        setError(`Error fetching locations: ${err.message}`);
      }
    };

    fetchLocations();
  }, []); //only needs to be rendered once, when the page initially loads

  /**
   * deletes a location and updates the list of locations after deletion
   * @param {number} locationId - ID of location wanted to delete
   */
  const deleteLocations = async (locationId) => {
    try {
      await deleteLocation(locationId);
      setLocations(locations.filter((location) => location.id !== locationId));
    } 
    catch (err) {
      setError(`Error deleting location: ${err.message}`);
    }
  };

  /**
   * generates a QR code for a specific location and opens the modal
   * @param {object} location - the location for which to generate the QR code.
   */
  const createQRcode = (location) => {
    const locationUrl = `${window.location.origin}/location/${location.id}`;
    setQRCodeUrl(locationUrl);
    setModalLocation(location);
    setModalLocations(null);
    setShowModal(true);
  };

  /**
   * QR code generation for all locations and opens the modal
   */
  const printAllQRcodes = () => {
    const projectLocations = locations.filter((location) => String(location.project_id) === String(projectId));
    setModalLocations(projectLocations);
    setShowModal(true);
  };

  /**
   * closes the QR code modal.
   */
  const closeModal = () => {
    setShowModal(false);
  };

  /**
   * trims long text to a maximum length and adds ellipsis if needed
   * @param {string} text - the text to be trimmed
   * @param {number} maxLength - the maximum length of the text
   * @returns {string} - trimmed text with ellipsis if needed
   */
  const cutOffText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
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

        {/* add new location button */}
        <div className="mt-4">
          <Link to={`/add-location/${projectId}`}>
            <button className="btn btn-primary">Add Location</button>
          </Link>
        </div>

        {/* display error messages */}
        {error && <p className="text-danger">{error}</p>}

        {/* rendering based on the number of locations */}
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
                        <div className="fw-bold fs-5">{cutOffText(location.location_name, 30)}</div>
                        <div>Trigger: {location.location_trigger}</div>
                        <div>Position: {location.location_position}</div>
                        <div>Score: {location.score_points}</div>
                      </td>
                      <td className="text-end">
                        {/* generate QR code for the location */}
                        <button className="btn btn-primary me-2" onClick={() => createQRcode(location)}>
                          Print QR Code
                        </button>
                        {/* edit location */}
                        <Link to={`/edit-location/${location.project_id}/${location.id}`}>
                          <button className="btn btn-secondary me-2">Edit</button>
                        </Link>
                        {/* delete location */}
                        <button className="btn btn-danger me-2" onClick={() => deleteLocations(location.id)}>
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

      {/* modal for displaying QR codes */}
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
