import { Link } from 'react-router-dom';

function LandingPage() {
    return (
      <div className="container text-center py-5">
        <h1 className="display-4">Landing Page</h1>
        <p className="lead">Welcome to the StoryPath App!</p>

        <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
            <Link to="/list-projects">
              <button className="btn btn-primary me-md-2">View Projects</button>
            </Link>
            <Link to="/add-project">
              <button className="btn btn-success me-md-2">Add New Project</button>
            </Link>
            <Link to="/list-locations">
              <button className="btn btn-info me-md-2">View Locations</button>
            </Link>
            <Link to="/add-location">
              <button className="btn btn-warning me-md-2">Add New Location</button>
            </Link>
            <Link to="/preview">
              <button className="btn btn-secondary">Preview</button>
            </Link>
        </div>
      </div>
    );
}
  
export default LandingPage;
