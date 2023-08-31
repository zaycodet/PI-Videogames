import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getVideogames,
  getGenres,
  filterByGenre,
  filterByOrigin,
  alphabeticalOrder,
  ratingOrder,
} from '../../redux/actions'; // Asegúrate de importar las acciones correctamente
import styles from './HomePage.module.css'; // Importa los estilos

const ITEMS_PER_PAGE = 15;

const HomePage = () => {
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogames);
  const genres = useSelector(state => state.genres);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedOrigin, setSelectedOrigin] = useState('all');

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  const handleFilterByGenre = genre => {
    setSelectedGenre(genre);
    dispatch(filterByGenre(genre));
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

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleVideogames = videogames.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.filterSection}>
        <select
          value={selectedGenre}
          onChange={e => handleFilterByGenre(e.target.value)}
        >
          <option value="All Genres">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.nombre}>
              {genre.nombre}
            </option>
          ))}
        </select>
        <select
          value={selectedOrigin}
          onChange={e => handleFilterByOrigin(e.target.value)}
        >
          <option value="all">All</option>
          <option value="database">Database</option>
          <option value="api">API</option>
        </select>
      </div>
      <div className={styles.sortButtons}>
        <button onClick={() => handleAlphabeticalSort('default')}>Default Order</button>
        <button onClick={() => handleAlphabeticalSort('a-z')}>A-Z Order</button>
        <button onClick={() => handleAlphabeticalSort('z-a')}>Z-A Order</button>
        <button onClick={() => handleRatingSort('default')}>Default Rating</button>
        <button onClick={() => handleRatingSort('low')}>Lowest Rating</button>
        <button onClick={() => handleRatingSort('high')}>Highest Rating</button>
      </div>
      <div className={styles.videogameList}>
        {visibleVideogames.map(videogame => (
          <div key={videogame.id} className={styles.videogameCard}>
            <Link to={`/videogames/${videogame.id}`} className={styles.videogameLink}>
              {videogame.name}
            </Link>
            {/* Render other details like image, genres, etc. */}
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous Page</button>
        )}
        {visibleVideogames.length === ITEMS_PER_PAGE && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
