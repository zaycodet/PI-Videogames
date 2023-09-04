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
  console.log("Dispatching getVideogameById with ID:", id); // Log para verificar el ID que estás pasando

  fetch(`${URL || LOCALHOST}/videogames/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Response from API:', data); // Log para verificar los datos recibidos desde la API

      dispatch({
        type: GET_VIDEOGAME_BY_ID,
        payload: data,
      });
    })
    .catch((error) => {
      console.error('Error fetching videogame details:', error);
    });
};

export const getVideogamesByName = (query) => (dispatch) => {
  console.log('Searching by name:', query); // Agregar este log
  fetch(`${URL || LOCALHOST}/videogames/name?q=${query}`)
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