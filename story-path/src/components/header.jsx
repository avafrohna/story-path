import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-3 ms-4">Story Path</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/list-projects" className="nav-link fs-3">Projects</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
