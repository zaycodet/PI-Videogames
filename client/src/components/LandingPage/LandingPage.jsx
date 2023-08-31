import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎮 Welcome to Gamers Hub 🎮</h1>
      <Link to="/videogames">
        <button className={styles.button}>HOME</button>
      </Link>
    </div>
  );
};

export default LandingPage;
