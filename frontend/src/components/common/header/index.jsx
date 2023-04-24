import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/header.module.css';
const Header = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['logo']}>Bug Reporter</div>
      <nav>
        <button className={styles['nav-buttons']}>Report Issue</button>
        <Link to='/my-account' exact className={styles['nav-buttons']}>
          My Account
        </Link>
      </nav>
    </header>
  );
};
export default Header;
