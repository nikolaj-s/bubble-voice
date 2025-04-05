import { useState } from "react";

import styles from "./SocialFilter.module.css";

import { Image, Video, Link, Pin } from "lucide-react";
import DatePicker from "../../../../components/ui/Inputs/DatePicker/DatePicker";
import { PillSpacer } from "../../../../components/ui/Spacers/PillSpacer/PillSpacer";

const SocialFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    hasImage: false,
    hasVideo: false,
    hasLink: false,
    isPinned: false,
  });

  const toggleFilter = (filter) => {
    const updatedFilters = { ...filters, [filter]: !filters[filter] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterButton} ${filters.hasImage ? styles.active : ""}`}
        onClick={() => toggleFilter("hasImage")}
      >
        <Image size={20} />
        <p>Image</p>
      </button>
      <button
        className={`${styles.filterButton} ${filters.hasVideo ? styles.active : ""}`}
        onClick={() => toggleFilter("hasVideo")}
      >
        <Video size={20} />
        <p>Video</p>
      </button>
      <button
        className={`${styles.filterButton} ${filters.hasLink ? styles.active : ""}`}
        onClick={() => toggleFilter("hasLink")}
      >
        <Link size={20} />
        <p>Link</p>
      </button>
      <button
        className={`${styles.filterButton} ${filters.isPinned ? styles.active : ""}`}
        onClick={() => toggleFilter("isPinned")}
      >
        <Pin size={20} />
        <p>Pinned</p>
      </button>
      <PillSpacer height={15} verticle={true} />
      <DatePicker />
      <PillSpacer height={15} verticle={true} />
      
    </div>
  );
};

export default SocialFilter;

