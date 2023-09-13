import { Link } from 'react-router-dom';
import styles from './Cards.module.css';

const Cards = ({ videogames = [] }) => {
  return (
    <div className={styles.gamesContainer}>
      {videogames.map(({ id, name, background_image, genres }) => (
        <div key={id} className={styles.gameCard}>
          <img
            className={styles.image}
            src={background_image}
            alt={name}
          />
          <h3>{name}</h3>
          <p className={styles.genreList}>
            Genres: {genres? genres.join(', '): 'No genres'}</p>
          <Link to={`/videogames/${id}`} className={styles.videogameLink}>
            More Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
