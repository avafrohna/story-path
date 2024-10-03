// imports components and resources
import QRCode from 'react-qr-code';
import PropTypes from 'prop-types';

/**
 * This component is the QR generator which displays QR codes
 * Can display a single QR code or a list of QR codes for all locations.
 * @param {Object} props - Component props
 * @param {boolean} props.show - Controls whether the modal is shown
 * @param {function} props.onClose - Function to close the modal
 * @param {string} [props.locationUrl] - URL to generate the QR code for a single location
 * @param {Object} [props.location] - Single location object
 * @param {Array} [props.locations] - Array of location objects for displaying multiple QR codes
 * @returns {JSX.Element}
 */
function QRGenerator({ show, onClose, locationUrl, location, locations }) {
  // does not render the modal if show is false
  if (!show) {
    return null;
  }

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            {/* show title based on single or multiple locations */}
            <h5 className="modal-title">
              {locations ? 'QR Codes for All Locations' : 'QR Code'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* render QR codes for multiple locations */}
            {locations ? (
              <div>
                {locations.map((location) => (
                  <div key={location.id} className="mb-4 text-center">
                    <QRCode value={`${window.location.origin}/location/${location.id}`} />
                    <p className="mt-2">Scan this QR code to view: <strong>{location.location_name}</strong></p>
                  </div>
                ))}
              </div>
            ) : ( // render a single QR code 
              <div className="text-center">
                <QRCode value={locationUrl} />
                <p className="mt-3">Scan this QR code to view {location.location_name}.</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

QRGenerator.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    locationUrl: PropTypes.string,
    location: PropTypes.array,
    locations: PropTypes.array,
};

export default QRGenerator;
