// imports components and resources such as header, footer, and react
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLocation, getLocation, updateLocation } from '../api'; 
import Footer from './footer';
import Header from './header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * This component is the form for locations
 * Renders a form witj both "create" and "edit" modes based on the presence of an ID parameter
 * Features:
 * - Form fields for location name, trigger, position, points, clue, and rich-text content.
 * - Allows users to input content using a text editor (ReactQuill) for "Location Content"
 * - Submits the form data to create or update a location.
 * @returns {JSX.Element}
 */
function LocationForm() {
  const { projectId, id } = useParams();
  // determines if the form is in "edit" mode based on the presence of an ID
  const editMode = Boolean(id);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const quillRef = useRef(null);

  // initial, default form data for a new location
  const [formData, setFormData] = useState({
    location_name: '',
    location_trigger: 'Location Entry',
    location_position: '',
    score_points: 0,
    clue: '',
    location_content: '',
    project_id: projectId,
  });

  // fetches the location data in edit mode and populates the form fields
  useEffect(() => {
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
  }, []);

  // handles changes to form fields and updates formData state
  const editForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'score_points' ? parseInt(value, 10) : value,
    });
  };

  // handles changes to the ReactQuill editor
  const handleLocationContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      location_content: value,
    }));
  };

  // handles form submission for both create and edit modes
  const submit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      if (editMode) { // update location in edit mode
        await updateLocation(id, formData);
      } 
      else { // create a new location in create mode
        await createLocation(formData); 
      }
      navigate(`/list-locations/${projectId}`);
    }
    catch (err) {
      console.error("Error creating location:", err.response || err); 
    }
  };

  // configuration for ReactQuill toolbar options
  const modules = {
    toolbar: {
      container: [
        [{'header': '1'}, {'header': '2'}, {'font': []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'color': [] }, { 'background': [] }],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image']
      ]
    }
  };

  return (
    <div id="root">
      <Header />

      <div className="container mt-4 ms-5">
        <h1>Add Location</h1>
        <p>Fill in the form below to add a new location.</p>

        {/* display error messages */}
        {error && <p className="text-danger">{error}</p>}

        {/* form for location input */}
        <form onSubmit={submit}>
          {/* location name */}
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

          {/* location trigger */}
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

          {/* location position */}
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

          {/* points for reaching a location */}
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

          {/* location clue */}
          <div className="mb-3">
            <label className="form-label">Clue</label>
            <textarea
              name="clue"
              value={formData.clue}
              onChange={editForm}
              className="form-control"
              rows="2"
            />
            <p className="text-muted small">Enter the clue that leads to the next location.</p>
          </div>

          {/* location content with ReactQuill */}
          <div className="mb-3">
            <label className="form-label">Location Content</label>
            <ReactQuill
              ref={quillRef}
              value={formData.location_content}
              onChange={handleLocationContentChange}
              modules={modules}
              theme="snow"
              className="form-control"
            />
            <p className="text-muted small">Provide additional content that will be displayed when participants reach this location.</p>
          </div>

          {/* submit button */}
          <button type="submit" className="btn btn-success mb-4">Save Location</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
  
export default LocationForm;
