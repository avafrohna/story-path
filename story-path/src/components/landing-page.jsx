import { Link } from 'react-router-dom';

function LandingPage() {
    return (
      <div className="landing-page">
        <h1>Landing Page</h1>
        <p>Welcome to the StoryPath App!</p>

        <div className="button-container">
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
  