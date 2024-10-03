import { Link } from 'react-router-dom';

/**
 * This component is used to render the header of the web page
 * It is imported to every page so it is always visible
 * The header includes: 
 *  - Link to story path allows users to be taken back to the landing page at any time
 *  - Link to projects allows users to be taken back to the project list page at any time
 * @returns {JSX.Element}
 */
function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-3 ms-4">STORYPATH</Link>
        <ul className="navbar-nav ms-auto">
          <Link to="/list-projects" className="nav-link fs-3">Projects</Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
