// actions.js
import {GET_VIDEOGAMES,
GET_VIDEOGAME_BY_ID,
GET_VIDEOGAMES_BY_NAME,
GET_GENRES,
FILTER_BY_GENRE,
FILTER_BY_ORIGIN,
ALPHABETICAL_ORDER,
RATING_ORDER } from './actionTypes';

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

export const getVideogameById = (id) => (dispatch) => {
  fetch(`${URL || LOCALHOST}/videogames/${id}`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: GET_VIDEOGAME_BY_ID,
        payload: data,
      })
    );
};

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