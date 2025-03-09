import React from "react";
import styles from "./ServerNotFound.module.css";
import { Link } from "react-router-dom";

const ServerNotFound = ({ onGoBack }) => {

    return (
        <>
        <section></section>
        <section>
            <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.errorCode}>404</h1>
                <p className={styles.errorMessage}>Bubble Not Found</p>
                <p className={styles.description}>
                The bubble you are looking for does not exist or was removed.
                </p>
                <Link to={'/dashboard'} className={styles.backButton}>
                Go Back
                </Link>
            </div>
            </div>
        </section>
        <section></section>
        </>
    );
};

export default ServerNotFound;
