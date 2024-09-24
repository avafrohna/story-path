// import necessary components and pages for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing-page';
import ProjectListPage from './components/project-list';
import ProjectForm from './components/project-form';
import LocationList from './components/location-list';
import LocationForm from './components/location-form';
import PreviewPage from './components/preview-page';

/**
 * Main function that defines all the routes needed for story path
 * @returns 
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/list-projects" element={<ProjectListPage />} />
        <Route path="/add-project" element={<ProjectForm />} />
        <Route path="/edit-project/:projectId" element={<ProjectForm />} />
        <Route path="/list-locations/:projectId" element={<LocationList />} />
        <Route path="/add-location/:projectId" element={<LocationForm />} />
        <Route path="/edit-location/:id" element={<LocationForm />} />
        <Route path="/preview/:id" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
