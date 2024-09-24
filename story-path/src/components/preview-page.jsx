//import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import { getProject, getLocations, getLocation } from '../api';
import Footer from './footer';
import Header from './header';

function PreviewPage() {
  //const { projectId } = useParams();
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [project, setProject] = useState([]);
  const [totalNumLocations, setNumLocations] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  let [currentScore, setCurrentScore] = useState(0);
  let [currentNumLocations, setCurrentNumLocations] = useState(0);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        //const projectData = await getProject(projectId);
        const sampleProject = {
          title: 'Sample Project',
          description: 'This is a sample project.',
          is_published: false,
          participant_scoring: 'Not Scored',
          instructions: 'Use to test website',
          initial_clue: 'This is a long clue. you will need many skills in order to find this location. it will not be easy. make sure you read everything.',
          homescreen_display: 'Display initial clue',
        };
        setProject(sampleProject); 

        //const locationsData = await getLocations();
        const sampleLocations = [
          {
            id: 'sample-id-1',
            location_name: 'Sample Location 1',
            location_trigger: 'Location Entry',
            location_position: '(27.4975,153.013276)',
            score_points: 5,
          },
          {
            id: 'sample-id-2',
            location_name: 'Sample Location 2',
            location_trigger: 'Location Entry',
            location_position: '(27.4975,153.013276)',
            score_points: 10,
          },
        ];
        setLocations(sampleLocations);
      }
      catch (err) {
        setError(`Error fetching project: ${err.message}`);
      }
    };

    fetchProjectData();
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      setNumLocations(locations.length);
  
      let score = 0;
      for (let i = 0; i < locations.length; i++) {
        score += locations[i].score_points;
      }
      setTotalScore(score);
    }
  }, [locations]); 

  const chooseLocation = (event) => {
    const currentLocation = locations[event.target.value];
    setLocation(currentLocation);

    calculateCurrentScore(currentLocation);
    calculateLocationsVisited();
  };

  const calculateCurrentScore = (currentLocation) => {
    if (currentScore < totalScore) {
      currentScore += currentLocation.score_points;
      setCurrentScore(currentScore)
    }
  };

  const calculateLocationsVisited = () => {
    if (currentNumLocations < totalNumLocations) {
      currentNumLocations += 1;
      setCurrentNumLocations(currentNumLocations)
    }
  };

  return (
    <div id="root">
      <Header />

      <div className="container-custom mt-3">
        <h1>
          Preview - {project.title}
        </h1>

        {error && <p className="text-danger">{error}</p>}

        {locations.length > 0 ? (
          <div className="mb-3">
              <label className="form-label">Change Locations to Test Scoring:</label>
              <select
                name="display"
                onChange={chooseLocation}
                className="form-select"
              >
                {locations.map((location, index) => (
                  <option key={index} value={index}>
                    {location.location_name}
                  </option>
                ))}
              </select>
          </div>
        ) : (
          <p>No locations available for this project.</p>
        )}

        <div className="mobile-preview-container">
          <div className="mobile-content">
            <button className="btn btn-primary fs-4 w-100">{project.title}</button>

            <h3 className='mt-3'>Instructions</h3>
            <p>{project.instructions}</p>

            {project.homescreen_display === 'Display all locations' ? (
              <>
                <h3>Locations</h3>
                <ul>
                  {locations.map((location, index) => (
                    <li key={index}>{location.location_name}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h3>Initial Clue</h3>
                <p>{project.initial_clue}</p>
              </>
            )}

            <div className='d-flex'>
              <button className="btn btn-primary me-2 w-50">
                Points 
                <br></br>
                {currentScore}/{totalScore}
              </button>
              <button className="btn btn-primary w-50">
                Locations Visited
                <br></br>
                {currentNumLocations}/{totalNumLocations}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PreviewPage;
