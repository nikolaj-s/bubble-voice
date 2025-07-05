
import styles from "./SocialFilter.module.css";

import { Hash } from "lucide-react";
import DatePicker from "../../../../components/ui/Inputs/DatePicker/DatePicker";
import { PillSpacer } from "../../../../components/ui/Spacers/PillSpacer/PillSpacer";
import { useDispatch, useSelector } from "react-redux";
import { setFromDate, setSelectedChannelToFilter, setTextChannelFilter } from "../../../../features/Search/searchSlice";
import Dropdown from "../../../../components/ui/Inputs/DropDown/DropDown";
import { InlineLabel } from "../../../../components/ui/Titles/InlineLabel/InlineLabel";
import { useEffect, useState } from "react";
import { InlineToggleGroup } from "../../../../components/ui/InlineToggleGroup/InlineToggleGroup";

const SocialFilter = ({ onFilterChange = () => {} }) => {

  const dispatch = useDispatch();

  const selectedChannel = useSelector((state) => state.searchSlice.selectedChannel);

  const [textChannels, setTextChannels] = useState([]);

  const channels = useSelector((state) => state.channelsSlice.channels);

  const filters = useSelector((state) => state.searchSlice);

  useEffect(() => {

    setTextChannels([{channel_name: "All", channel_id: "*"}, ...Object.values(channels).filter(channel => channel.channel_type === 'text')]);

  }, [channels])

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
      <InlineToggleGroup toggles={{hasImage: {value: filters.hasImage, label: 'Image'}, hasVideo: {value: filters.hasVideo, label: "Video"}, isPinned: {value: filters.isPinned, label: 'Pinned'}, hasLink: {value: filters.hasLink, label: "Link"}}} onToggle={toggleFilter} />
      <PillSpacer height={15} verticle={true} />
      <InlineLabel title={'From'} />
      <DatePicker onDateChange={onDateChange} />
      <PillSpacer height={15} verticle={true} />
      <InlineLabel icon={ <Hash color="var(--text-color)" size={20} />} />
      <Dropdown selector="channel_name" options={textChannels} selected={selectedChannel} setSelected={handleSetChannel} />
    </div>
  );
};

export default SocialFilter;

