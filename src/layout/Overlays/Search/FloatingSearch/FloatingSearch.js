import React from 'react';

import styles from './FloatingSearch.module.css';

import Dropdown from '../../../../components/ui/Inputs/DropDown/DropDown';

import SimilarImageButton from '../../../../components/ui/Buttons/SimilarImageButton/SimilarImageButton';
import { Search, X } from 'lucide-react';

const FloatingSearch = ({filter, filters = [], loading, setFilter = () => {}, search = () => {}, value = "", setValue = () => {}, similarImageSrc, clearSimilarImage}) => {

  const focusInput = () => {

    const input = document.getElementById('global-search');

    if (input) {
      
      input.focus();

      input.scrollIntoView({ behavior: 'smooth', block: 'center' });

      
    }

  }

  const blurInput = () => {
    const input = document.getElementById('global-search');

    if (input) {
      input.blur();
    }

  }

  const handleSetFilter = (value) => {

    setFilter(value);
  
  }

  React.useEffect(() => {

    focusInput()
  

  }, [])

  const handleSearch = (e) => {


    if (value.trim().length === 0) return;

    if (loading) return;

    if (e.keyCode === 13) {

      blurInput();

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
      <Search color='var(--text-color)' size={30} style={{marginLeft: 5}} />
      {similarImageSrc && filter.path === 'images' && (<SimilarImageButton src={similarImageSrc} onRemove={clearSimilarImage} />)}
      <input
         id="global-search"
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        onChange={(e) => {setValue(e.target.value)}}
        value={value}
        onKeyUp={handleSearch} // Expand on focus
      />
      {value.length > 0 && 
      <div onClick={() => {setValue(""); focusInput()}} className={styles.clearInput}>
        <X color='var(--text-color)' />
      </div>}
      <div className={styles.filterWrapper}>
        <Dropdown setSelected={handleSetFilter} selected={filter} options={filters}/>
      </div>
    </div>
  );
};

export default FloatingSearch;
