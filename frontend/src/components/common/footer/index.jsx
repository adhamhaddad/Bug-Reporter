import React from 'react';
import styles from '../../../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <p className={styles['copyright']}>
        Copyright &copy; 2023 Powered by -{' '}
        <a href='https://www.linkedin.com/in/adhamashraf' target='_blank'>
          <strong>Adham Haddad</strong>
        </a>
      </p>
    </footer>
  );
};
export default Footer;
