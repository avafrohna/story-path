import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createLocation } from '../api'; 
import Footer from './footer';
import Header from './header';

function LocationForm() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  console.log(projectId);

  const [formData, setFormData] = useState({
    location_name: '',
    location_trigger: 'Location Entry',
    location_position: '(27.4975,153.013276)',
    score_points: 0,
    clue: '',
    location_content: '',
    location_order: '',
    extra: '',
    project_id: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'score_points' ? parseInt(value, 10) : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      location_content: content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(projectId);

    console.log("Submitting location data:", formData); 

    try {
      await createLocation(formData); //catches error here
      console.log("here");
      navigate(`/list-locations/${projectId}`); //potentially here
    } 
    catch (err) {
      console.error("Error creating location:", err.response || err); 
      setError(`Error creating location: ${err.message}`);
    }
  };

  return (
    <div id="root">
      <Header />

      <div className="container mt-4 ms-5">
        <h1>Add Location</h1>
        <p>Fill in the form below to add a new location.</p>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Location Name</label>
            <input
              type="text"
              name="location_name"
              value={formData.location_name}
              onChange={handleChange}
              className="form-control"
              required
            />
            <p className="text-muted small">The name of this location.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Location Trigger</label>
            <select
              name="location_trigger"
              value={formData.location_trigger}
              onChange={handleChange}
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
              value={formData.location_position}
              onChange={handleChange}
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
              value={formData.score_points}
              onChange={handleChange}
              className="form-control"
              required
            />
            <p className="text-muted small">Specify the number of points participants earn by reaching this location.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Clue</label>
            <textarea
              name="clue"
              value={formData.clue}
              onChange={handleChange}
              className="form-control"
              rows="2"
              required
            />
            <p className="text-muted small">Enter the clue that leads to the next location.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Location Content</label>
            <ReactQuill
              value={formData.location_content}
              onChange={handleContentChange}
              theme="snow"
              className="form-control"
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
