import React from "react";
import { Link as LucideLinkIcon } from "lucide-react";
import styles from "./LinkComponent.module.css";

const LinkComponent = ({ link, children }) => {

    if (!link) return null;

    return (
        <span className={styles.linkWrapper}>
        <LucideLinkIcon size={20} color="var(--text-color)" />
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {children || link}
        </a>
        </span>
    );
};

export default LinkComponent;
