// imports components and resources such as header, footer, and the map image
import { Link } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import map from './map-pic.png'

/**
 * This component is the landing page and is the first thing that the user sees
 * The page includes:
 * - A welcoming title and brief description about Story Path.
 * - A banner image related to the platform (currently using `map-pic.png`).
 * - A "Get Started" button that navigates users to the list of projects.
 * @returns {JSX.Element}
 */
function LandingPage() {
  return (
    <div id="root">
      <Header />

      <div>
        <h1 className="display-4 text-center mt-5">Welcome to Story Path!</h1>
        <p className="text-center mt-3 fs-5">Create and explore virtual museum exhibits, location-based tours, and treasure hunts</p>

        <div className="text-center mt-4">
          <img src={map} alt="Story Path Banner" className="img-fluid" style={{ maxWidth: '40%', height: 'auto' }} />
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4 mb-5">
            <Link to="/list-projects">
              <button className="btn btn-primary fs-5">Get Started</button>
            </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
