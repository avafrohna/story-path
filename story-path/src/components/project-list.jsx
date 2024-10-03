// imports components and resources such as header, footer
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjects,deleteProject } from '../api'; 
import Footer from './footer';
import Header from './header';

/**
 * This component is the list of projects
 * Features:
 * - Display a list of projects
 * - Add a new project.
 * - Delete a project.
 * - Edit a project.
 * - View locations in project.
 * @returns {JSX.Element}
 */
function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  // fetches project data when rendered
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } 
      catch (err) {
        setError(`Error fetching projects: ${err.message}`);
      }
    };
  
    fetchProjects();
  }, []); //only needs to be rendered once, when the page initially loads

  /**
   * deletes a project and updates the list of projects after deletion
   * @param {number} id - ID of project wanted to delete
   */
  const deleteProjects = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
    } 
    catch (err) {
      setError(`Error deleting project: ${err.message}`);
    }
  };

  /**
   * trims long text to a maximum length and adds ellipsis if needed
   * @param {string} text - the text to be trimmed
   * @param {number} maxLength - the maximum length of the text
   * @returns {string} - trimmed text with ellipsis if needed
   */
  const cutOffText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div id="root">
      <Header />
  
      <div className="container-custom mt-3">
        <h1 className=''>
          Projects
        </h1>

        {/* add new location button */}
        <div className="mt-4">
          <Link to="/add-project">
            <button className="btn btn-primary">Add Project</button>
          </Link>
        </div>

        {/* display error messages */}
        {error && <p className="text-danger">{error}</p>}
      
        {/* rendering based on the number of projects */}
        {projects.length > 0 ? (
          <table className="table table-striped mt-4">
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className='fw-bold fs-4'>
                      {cutOffText(project.title, 30)}
                      {project.is_published == true ? <button className="btn btn-success ms-3">Published</button> : ''}
                    </div>
                    <div>{cutOffText(project.description, 110)}</div>
                  </td>
                  <td className="text-end">
                    {/* view location associated with project */}
                    <Link to={`/list-locations/${project.id}`}>
                      <button className="btn btn-primary me-2">View Locations</button>
                    </Link>
                    {/* edit project */}
                    <Link to={`/edit-project/${project.id}`}>
                      <button className="btn btn-secondary me-2">Edit</button>
                    </Link>
                    {/* delete project */}
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => deleteProjects(project.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No projects available.</p>
        )}
      </div>
  
      <Footer />
    </div>
  );  
}

export default ProjectListPage;
