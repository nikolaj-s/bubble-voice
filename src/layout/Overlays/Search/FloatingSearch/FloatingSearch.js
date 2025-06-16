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
console.log(value)
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
      data-context={JSON.stringify({type: 'input', id: "search"})}
      onClick={focusInput}
      className={`${styles.searchBox}`}
    >
      <Search color='var(--text-color)' size={25} style={{marginLeft: 5, flexShrink: 0}} />
      {similarImageSrc && filter.path === 'images' && (<SimilarImageButton src={similarImageSrc} onRemove={clearSimilarImage} />)}
      <input
         id="global-search"
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        onChange={(e) => {setValue(e.target.value)}}
        maxLength={128}
        value={value}
        onKeyDown={(e) => {e.stopPropagation()}}
        onKeyUp={(e) => {e.stopPropagation(); handleSearch(e);}}// Expand on focus
      />
      {value.length > 0 && 
      <div onClick={() => {setValue(""); focusInput()}} className={styles.clearInput}>
        <X color='var(--text-color)' />
      </div>}
      <div className={styles.filterWrapper}>
        <Dropdown minWidth={120} setSelected={handleSetFilter} selected={filter} options={filters}/>
      </div>
    </div>
  );
};

export default FloatingSearch;
