// reducers.js
import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID,
  GET_VIDEOGAMES_BY_NAME,
  GET_GENRES,
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
  ALPHABETICAL_ORDER,
  RATING_ORDER,
} from './actionTypes';  

  const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: null,
    videogame: {},
    videogamesByName: [],
    currentPage: 1,
  };

  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_VIDEOGAMES:
        return {
          ...state,
          videogames: [...action.payload],
          allVideogames: [...action.payload],
        };
  
      case GET_GENRES:
        return {
          ...state,
          genres: action.payload,
        };
  
      case GET_VIDEOGAMES_BY_NAME:
        return {
          ...state,
          videogames: [...action.payload],
          videogamesByName: [...action.payload],
        };
  
        case FILTER_BY_GENRE:
          const { videogamesByName, allVideogames } = state;
          const isSearching = Boolean(videogamesByName.length);
        
          let genreFilter;
        
          if (action.payload === "All Genres") {
            genreFilter = isSearching ? [...videogamesByName] : [...allVideogames];
          } else {
            const genreName = action.payload;
        
            genreFilter = (isSearching ? [...videogamesByName] : [...allVideogames]).filter(
              (game) => game.genres.some((genre) => genre.name === genreName)
            );
          }
        
          if (!genreFilter.length) genreFilter.push("Error");
        
          return {
            ...state,
            videogames: [...genreFilter],
          };
  
      case FILTER_BY_ORIGIN:
        let originFilter;
  
        if (state.videogamesByName.length) {
          if (action.payload === "all") {
            originFilter = [...state.videogamesByName];
          } else if (action.payload === "database") {
            originFilter = [...state.videogamesByName].filter(
              (e) => e.createdInDb
            );
          } else {
            originFilter = [...state.videogamesByName].filter(
              (e) => !e.createdInDb
            );
          }
  
          if (!originFilter.length) originFilter.push("Error");
  
          return {
            ...state,
            videogames: [...originFilter],
          };
        } else {
          if (action.payload === "all") {
            originFilter = [...state.allVideogames];
          } else if (action.payload === "database") {
            originFilter = [...state.allVideogames].filter((e) => e.createdInDb);
          } else {
            originFilter = [...state.allVideogames].filter(
              (e) => !e.createdInDb
            );
          }
  
          if (!originFilter.length) originFilter.push("Error");
  
          return {
            ...state,
            videogames: [...originFilter],
          };
        }
  
      case ALPHABETICAL_ORDER:
        let alphabeticalOrder;
        if (action.payload === "default") {
          if (state.videogamesByName.length)
            alphabeticalOrder = [...state.videogamesByName];
          else alphabeticalOrder = [...state.allVideogames];
        } else {
          alphabeticalOrder =
            action.payload === "a-z"
              ? [...state.videogames].sort((a, b) => {
                  if (a.name > b.name) return 1;
                  if (b.name > a.name) return -1;
                  return 0;
                })
              : [...state.videogames].sort((a, b) => {
                  if (a.name > b.name) return -1;
                  if (b.name > a.name) return 1;
                  return 0;
                });
        }
  
        return {
          ...state,
          videogames: [...alphabeticalOrder],
        };
  
      case RATING_ORDER:
        let ratingOrder;
        if (action.payload === "default") {
          if (state.videogamesByName.length)
            ratingOrder = [...state.videogamesByName];
          else ratingOrder = [...state.allVideogames];
        } else {
          ratingOrder =
            action.payload === "low"
              ? [...state.videogames].sort((a, b) => {
                  if (a.rating > b.rating) return 1;
                  if (b.rating > a.rating) return -1;
                  return 0;
                })
              : [...state.videogames].sort((a, b) => {
                  if (a.rating > b.rating) return -1;
                  if (b.rating > a.rating) return 1;
                  return 0;
                });
        }
  
        return {
          ...state,
          videogames: [...ratingOrder],
        };
  
      case GET_VIDEOGAME_BY_ID:
        return {
        ...state,
        videogame: action.payload,
      };
      default:
        return state;
    }
  }
  
  export default rootReducer;