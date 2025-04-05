import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Home, Calendar, Newspaper } from 'lucide-react';
import styles from './ServerNav.module.css';
import { LineSpacer } from '../../ui/Spacers/LineSpacer/LineSpacer';

export const ServerNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serverID } = useParams();

  // Base path for this server's sub routes.
  const basePath = `/dashboard/server/${serverID}`;

  // Define the navigation options.
  const options = [
    {
      label: 'Dashboard',
      // Dashboard route: "/dashboard/server/:serverID/"
      path: `${basePath}/`,
      icon: <Home className={styles.icon} />
    },
    {
      label: 'Events',
      // Events route: "/dashboard/server/:serverID/events"
      path: `${basePath}/events`,
      icon: <Calendar className={styles.icon} />
    },
    {
      label: 'Activity',
      // Activity route: "/dashboard/server/:serverID/activity"
      path: `${basePath}/activity`,
      icon: <Newspaper className={styles.icon} />
    }
  ];

  // Helper to normalize paths by removing trailing slashes.
  const normalizePath = (path) => path.replace(/\/+$/, '');
  const currentPath = normalizePath(location.pathname);

  return (
    <nav className={styles.serverNav}>

      {options.map((option) => {

        const optionPathNormalized = normalizePath(option.path);

        const active = currentPath === optionPathNormalized;
        return (
          <button
            key={option.label}
            onClick={() => navigate(option.path)}
            className={`${styles.navButton} ${active ? styles.active : ''}`}
          >
            {option.icon}
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
      <LineSpacer />
    </nav>
  );
};
