import { Link } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

function LandingPage() {
  return (
    <div id="root">
      <Header />

      <body>
        <h1 className="display-4 text-center mt-5">Welcome to Story Path!</h1>
        <p className="text-center mt-3">Create and explore virtual museum exhibits, location-based tours, and treasure hunts</p>

        <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
            <Link to="/list-projects">
              <button className="btn btn-success">Get Started</button>
            </Link>
        </div>
      </body>

      <Footer />
    </div>
  );
}

export default LandingPage;
