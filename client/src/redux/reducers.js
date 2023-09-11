import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID,
  GET_VIDEOGAMES_BY_NAME,
  GET_GENRES,
  GET_PLATFORMS,
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
  ALPHABETICAL_ORDER,
  RATING_ORDER,
  POST_VIDEOGAME,
} from './actionTypes';

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  platforms: [],
  detail: null,
  videogame: {},
  videogamesByName: [],
  currentPage: 1,
};

function rootReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VIDEOGAMES:
      const cleanedVideogames = payload.filter(game => game.id !== 251509);
      return {
        ...state,
        videogames: [...cleanedVideogames],
        allVideogames: [...cleanedVideogames],
      };
    
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: payload,
      };

    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogamesByName: [...payload],
      };

    case FILTER_BY_GENRE:
      const isSearching = Boolean(state.videogamesByName.length);
      let genreFilter;

      if (payload === 'All Genres') {
        genreFilter = isSearching ? [...state.videogamesByName] : [...state.allVideogames];
      } else {
        const genreName = payload;
        genreFilter = (isSearching ? [...state.videogamesByName] : [...state.allVideogames]).filter(
          (game) => game.genres.some((genre) => genre.name === genreName)
        );
      }

      if (!genreFilter.length) genreFilter.push('Error');

      return {
        ...state,
        videogames: [...genreFilter],
      };

    case FILTER_BY_ORIGIN:
      let originFilter;

      if (payload === 'all') {
        originFilter = [...state.allVideogames];
      } else if (payload === 'database') {
        originFilter = state.allVideogames.filter((game) => typeof game.id === 'string' && game.id !== 251509);
      } else if (payload === 'api') {
        originFilter = state.allVideogames.filter((game) => typeof game.id === 'number' && game.id !== 251509);
      }

      if (!originFilter.length) originFilter.push('Error');

      return {
        ...state,
        videogames: [...originFilter],
      };

      case ALPHABETICAL_ORDER:
        const alphabeticalOrder = payload === 'default' ?
          [...state.allVideogames] :
          [...state.videogames].sort((a, b) => {
            if (payload === 'a-z') {
              return a.name.localeCompare(b.name); // Ordenar alfabéticamente ascendente
            } else if (payload === 'z-a') {
              return b.name.localeCompare(a.name); // Ordenar alfabéticamente descendente
            }
            return 0; // No hacer cambios si no hay un criterio válido
          });
      
        return {
          ...state,
          videogames: [...alphabeticalOrder],
        };
      
        case RATING_ORDER:
          const ratingOrder = payload === 'default' ?
            [...state.allVideogames] :
            [...state.videogames].sort((a, b) => {
              if (payload === 'low') {
                return a.rating - b.rating; // Ordenar por rating ascendente
              } else if (payload === 'high') {
                return b.rating - a.rating; // Ordenar por rating descendente
              }
              return 0; // No hacer cambios si no hay un criterio válido
            });
        
          return {
            ...state,
            videogames: [...ratingOrder],
          };
      
    case GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        videogame: payload,
      };

    case POST_VIDEOGAME:
      return {
        ...state,
        videogame: payload,
      };

    default:
      return state;
  }
}

export default rootReducer;