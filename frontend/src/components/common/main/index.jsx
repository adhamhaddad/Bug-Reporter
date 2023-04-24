import React from 'react';
import Routes from '../../../config/routes';
import Sidebar from '../sidebar';
import styles from '../../../styles/main.module.css';

const Main = () => {
  return (
    <main className={styles['main']}>
      <Sidebar />
      <Routes />
    </main>
  );
};
export default Main;
