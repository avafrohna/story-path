import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createProject, getProject, updateProject } from '../api'; 
import Footer from './footer';
import Header from './header';

//TO DO:
// - make certain things required and certain not

/**
 * This function provides the form that allows users to add or edit projects
 * 
 * @returns 
 */
function ProjectForm() {
  const { projectId } = useParams();
  const editMode = Boolean(projectId);
  // if project ID is provided, the form is set to edit mode, otherwise it is just adding a new project
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // default form, is empty expect for a couple values which are automatically set
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_published: false,
    participant_scoring: 'Not Scored',
    instructions: '',
    initial_clue: '',
    homescreen_display: 'Display initial clue',
  });

  useEffect(() => {
    // edit mode form, fetches data from form and fills it in for user
    if (editMode) {
      const fetchProjectData = async () => {
        try {
          const project = await getProject(projectId);
          // project is an object which is a list of array's containing the form data
          // since all the data is in the same array, the project will always only have 1 array
          // therefore, project[0] will always return the project info
          setFormData({
            title: project[0].title,
            description: project[0].description || '',
            is_published: project[0].is_published,
            participant_scoring: project[0].participant_scoring,
            instructions: project[0].instructions || '',
            initial_clue: project[0].initial_clue || '',
            homescreen_display: project[0].homescreen_display,
          });
        }
        catch (err) {
          setError(`Error fetching project: ${err.message}`);
        }
      };
      fetchProjectData();
    }
  }, []); // only want to this to render once since when you are done it will take you back to project list page

  const editForm = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const submit = async (e) => {
    e.preventDefault(); //prevent from reloading page
  
    try {
      if (editMode) {
        await updateProject(projectId, formData);
      } 
      else {
        await createProject(formData);
      }
      navigate('/list-projects');
    } 
    catch (err) {
      setError(`Error saving projects: ${err.message}`);
    }
  };

  return (
    <div id="root">
      <Header />

      <div className="container-custom mt-3">
        <h1> {editMode ? 'Edit Project' : 'Add Project'} </h1>
        <p> Fill in the form below to {editMode ? 'edit this' : 'create a new'} project. </p>

        {error && <p className="text-danger">{error}</p>}
        
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={editForm}
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
              onChange={editForm}
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
              onChange={editForm}
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
              onChange={editForm}
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
              onChange={editForm}
              className="form-select"
            >
              <option value="Display initial clue">Display initial clue</option>
              <option value="Display all locations">Display all locations</option>
              <option value="Display map">Display map</option>
            </select>
            <p className="text-muted small">Choose what to display on the homescreen of the project.</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Participant Scoring</label>
            <select
              name="participant_scoring"
              value={formData.participant_scoring}
              onChange={editForm}
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
              onChange={editForm}
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
