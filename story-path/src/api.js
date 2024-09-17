const API_BASE_URL = 'https://0b5ff8b0.uqcloud.net/api';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ5MDA1MzQifQ.7GTR79tbb2Nk1o2mZKdpBqpbuHScsUhEFws7hMkYLvA';
const USERNAME = 's4900534';

/**
 * Helper function to make API requests.
 * It automatically includes the Authorization header and any request body.
 *
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} [method='GET'] - The HTTP method to use (GET, POST, PATCH, etc.).
 * @param {object} [body=null] - The request body to send (for POST/PATCH requests).
 * @returns {Promise<object>} - The JSON response from the API.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JWT_TOKEN}`,
    },
  };

  if (method === 'POST' || method === 'PATCH') {
    options.headers['Prefer'] = 'return=representation';
  }

  if (body) {
    const requestBody = { ...body, project_id: parseInt(body.project_id), username: USERNAME };
    console.log('Request Body:', requestBody);
    options.body = JSON.stringify(requestBody);
    console.log('Request options:', options);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Fetch all projects.
 * @returns {Promise<Array>} - Returns an array of project objects.
 */
export async function getProjects() {
    try {
      const response = await apiRequest('/project');
      return response;
    } 
    catch (error) {
      console.error("Error in getProjects: ", error);
      throw error;
    }
}

/**
 * Fetch a single project by ID.
 * @param {string} id - The project ID.
 * @returns {Promise<object>} - Returns a single project object.
 */
export async function getProject(id) {
  return await apiRequest(`/project?id=eq.${id}`);
}

/**
 * Create a new project.
 * @param {object} project - The project details.
 * @returns {Promise<object>} - The created project object.
 */
export async function createProject(project) {
  return apiRequest('/project', 'POST', project);
}

/**
 * Update a project.
 * @param {string} id - The project ID.
 * @param {object} updates - The project fields to update.
 * @returns {Promise<object>} - The updated project object.
 */
export async function updateProject(id, updates) {
  const response = await fetch(`${API_BASE_URL}/project?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JWT_TOKEN}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Error updating project with ID ${id}`);
  }
}

/**
 * Delete a project.
 * @param {string} id - The project ID.
 * @returns {Promise<void>}
 */
export async function deleteProject(id) {
  const response = await fetch(`${API_BASE_URL}/project?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JWT_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error deleting project with ID ${id}`);
  }
}


//          LOCATION

/**
 * Fetch all location.
 * @returns {Promise<Array>} - Returns an array of project objects.
 */
export async function getLocations() {
  try {
    const response = await apiRequest('/location');
    return response;
  } 
  catch (error) {
    console.error("Error in getLocations: ", error);
    throw error;
  }
}

/**
 * Create a new location.
 * @param {object} location - The location details.
 * @returns {Promise<object>} - The created location object.
 */
export async function createLocation(location) {
  return apiRequest('/location', 'POST', location);
}





export async function getLocationsByProject(projectId) {
  try {
    const response = await apiRequest(`/location?project_id=eq.${projectId}`);
    return response;
  } catch (error) {
    console.error(`Error fetching locations for project ${projectId}:`, error);
    throw error;
  }
}

export async function updateLocation(locationId, updates) {
  try {
    const response = await apiRequest(`/location?id=eq.${locationId}`, 'PATCH', updates);
    return response;
  } catch (error) {
    console.error(`Error updating location with ID ${locationId}:`, error);
    throw error;
  }
}

export async function deleteLocation(locationId) {
  try {
    const response = await fetch(`${API_BASE_URL}/location?id=eq.${locationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting location with ID ${locationId}`);
    }
  } catch (error) {
    console.error(`Error deleting location with ID ${locationId}:`, error);
    throw error;
  }
}
