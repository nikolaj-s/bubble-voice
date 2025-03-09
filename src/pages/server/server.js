import React from 'react'
import { FetchServerDetailsWrapper } from '../../layout/FetchServerDetailsWrapper/FetchServerDetailsWrapper'

import { Banner } from '../../components/Banner/Banner';

import styles from './server.module.css';
import { useSelector } from 'react-redux';
import { selectServerBanner } from '../../features/ServerDetails/serverDetailsSlice';

export const Server = () => {

    const banner = useSelector(selectServerBanner);
    
    return (
        <FetchServerDetailsWrapper>
            <section className={styles.sectionOne}>
                <Banner image={banner} />
            </section>
            <section className={styles.sectionTwo}>

            </section>
            <section className={styles.sectionThree}>
                
            </section>
        </FetchServerDetailsWrapper>
    )
}
