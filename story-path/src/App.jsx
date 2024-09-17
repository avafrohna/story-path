import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing-page';
import ProjectListPage from './components/project-list';
import ProjectForm from './components/project-form';
import LocationList from './components/location-list';
import LocationForm from './components/location-form';
import PreviewPage from './components/preview-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/list-projects" element={<ProjectListPage />} />
        <Route path="/add-project" element={<ProjectForm />} />
        <Route path="/edit-project/:id" element={<ProjectForm />} />
        <Route path="/list-locations/:id" element={<LocationList />} />
        <Route path="/add-location" element={<LocationForm />} />
        {/*<Route path="/edit-location" element={<LocationForm />} />*/}
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
