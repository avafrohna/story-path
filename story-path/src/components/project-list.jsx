import { Link } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

function ProjectListPage() {
  return (
    <div id="root">
      <Header />

      <body>
        <div className="mt-3 ms-5">
          <h1 className="">
            Projects
            <Link to="/preview">
              <button className="btn btn-success ms-4">Preview</button>
            </Link>
          </h1>
          <text className="">
            Here are your projects.
          </text>
        </div>

        <div className="mt-3 ms-5">
          <text>
            Sample Project
            <Link to="/list-locations">
              <button className="btn btn-success ms-4">View Locations</button>
            </Link>
          </text>
        </div>
        
        <div className="mt-3 ms-5">
          <Link to="/add-project">
            <button className="btn btn-success">Add project</button>
          </Link>
        </div>
      </body>

      <Footer />
    </div>
  );
}

export default ProjectListPage;
