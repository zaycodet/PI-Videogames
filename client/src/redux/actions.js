import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID,
  GET_VIDEOGAMES_BY_NAME,
  GET_GENRES,
  GET_PLATFORMS,
  FILTER_BY_GENRE,
  POST_VIDEOGAME,
  FILTER_BY_ORIGIN,
  ALPHABETICAL_ORDER,
  RATING_ORDER,
} from './actionTypes';

const LOCALHOST = 'http://localhost:3001';

// Función para manejar errores de la respuesta HTTP
const handleResponseError = (response) => {
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  return response.json();
};

// Action creators
export const getVideogames = () => (dispatch) => {
  console.log('Fetching all videogames...');
  fetch(`${LOCALHOST}/videogames`)
    .then(handleResponseError)
    .then((data) =>
      dispatch({
        type: GET_VIDEOGAMES,
        payload: data,
      })
    )
    .catch((error) => {
      console.error('Error fetching all videogames:', error); 
    });
};

export const getVideogameById = (id) => (dispatch) => {
  console.log('Fetching videogame by ID:', id);
  fetch(`${LOCALHOST}/videogames/${id}`)
    .then(handleResponseError)
    .then((data) => {
      console.log('Response from API:', data);
      dispatch({
        type: GET_VIDEOGAME_BY_ID,
        payload: data,
      });
    })
    .catch((error) => {
      console.error('Error fetching videogame details:', error);
    });
};

export const getVideogamesByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${LOCALHOST}/videogames/name?name=${name}`);
      const data = await response.json();
      dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: data }); 
      return data;
    } catch (error) {
      console.error('Error fetching videogames by name:', error);
    }
  };
};


export const getGenres = () => (dispatch) => {
  console.log('Fetching genres...'); 
  fetch(`${LOCALHOST}/genres`)
    .then(handleResponseError)
    .then((data) =>
      dispatch({
        type: GET_GENRES,
        payload: data,
      })
    )
    .catch((error) => {
      console.error('Error fetching genres:', error);
    });
};

export const getPlatforms = () => (dispatch) => {
  console.log('Fetching platforms...'); 
  fetch(`${LOCALHOST}/platforms`)
    .then(handleResponseError)
    .then((data) =>
      dispatch({
        type: GET_PLATFORMS,
        payload: data,
      })
    )
    .catch((error) => {
      console.error('Error fetching platforms:', error); 
    });
};

export const postVideogame = (videogameData) => async (dispatch) => {
  try {
    console.log('Creating a new videogame...'); 
    // Realiza la solicitud POST al servidor con los datos del videojuego
    await fetch(`${LOCALHOST}/videogames`, {
      method: 'POST',
      body: JSON.stringify(videogameData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('New videogame created successfully.');

    dispatch({
      type: POST_VIDEOGAME,
      payload: JSON,
    });

  } catch (error) {
    console.error('Error creating the videogame:', error); 
    throw error;
  }
};

export const filterByGenre = (payload) => ({
  type: FILTER_BY_GENRE, 
    payload
  });

export const filterByOrigin = (payload) => ({
  type: FILTER_BY_ORIGIN,
  payload,
});

export const alphabeticalOrder = (payload) => ({
  type: ALPHABETICAL_ORDER,
  payload,
});

export const ratingOrder = (payload) => ({
  type: RATING_ORDER,
  payload,
});