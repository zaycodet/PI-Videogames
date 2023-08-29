// reducers.js
import * as actionTypes from './actionTypes';

const initialState = {
  videogames: [],
  selectedVideogame: null,
  filteredVideogames: [],
  genres: [],
  filteredGenre: null,
  filteredOrigin: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case actionTypes.GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        selectedVideogame: action.payload,
      };
    case actionTypes.GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        filteredVideogames: action.payload,
      };
    case actionTypes.GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case actionTypes.FILTER_BY_GENRE:
      return {
        ...state,
        filteredGenre: action.payload,
      };
    case actionTypes.FILTER_BY_ORIGIN:
      return {
        ...state,
        filteredOrigin: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
