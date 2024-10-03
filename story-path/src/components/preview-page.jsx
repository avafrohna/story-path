// imports components and resources such as header, footer
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProject, getLocations } from '../api';
import Footer from './footer';
import Header from './header';
import MapView from './map';

/**
 * This component is the preview page for a specific location
 * This component is used to preview a project and its locations
 * Features:
 * - View locations on a map (if map display is chosen).
 * - Test scoring and clues.
 * - Track visited locations.
 * @returns {JSX.Element}
 */
function PreviewPage() {
  const { projectId } = useParams(); // gets projectId from URL parameters
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [project, setProject] = useState([]);
  const [totalNumLocations, setNumLocations] = useState(0); // total number of locations
  const [totalScore, setTotalScore] = useState(0); // total score of all locations
  const [currentScore, setCurrentScore] = useState(0); // the current score based on visited locations
  const [currentNumLocations, setCurrentNumLocations] = useState(0); // number of locations visited
  const [hasClue, setHasClue] = useState(false); // whether location has a clue
  const [visitedLocations, setVisitedLocations] = useState(new Set()); // track visited locations

  // Fetch project and location data when the page is rendered
  useEffect(() => {
    const fetchProjectData = async () => {
      try { // fetch project data based on projectId
        const projectData = await getProject(projectId);
        setProject(projectData[0]);

        // fetch all locations
        const locationsData = await getLocations();
        setLocations(locationsData.filter((location) => String(location.project_id) === String(projectId)));
      }
      catch (err) {
        setError(`Error fetching project: ${err.message}`);
      }
    };
    fetchProjectData();
  }, []); //only needs to be rendered once, when the page initially loads

  // calculate the total number of locations and the total score
  useEffect(() => {
    if (locations.length > 0) {
      setNumLocations(locations.length);
      
      // if the project uses participant scoring, sum the score points for all locations
      if (project.participant_scoring != 'Not Scored') {
        let score = 0;
        for (let i = 0; i < locations.length; i++) {
          score += locations[i].score_points;
        }
        setTotalScore(score);
      }
      else { // Set to 0 if not scoring
        setTotalScore(0);
      }
    }
  }, [locations]); 

  // handle when the user selects a location from the dropdown
  const chooseLocation = (event) => {
    const selectedIndex = event.target.value;

    // if default statement selected
    if (selectedIndex === '') {
      setLocation(null);
      setHasClue(false);
      return
    }

    const currentLocation = locations[selectedIndex];

    // if location was visited, does not update the score or number of locations visited
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

    // mark the location as visited
    setVisitedLocations((prevVisited) => new Set(prevVisited).add(selectedIndex));
    setLocation(currentLocation);

    if (currentLocation.clue != '') {
      setHasClue(true);
    }
    else{
      setHasClue(false);
    }

    // update current score and number of locations visited
    calculateCurrentScore(currentLocation);
    calculateLocationsVisited();
  };

  // increment the current score based on the points of the selected location
  const calculateCurrentScore = (currentLocation) => {
    if (currentScore < totalScore) {
      setCurrentScore((prevScore) => prevScore + currentLocation.score_points);
    }
  };

  // increment the count of locations visited
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

        {/* display error messages */}
        {error && <p className="text-danger">{error}</p>}

        {/* dropdown to select locations */}
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

        {/* preview in mobile container display */}
        <div className="mobile-preview-container">
          <div className="mobile-content">
            <button className="btn btn-primary fs-4 w-100">{project.title}</button>

            <h3 className='mt-3'>Instructions</h3>
            <p>{project.instructions}</p>

            {/* show map or list of locations or initial clue */}
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
            
            {/* display score and locations visited */}
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
