import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjects,deleteProject } from '../api'; 
import Footer from './footer';
import Header from './header';

/**
 * This function displays the list of projects
 * It fetches previously uploaded projects from the api and allows users to create new projects
 * 
 * @returns 
 */
function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData); 

        // sample to test project while not connected to internet
        // const sampleProject = {
        //   title: 'Sample Project',
        //   description: 'This is a sample project.',
        //   is_published: false,
        //   participant_scoring: 'Not Scored',
        //   instructions: 'Use to test website',
        //   initial_clue: 'test',
        //   homescreen_display: 'Display initial clue',
        // };
        // setProjects([sampleProject]);
      } 
      catch (err) {
        setError(`Error fetching projects: ${err.message}`);
      }
    };
  
    fetchProjects();
  }, []);

  const deleteProjects = async (id) => {
    try {
      console.log("Delete: ", id); //check if it printed correct item
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
    } 
    catch (err) {
      setError(`Error deleting project: ${err.message}`);
    }
  };

  return (
    <div id="root">
      <Header />
  
      <div className="container-custom mt-3">
        <h1 className=''>
          Projects
        </h1>

        <div className="mt-4">
          <Link to="/add-project">
            <button className="btn btn-primary">Add Project</button>
          </Link>
        </div>

        {error && <p className="text-danger">{error}</p>}
      
        {projects.length > 0 ? (
          <table className="table table-striped mt-4">
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className='fw-bold fs-4'>
                      {project.title}
                      {project.is_published == true ? <button className="btn btn-success ms-3">Published</button> : ''}
                    </div>
                    <div>{project.description}</div>
                  </td>
                  <td className="text-end">
                    <div>{project.id}</div>
                    <Link to={`/list-locations/${project.id}`}>
                      <button className="btn btn-primary me-2">View Locations</button>
                    </Link>
                    <Link to={`/edit-project/${project.id}`}>
                      <button className="btn btn-secondary me-2">Edit</button>
                    </Link>
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
