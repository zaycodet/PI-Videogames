import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎮 Welcome to Gamers Hub 🎮</h1>
      <button className={styles.button}>HOME</button>
    </div>
  );
};

export default LandingPage;
