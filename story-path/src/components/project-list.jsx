import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../api'; 
import Footer from './footer';
import Header from './header';

function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData); 
      } 
      catch (err) {
        setError(err.message);
      }
    };
  
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
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
        <h1>
          Projects
        </h1>

        <div className="mt-4">
          <Link to="/add-project">
            <button className="btn btn-success">Add Project</button>
          </Link>
        </div>
      
        {error && <p className="text-danger">Error fetching projects: {error}</p>}
  
        {projects.length > 0 ? (
          <table className="table table-striped mt-4">
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className='fw-bold fs-5'>{project.title}</div>
                    <div>{project.description}</div>
                  </td>
                  <td className="text-end">
                    <Link to={`/list-locations/${project.id}`}>
                      <button className="btn btn-primary me-2">View Locations</button>
                    </Link>
                    <Link to={`/edit-project/${project.id}`}>
                      <button className="btn btn-primary me-2">Edit</button>
                    </Link>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
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
