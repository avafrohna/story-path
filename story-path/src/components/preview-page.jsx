import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProject, getLocations } from '../api';
import Footer from './footer';
import Header from './header';
import MapView from './map';

function PreviewPage() {
  const { projectId } = useParams();
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [project, setProject] = useState([]);
  const [totalNumLocations, setNumLocations] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentNumLocations, setCurrentNumLocations] = useState(0);
  const [hasClue, setHasClue] = useState(false);
  const [visitedLocations, setVisitedLocations] = useState(new Set());  

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getProject(projectId);
        setProject(projectData[0]);

        const locationsData = await getLocations();
        setLocations(locationsData.filter((location) => String(location.project_id) === String(projectId)));
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
      
      if (project.participant_scoring != 'Not Scored') {
        let score = 0;
        for (let i = 0; i < locations.length; i++) {
          score += locations[i].score_points;
        }
        setTotalScore(score);
      }
      else {
        setTotalScore(0);
      }
    }
  }, [locations]); 

  const chooseLocation = (event) => {
    const selectedIndex = event.target.value;

    if (selectedIndex === '') {
      setLocation(null);
      setHasClue(false);
      return
    }

    const currentLocation = locations[selectedIndex];

    if (visitedLocations.has(selectedIndex)) {
      setLocation(currentLocation);
      if (currentLocation.clue != '') {
        setHasClue(true);
      }
      else{
        setHasClue(false);
      }
      return;
    }

    setVisitedLocations((prevVisited) => new Set(prevVisited).add(selectedIndex));
    setLocation(currentLocation);

    if (currentLocation.clue != '') {
      setHasClue(true);
    }
    else{
      setHasClue(false);
    }

    calculateCurrentScore(currentLocation);
    calculateLocationsVisited();
  };

  const calculateCurrentScore = (currentLocation) => {
    if (currentScore < totalScore) {
      setCurrentScore((prevScore) => prevScore + currentLocation.score_points);
    }
  };

  const calculateLocationsVisited = () => {
    if (currentNumLocations < totalNumLocations) {
      setCurrentNumLocations((prevCount) => prevCount + 1);
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
              <option value="">Select a location</option>
              {locations.map((location, index) => (
                <option key={index} value={index}>
                  {location.location_name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>No locations have been added.</p>
        )}

        <div className="mobile-preview-container">
          <div className="mobile-content">
            <button className="btn btn-primary fs-4 w-100">{project.title}</button>

            <h3 className='mt-3'>Instructions</h3>
            <p>{project.instructions}</p>

            {project.homescreen_display != 'Display map' ? (
              <div>
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

                <div>
                  {location ? (
                    hasClue ? (
                      <div>
                        <h3>Location Clue</h3>
                        <p>{location.clue}</p>
                      </div>
                    ) : (
                      <div>
                        <br></br>
                      </div>
                    )
                  ) : (
                    <div>
                      <br></br>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3>Map</h3>
                <MapView locations={locations} />
                <br></br>
              </div>
            )}
            
            {project.participant_scoring != 'Not Scored' ? (
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
            ) : (
              <div className='d-flex'>
                <button className="btn btn-primary w-100">
                  Locations Visited
                  <br></br>
                  {currentNumLocations}/{totalNumLocations}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PreviewPage;
