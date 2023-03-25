// library's
import React from 'react'
import { useRoutes } from 'react-router';
import { AnimatePresence } from 'framer-motion';

// components
import { HomeNavigation } from '../HomeNavigation/HomeNavigation';
import { ReleaseNotes } from '../ReleaseNotes/ReleaseNotes';
import { Home } from '../Home/Home';

// style's
import "./NoServerSelectedDisplay.css";
import { useSelector } from 'react-redux';
import { selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

const NoServer = () => {

  const [page, setPage] = React.useState('home');

  const secondaryColor = useSelector(selectSecondaryColor);

  const handlePageChange = (page) => {
    setPage(page);
  }

  return (
    <div 
    className='no-server-selected-display'>
        <HomeNavigation navigate={handlePageChange} page={page} />
        <AnimatePresence>
          {page === 'home' ? <Home /> : null}
          {page === 'release' ? <ReleaseNotes /> : null}
        </AnimatePresence>
    </div>
  )
}


export const NoServerSelectedDisplay = () => useRoutes([
  {path: "", element: <NoServer />}
])