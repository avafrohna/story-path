import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLocation, getLocation, updateLocation } from '../api'; 
import Footer from './footer';
import Header from './header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function LocationForm() {
  const { projectId, id } = useParams();
  const editMode = Boolean(id);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    location_name: '',
    location_trigger: 'Location Entry',
    location_position: '',
    score_points: 0,
    clue: '',
    location_content: '',
    project_id: projectId,
  });

  useEffect(() => {
    // edit mode form, fetches data from form and fills it in for user
    if (editMode) {
      const fetchLocationData = async () => {
        try {
          const location = await getLocation(id);
          setFormData({
            location_name: location[0].location_name,
            location_trigger: location[0].location_trigger,
            location_position: location[0].location_position,
            score_points: location[0].score_points,
            clue: location[0].clue,
            location_content: location[0].location_content,
            project_id: location[0].project_id,
          });
        }
        catch (err) {
          setError(`Error fetching location: ${err.message}`);
        }
      };
      fetchLocationData();
    }
  }, [editMode, id]);

  const editForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'score_points' ? parseInt(value, 10) : value,
    });
  };

  const handleLocationContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      location_content: value, // Directly store the string value
    }));
  };

  const submit = async (e) => {
    e.preventDefault(); //prevent page reload

    console.log("Submitting location data:", formData); 

    try {
      if (editMode) {
        await updateLocation(id, formData);
      } 
      else {
        await createLocation(formData); 
      }
      navigate(`/list-locations/${projectId}`);
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
              value={formData.location_content}
              onChange={handleLocationContentChange}
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
