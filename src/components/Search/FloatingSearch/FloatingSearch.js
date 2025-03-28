import React from 'react';
import styles from './FloatingSearch.module.css';
import Dropdown from '../../Inputs/DropDown/DropDown'

const FloatingSearch = ({filter, filters = [], loading, setFilter = () => {}, search = () => {}, value = "", setValue = () => {}}) => {

  const focusInput = () => {

    const input = document.getElementById('global-search');

    if (input) {
      input.focus();
    }

  }

  const handleSetFilter = (value) => {

    setFilter(value)

    focusInput();
  
  }

  React.useEffect(() => {

    focusInput();

  }, [])

  const handleSearch = (e) => {

    if (loading) return;

    if (e.keyCode === 13) {

      search();
    
    }
  }

  return (
    <div
      style={{
        borderRadius: '10px 10px 0px 0px'
      }}
      className={`${styles.searchBox}`}
    >
      <input
         id="global-search"
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        onChange={(e) => {setValue(e.target.value)}}
        value={value}
        onKeyUp={handleSearch} // Expand on focus
      />
      <div className={styles.filterWrapper}>
        <Dropdown setSelected={handleSetFilter} selected={filter} options={filters}/>
      </div>
    </div>
  );
};

export default FloatingSearch;
