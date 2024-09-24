import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProject, getLocations, getLocation } from '../api';
import Footer from './footer';
import Header from './header';

function PreviewPage() {
  const { projectId } = useParams();
  const [locationID, setLocationID] = useState('');
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState('');
  const [location, setLocation] = useState('');
  const [project, setProject] = useState([]);
  const [totalNumLocations, setNumLocations] = useState([]);
  const [totalScore, setTotalScore] = useState([]);
  let [currentScore, setCurrentScore] = useState([]);
  let [currentNumLocations, setCurrentNumLocations] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getProject(projectId);
        setProject(projectData); 
        const locationsData = await getLocations();
        setLocations(locationsData);
        setNumLocations(locationsData.length)
        let score = 0;
        for (let i = 0; i < locationsData.length; i++) {
          score += locationsData[i].score_points;
        }
        setTotalScore(score);
      }
      catch (err) {
        setError(`Error fetching project: ${err.message}`);
      }
    };

    fetchProjectData();
  }, []);

  const fetchLocationData = (locationNumber) => {
    const fetchLocation = async () => {
      const locationID = locations[locationNumber].id;
      const location = await getLocation(locationID);
      setLocation(location);
    }

    fetchLocation();
    calculateCurrentScore();
    calculateLocationsVisited();
  };

  const calculateCurrentScore = () => {
    currentScore += location.score_points;
    setCurrentScore(currentScore)
  };

  const calculateLocationsVisited = () => {
    currentNumLocations += 1;
    setCurrentNumLocations(currentNumLocations)
  };

  return (
    <div id="root">
      <Header />

      <div className="container-custom mt-3">
        <h1>
          Preview - {project[0].title}
        </h1>

        {error && <p className="text-danger">{error}</p>}

        <div className="mb-3">
          <label className="form-label">Change Locations to Test Scoring:</label>
          <select
            name="homescreen_display"
            onChange={fetchLocationData(value)}
            className="form-select"
          >
            <option value='0'>Location 1</option>
            <option value='1'>Location 2</option>
          </select>
        </div>

        <div>
          <button className="btn btn-primary">Title</button>
          <h3>Instructions</h3>
          <p>{project[0].instructions}</p>
          <h3>Initial Clue</h3>
          <p>{project[0].initial_clue}</p>
          <button className="btn btn-primary me-2">
            Points
            {currentScore}/{totalScore}
          </button>
          <button className="btn btn-primary me-2">
            Locations Visited
            {currentNumLocations}/{totalNumLocations}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PreviewPage;
