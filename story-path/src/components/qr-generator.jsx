import QRCode from 'react-qr-code';
import PropTypes from 'prop-types';

function QRGenerator({ show, onClose, locationUrl, locations }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {locations ? 'QR Codes for All Locations' : 'QR Code'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {locations ? (
              <div>
                {locations.map((location) => (
                  <div key={location.id} className="mb-4 text-center">
                    <QRCode value={`${window.location.origin}/location/${location.id}`} />
                    <p className="mt-2">{location.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <QRCode value={locationUrl} />
                <p className="mt-3">Scan this QR code to view the location.</p>
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
    show: PropTypes.bool.isRequired, // Boolean to control modal visibility
    onClose: PropTypes.func.isRequired, // Function to handle modal close
    locationUrl: PropTypes.string, // String for the single QR code URL
    locations: PropTypes.array, // Array of locations for multiple QR codes
};

export default QRGenerator;
