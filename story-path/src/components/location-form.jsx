import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLocation } from '../api'; 
import Footer from './footer';
import Header from './header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function LocationForm() {
  const { projectId } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  console.log(projectId);

  const [formData, setFormData] = useState({
    location_name: 'hello',
    location_trigger: 'Location Entry',
    location_position: '(27.4975,153.013276)',
    score_points: 0,
    clue: 'we',
    location_content: {
      location_id: 0,
      content_order: 1,
      content_type: 'type',
      content_body: 'body',
    },
    location_order: 'you',
    extra: 'yay',
    project_id: projectId,
  });

  const editForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'score_points' ? parseInt(value, 10) : value,
    });
  };

  const updateLocationContent = (value) => {
    // updated the body of location_content
    setFormData((prevData) => ({
      ...prevData,
      location_content: {
        ...prevData.location_content,
        content_body: value,
      },
    }));
  };

  const submit = async (e) => {
    e.preventDefault(); //prevent page reload

    console.log("Submitting location data:", formData); 

    try {
      await createLocation(formData); //catches error here
      console.log("i made it here");
      navigate(`/list-locations/${projectId}`); //potentially problem here
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

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Location Name</label>
            <input
              type="text"
              name="location_name"
              value={formData.location_name}
              onChange={editForm}
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
              onChange={editForm}
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
              onChange={editForm}
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
              onChange={editForm}
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
              onChange={editForm}
              className="form-control"
              rows="2"
              required
            />
            <p className="text-muted small">Enter the clue that leads to the next location.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Location Content</label>
            <ReactQuill
              value={formData.location_content.content_body}
              onChange={updateLocationContent}
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
