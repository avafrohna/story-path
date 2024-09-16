import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createProject } from '../api'; 
import Footer from './footer';
import Header from './header';

function ProjectForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    initial_clue: '',
    homescreen_display: '',
    is_published: false,
    participant_scoring: 'Not Scored',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      await createProject(formData);
      navigate('/list-projects');
    } 
    catch (err) {
      setError('Error creating project: ' + err.message);
    }
  };

  return (
    <div id="root">
      <Header />

      <div className="container mt-4 ms-5">
        <h1>Add Project</h1>
        <p>Fill in the form below to create a new project.</p>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="form-control"
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Initial Clue</label>
            <input
              type="text"
              name="initial_clue"
              value={formData.initial_clue}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Homescreen Display</label>
            <input
              type="text"
              name="homescreen_display"
              value={formData.homescreen_display}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Is Published?</label>
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              className="form-check-input"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Participant Scoring</label>
            <select
              name="participant_scoring"
              value={formData.participant_scoring}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Not Scored">Not Scored</option>
              <option value="Scored">Scored</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default ProjectForm;
