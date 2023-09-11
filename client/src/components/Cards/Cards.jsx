import { Link } from 'react-router-dom';
import styles from './Cards.module.css';

const Cards = ({ videogames }) => {
  return (
    <div className={styles.gamesContainer}>
      {videogames.map((videogame) => (
        <div key={videogame.id} className={styles.gameCard}>
          <img
            className={styles.image}
            src={videogame.background_image}
            alt={videogame.name}
          />
          <h3>{videogame.name}</h3>
          <p className={styles.genreList}>
            Genres: {videogame.genres? videogame.genres.join(', '): 'No genres'}</p>
          <Link to={`/videogames/${videogame.id}`} className={styles.videogameLink}>
            More Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
