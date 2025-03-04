import React, { useState, useEffect, useRef } from 'react';
import styles from './FloatingSearch.module.css';
import Dropdown from '../DropDown/DropDown';
import { useSelector } from 'react-redux';
import { selectCurrentSearchFilter, selectSearchFilters } from '../../../features/Search/searchSlice';

const FloatingSearch = () => {

  const filters = useSelector(selectSearchFilters);

  const filter = useSelector(selectCurrentSearchFilter);

  React.useEffect(() => {

    const input = document.getElementById('global-search');

    if (input) {
      input.focus();
    }

  }, [])

  return (
    <div
 
      className={`${styles.searchBox}`}
    >
      <input
         id="global-search"
        type="text"
        placeholder="Search..."
        className={styles.searchInput} // Expand on focus
      />
      <div className={styles.filterWrapper}>
        <Dropdown  selectedItem={filter} options={filters}/>
      </div>
    </div>
  );
};

export default FloatingSearch;
