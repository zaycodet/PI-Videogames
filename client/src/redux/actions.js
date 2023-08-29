// actions.js
import * as actionTypes from './actionTypes';

const URL = process.env.URL;
const LOCALHOST = "http://localhost:3001";

// Action creators
export const getVideogames = () => (dispatch) => {
  fetch(`${URL || LOCALHOST}/videogames`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: GET_VIDEOGAMES,
        payload: data,
      })
    );
};

export const getVideogameById = (videogame) => ({
  type: actionTypes.GET_VIDEOGAME_BY_ID,
  payload: videogame,
});

export const getVideogamesByName = (name) => (dispatch) => {
  fetch(`${URL || LOCALHOST}/videogames?name=${name}`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: GET_VIDEOGAMES_BY_NAME,
        payload: data,
      })
    );
};

export const getGenres = () => (dispatch) => {
  fetch(`${URL || LOCALHOST}/genres`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: GET_GENRES,
        payload: data,
      })
    );
};

export const filterByGenre = (genreId) => ({
  type: actionTypes.FILTER_BY_GENRE,
  payload: genreId,
});

export const filterByOrigin = (origin) => ({
  type: actionTypes.FILTER_BY_ORIGIN,
  payload: origin,
});
