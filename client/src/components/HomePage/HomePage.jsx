import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getVideogames,
  getVideogamesByName,
  getGenres,
  filterByGenre,
  filterByOrigin,
  alphabeticalOrder,
  ratingOrder,
} from '../../redux/actions'; 
import styles from './HomePage.module.css';
import Cards from '../Cards/Cards';

const ITEMS_PER_PAGE = 15;

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const videogames = useSelector(state => state.videogames);
  const genres = useSelector(state => state.genres);
  const error = useSelector((state) => state.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  const handleFilterByGenre = genres => {
    setSelectedGenre(genres);
    dispatch(filterByGenre(genres));
  };

  const handleFilterByOrigin = origin => {
    setSelectedOrigin(origin);
    dispatch(filterByOrigin(origin));
  };

  const handleAlphabeticalSort = type => {
    dispatch(alphabeticalOrder(type));
  };

  const handleRatingSort = type => {
    dispatch(ratingOrder(type));
  };

  const handleSearch = () => {
    dispatch(getVideogamesByName(searchName)).then((result) => {
      if (Array.isArray(result)) {
        setSearchResults(result);
      } else {
        setSearchResults([]); // Si no se encontraron resultados, establecer como array vacío
      }
    });
  };

  const totalPages = Math.ceil(videogames.length / ITEMS_PER_PAGE);

  const firstPage = () => {
    setCurrentPage(1);
  };
  
  const lastPage = () => {
    setCurrentPage(totalPages);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleVideogames = videogames.slice(startIndex, endIndex)

  return (
    <div className={styles.container}>
      <h1 className={styles.neonTitle}>🎮 Gamers Hub 🎮</h1>
      <div className={styles.searchBar}>
        <input
          className={styles.customButton}
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            console.log("Search query:", e.target.value);
          }}
        />
        <button
        className={styles.customButton}
        onClick={handleSearch}
      >
        Search
      </button>
      <div className={styles.filterSection}>
      <select
        className={styles.customButton}
        value={selectedGenre}
        onChange={(e) => {
          const selectedGenre = e.target.value;
          setSelectedGenre(selectedGenre); // Actualiza el estado del género seleccionado
          handleFilterByGenre(selectedGenre); // Despacha la acción de filtro
        }}
      >
        <option value="All Genres">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre}>
            {genre}
          </option>
        ))}
      </select>
        <select
          className={styles.customButton}
          value={selectedOrigin}
          onChange={e => handleFilterByOrigin(e.target.value)}
        >
          <option value="all">All</option>
          <option value="database">Database</option>
          <option value="api">API</option>
        </select>
      </div>
      <button
        className={styles.customButton}
        onClick={() => {
          history.push("/form");
        }}
      >Add your own videogame!
      </button>
      <div className={styles.sortButtons}>
        <button className={styles.customButton} onClick={() => handleAlphabeticalSort('default')}>Default Order</button>
        <button className={styles.customButton} onClick={() => handleAlphabeticalSort('a-z')}>A/Z Order</button>
        <button className={styles.customButton} onClick={() => handleAlphabeticalSort('z-a')}>Z/A Order</button>
        <button className={styles.customButton} onClick={() => handleRatingSort('default')}>Default Rating</button>
        <button className={styles.customButton} onClick={() => handleRatingSort('low')}>Lowest Rating</button>
        <button className={styles.customButton} onClick={() => handleRatingSort('high')}>Highest Rating</button>
      </div>
      </div>
      <Cards videogames={searchName ? searchResults : visibleVideogames} />
      <div className={styles.errorMessage}>
        {error && <p>{error}</p>}
      </div>
      <div className={styles.pagination}>
      <button
        className={styles.customButton}
        onClick={firstPage}
        disabled={currentPage === 1}
        >First</button>
      <button
        className={styles.customButton}
        onClick={prevPage}
        disabled={currentPage === 1}
        >Prev</button>
      <span className={styles.currentPage}>
        {currentPage} of {totalPages}</span>
      <button
        className={styles.customButton}
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >Next</button>
      <button
        className={styles.customButton}
        onClick={lastPage}
        disabled={currentPage === totalPages}
      >Last</button>
      </div>
    </div>
  );
};

export default HomePage;
