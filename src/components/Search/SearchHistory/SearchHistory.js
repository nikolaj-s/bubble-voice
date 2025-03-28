import React from 'react';

import styles from './SearchHistory.module.css';
import { SearchHistoryButton } from '../../Buttons/SearchHistoryButton/SearchHistoryButton';

export const SearchHistory = ({searchHistory = [], deleteItem = () => {}, search = () => {}}) => {

    if (searchHistory.length === 0) return null;

    return (
        <div className={styles.container}>
            {searchHistory.map((history, index) => {
                return <SearchHistoryButton index={index} action={search} deleteItem={deleteItem} query={history.query} key={history.query} />
            })}
        </div>
    )
}
