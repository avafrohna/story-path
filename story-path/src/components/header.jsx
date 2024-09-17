import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-3 ms-4">Story Path</Link>
        <ul className="navbar-nav ms-auto">
          <Link to="/list-projects" className="nav-link fs-3">Projects</Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
