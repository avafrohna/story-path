import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjects } from '../api'; 
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

  return (
    <div id="root">
      <Header />
  
      <div className="container-custom mt-3">
        <h1>
          Projects
          <Link to="/preview">
            <button className="btn btn-success ms-4">Preview</button>
          </Link>
        </h1>
      
        {error && <p className="text-danger">Error fetching projects: {error}</p>}
  
        {projects.length > 0 ? (
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Description</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td className="text-end">
                    <Link to={`/list-locations/${project.id}`}>
                      <button className="btn btn-primary me-2">View Locations</button>
                    </Link>
                    <Link to={`/edit-project/${project.id}`}>
                      <button className="btn btn-primary me-2">Edit</button>
                    </Link>
                    <button className="btn btn-primary me-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No projects available.</p>
        )}
      </div>
  
      <div className="mt-3 ms-5 mb-5">
        <Link to="/add-project">
          <button className="btn btn-success">Add Project</button>
        </Link>
      </div>
  
      <Footer />
    </div>
  );  
}

export default ProjectListPage;
