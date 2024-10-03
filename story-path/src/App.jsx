// import necessary components and pages for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing-page';
import ProjectListPage from './components/project-list';
import ProjectForm from './components/project-form';
import LocationList from './components/location-list';
import LocationForm from './components/location-form';
import PreviewPage from './components/preview-page';

/**
* Main function that defines all the routes needed for Story Path
* Uses React Router to navigate between pages in the application
* @returns {JSX.Element}
*/
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/list-projects" element={<ProjectListPage />} />
        <Route path="/add-project" element={<ProjectForm />} />
        {/* appends project ID becuase this page is specific to a project */}
        <Route path="/edit-project/:projectId" element={<ProjectForm />} /> 
        {/* appends project ID becuase this page is specific to a project */}
        <Route path="/list-locations/:projectId" element={<LocationList />} /> 
        {/* appends project ID becuase this page is specific to a project */}
        <Route path="/add-location/:projectId" element={<LocationForm />} /> 
        {/* appends project ID becuase this page is specific to a project, id is the location ID which is necessary for editing a specific location */}
        <Route path="/edit-location/:projectId/:id" element={<LocationForm />} /> 
        {/* appends project ID becuase this page is specific to a project */}
        <Route path="/preview/:projectId" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
