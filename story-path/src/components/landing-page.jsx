import { Link } from 'react-router-dom';

function LandingPage() {
    return (
      <div>
        <h1>Landing Page</h1>
        <text>
            Hello, welcome to story path!
        </text>
        <div>
        <Link to="/list-projects">
          <button>View Projects</button>
        </Link>
        <Link to="/add-project">
          <button>Add New Project</button>
        </Link>
        <Link to="/list-locations">
          <button>View Locations</button>
        </Link>
        <Link to="/add-location">
          <button>Add New Location</button>
        </Link>
        <Link to="/preview">
          <button>Preview</button>
        </Link>
      </div>
      </div>
    );
}
  
export default LandingPage;
