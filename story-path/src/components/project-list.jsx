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

      <div className="mt-3 ms-5">
        <h1>
          Projects
          <Link to="/preview">
            <button className="btn btn-success ms-4">Preview</button>
          </Link>
        </h1>
        <p>Here are your projects:</p>
      </div>

      <div className="mt-3 ms-5">
        {error && <p className="text-danger">Error fetching projects: {error}</p>}

        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <div className="mb-3">
                  <strong>{project.title}</strong>
                  <p>{project.description}</p>
                  <Link to={`/list-locations/${project.id}`}>
                    <button className="btn btn-success ms-4">View Locations</button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects available.</p>
        )}
      </div>
        
      <div className="mt-3 ms-5">
        <Link to="/add-project">
          <button className="btn btn-success">Add Project</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default ProjectListPage;
