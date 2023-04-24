import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../../styles/sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles['sidebar']}>
      <ul>
        <li>
          <NavLink to='/my-view' activeClassName={styles['active']} exact>
            My View
          </NavLink>
        </li>
        <li>
          <NavLink to='/view-issues' activeClassName={styles['active']} exact>
            View Issues
          </NavLink>
        </li>
        <li>
          <NavLink to='/report-issue' activeClassName={styles['active']} exact>
            Report Issue
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
export default Sidebar;
