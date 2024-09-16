import { Link } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

function ProjectForm() {
  return (
    <div id="root">
      <Header />

      <body>
      <h1 className="mt-4 ms-5">Add Project</h1>
        <text className="ms-5">
            Fill in form.
        </text>
        <div className="mt-3 ms-5">
            <Link to="/list-projects">
              <button className="btn btn-success">Submit</button>
            </Link>
        </div>
      </body>

      <Footer />
    </div>
  );
}
  
export default ProjectForm;
