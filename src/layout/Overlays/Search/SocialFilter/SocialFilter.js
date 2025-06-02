
import styles from "./SocialFilter.module.css";

import { Image, Video, Link, Pin, Hash } from "lucide-react";
import DatePicker from "../../../../components/ui/Inputs/DatePicker/DatePicker";
import { PillSpacer } from "../../../../components/ui/Spacers/PillSpacer/PillSpacer";
import { useDispatch, useSelector } from "react-redux";
import { setFromDate, setSelectedChannelToFilter, setTextChannelFilter } from "../../../../features/Search/searchSlice";
import Dropdown from "../../../../components/ui/Inputs/DropDown/DropDown";
import { InlineLabel } from "../../../../components/ui/Titles/InlineLabel/InlineLabel";

const SocialFilter = ({ onFilterChange = () => {} }) => {

  const dispatch = useDispatch();

  const selectedChannel = useSelector((state) => state.searchSlice.selectedChannel);

  const channels = useSelector((state) => {
    const {channels} = state.channelsSlice;

    return [{channel_name: "All", channel_id: "*"}, ...Object.values(channels).filter(channel => channel.channel_type === 'text')];
  })

  const filters = useSelector((state) => state.searchSlice);

  const toggleFilter = (filter) => {
    const updatedFilters = { ...filters, [filter]: !filters[filter] };

    dispatch(setTextChannelFilter(updatedFilters));

    onFilterChange(updatedFilters);
  };

  const handleSetChannel = (value) => {
    dispatch(setSelectedChannelToFilter(value));

    onFilterChange();
  }

  const onDateChange = (value) => {
    dispatch(setFromDate(value));

    onFilterChange();
  }

  return (
    <div className={styles.filterContainer}>
      <InlineLabel title={"Has / Is"} />
      <button
        className={`${styles.filterButton} ${filters.hasImage ? styles.active : ""}`}
        onClick={() => toggleFilter("hasImage")}
      >
        Image
      </button>
      <button
        className={`${styles.filterButton} ${filters.hasVideo ? styles.active : ""}`}
        onClick={() => toggleFilter("hasVideo")}
      >
        Video
      </button>
      <button
        className={`${styles.filterButton} ${filters.hasLink ? styles.active : ""}`}
        onClick={() => toggleFilter("hasLink")}
      >
        Link
      </button>
      <button
        className={`${styles.filterButton} ${filters.isPinned ? styles.active : ""}`}
        onClick={() => toggleFilter("isPinned")}
      >
       Pinned
      </button>
      <PillSpacer height={15} verticle={true} />
      <InlineLabel title={'From'} />
      <DatePicker onDateChange={onDateChange} />
      <PillSpacer height={15} verticle={true} />
      <InlineLabel icon={ <Hash color="var(--text-color)" size={20} />} />
      <Dropdown selector="channel_name" options={channels} selected={selectedChannel} setSelected={handleSetChannel} />
    </div>
  );
};

export default SocialFilter;

