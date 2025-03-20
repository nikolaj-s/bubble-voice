import React, { useState, useEffect, useRef } from 'react';
import styles from './FloatingSearch.module.css';
import Dropdown from '../DropDown/DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setQuery } from '../../../features/Search/searchSlice';
import { GlobalSearch } from '../../../features/Search/Thunks/GlobalSearch';

const FloatingSearch = () => {

  const dispatch = useDispatch();

  const {filter, filters, results, loading} = useSelector(state => state.searchSlice);

  const focusInput = () => {

    const input = document.getElementById('global-search');

    if (input) {
      input.focus();
    }

  }

  const handleSetFilter = (value) => {

    dispatch(setFilter(value));

    focusInput();
  
  }

  React.useEffect(() => {

    focusInput();

  }, [])

  const handleSearch = (e) => {

    if (loading) return;

    if (e.keyCode === 13) {

      dispatch(GlobalSearch());
    
    }
  }

  return (
    <div
      style={{
        borderRadius: results[filter] ? '10px 10px 0px 0px' : '10px'
      }}
      className={`${styles.searchBox}`}
    >
      <input
         id="global-search"
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        onChange={(e) => {dispatch(setQuery(e.target.value))}}
        onKeyUp={handleSearch} // Expand on focus
      />
      <div className={styles.filterWrapper}>
        <Dropdown setSelected={handleSetFilter} selected={filter} options={filters}/>
      </div>
    </div>
  );
};

export default FloatingSearch;
