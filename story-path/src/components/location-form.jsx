import Footer from './footer';
import Header from './header';

//what needs to be done:
//  - connect form data and API
//  - fix Location Content to be ReactQuill

function LocationForm() {
  return (
    <div id="root">
      <Header />

      <div className="container mt-4 ms-5">
        <h1>Add Location</h1>
        <p>Fill in the form below to add a new location.</p>

        <form>
          <div className="mb-3">
            <label className="form-label">Location Name</label>
            <input
              type="text"
              name="location_name"
              className="form-control"
              required
            />
            <p className="text-muted small">The name of this location.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Location Trigger</label>
            <select
              name="location_trigger"
              className="form-select"
              required
            >
              <option value="Location Entry">Location Entry</option>
              <option value="QR Code Scans">QR Code Scan</option>
              <option value="Both Location Entry and QR Code Scan">Both Location Entry and QR Code Scan</option>
            </select>
            <p className="text-muted small">Select how this location will be triggered (by location, QR code, or both).</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Location Position (lat, long)</label>
            <input
              type="text"
              name="location_position"
              className="form-control"
              required
            />
            <p className="text-muted small">Enter the latitude and longitude for this location.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Points for Reaching Location</label>
            <input
              type="number"
              name="score_points"
              className="form-control"
              required
            />
            <p className="text-muted small">Specify the number of points participants earn by reaching this location.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Clue</label>
            <textarea
              name="clue"
              className="form-control"
              rows="2"
              required
            />
            <p className="text-muted small">Enter the clue that leads to the next location.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Location Content</label>
            <textarea
              name="location_context"
              className="form-control"
              rows="2"
              required
            />
            <p className="text-muted small">Provide additional content that will be displayed when participants reach this location.</p>
          </div>

          <button type="submit" className="btn btn-success mb-4">Save Location</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
  
export default LocationForm;
