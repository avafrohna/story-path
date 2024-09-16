import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createProject, getProject, updateProject } from '../api'; 
import Footer from './footer';
import Header from './header';

//what needs to be done:
//  - generate random id
//  - ensure username is implemented properly

function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    //id: '',
    title: '',
    description: '',
    is_published: false,
    participant_scoring: 'Not Scored',
    //username: '',
    instructions: '',
    initial_clue: '',
    homescreen_display: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchProjectData = async () => {
        try {
          const project = await getProject(id);
          setFormData({
            title: project.title || '',
            description: project.description || '',
            is_published: project.is_published || false,
            participant_scoring: project.participant_scoring || 'Not Scored',
            instructions: project.instructions || '',
            initial_clue: project.initial_clue || '',
            homescreen_display: project.homescreen_display || 'Display initial clue',
          });
        }
        catch (err) {
          setError('Error fetching project: ' + err.message);
        }
      };
      fetchProjectData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
  
    try {
      if (isEditMode) {
        const response = await updateProject(id, formData);
        console.log("Update response:", response);
      } 
      else {
        const response = await createProject(formData);
        console.log("Create response:", response);
      }

      navigate('/list-projects');
    } 
    catch (err) {
      console.error('Error saving project:', err.message);
      setError('Error saving project: ' + err.message);
    }
  };  

  return (
    <div id="root">
      <Header />

      <div className="container mt-4 ms-5">
        <h1>{isEditMode ? 'Edit Project' : 'Add Project'}</h1>
        <p>Fill in the form below to {isEditMode ? 'edit' : 'create'} a new project.</p>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
            <p className="text-muted small">The name of your project.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="2"
              required
            />
            <p className="text-muted small">Provide a brief description of your project. This is not displayed to participants.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="form-control"
              rows="2"
              required
            />
            <p className="text-muted small">Instructions for participants, explaining how to engage with the project.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Initial Clue</label>
            <textarea
              name="initial_clue"
              value={formData.initial_clue}
              onChange={handleChange}
              className="form-control"
              rows="2"
            />
            <p className="text-muted small">The first clue to start the project. This is optional.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Homescreen Display</label>
            <select
              name="homescreen_display"
              value={formData.homescreen_display}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Display initial clue">Display initial clue</option>
              <option value="Display all locations">Display all locations</option>
            </select>
            <p className="text-muted small">Choose what to display on the homescreen of the project.</p>
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
              <option value="Number of Scanned QR Codes">Number of Scanned QR Codes</option>
              <option value="Number of Locations Entered">Number of Locations Entered</option>
            </select>
            <p className="text-muted small">Select how participants will be scored in this project.</p>
          </div>

          <div className="mb-3">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-label">Published</label>
          </div>

          <button type="submit" className="btn btn-success mb-4">Save Project</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default ProjectForm;
