import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Channels.module.css";
import ChannelButton from "../../../../components/Buttons/ChannelButton/ChannelButton";
import { Category } from "../../../../components/ChannelCategory/ChannelCategory";
import { reOrderCategories, reOrderChannels } from "../../../../features/Channels/channelsSlice";


// 🔹 Main Channels Component
export const ReOrderChannels = ({ onDrop }) => {

    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channelsSlice.channels);

    const categories = useSelector((state) => state.channelsSlice.categories);

    const [reordering, toggleReordering] = React.useState(false);

    const [draggingChannel, toggleDraggingChannel] = React.useState(false);

    const [draggingCategory, toggleDraggingCategory] = React.useState(false);

    const [localChannels, setLocalChannels] = React.useState([]);

    React.useEffect(() => {
        setLocalChannels(channels);
    }, [channels])

    const handleReorder = async (id, moveTo, category) => {

        if (reordering) return;

        toggleReordering(true);

        let id_array = localChannels.map(c => c.channel_id)

        const originatingPos = id_array.findIndex(c => c === id);

        const newPos = id_array.findIndex(c => c === moveTo);
        
        const element = id_array[originatingPos];

        let move_to_pos = newPos < originatingPos ? newPos + 1 : newPos;

        id_array.splice(originatingPos, 1);

        id_array.splice(move_to_pos, 0, element);
        
        dispatch(reOrderChannels({newOrder: id_array, category: category, channel_id: id}));
       
        toggleReordering(false);
    
    }

    const handleReOrderCategories = async (category_id, move_to, below) => {
    
        console.log(category_id)

        let id_array = categories.map(c => c.category_id);

        const category_pos = id_array.findIndex(c => c === category_id);
        
        if (category_pos === -1) return;

        const newPos = id_array.findIndex(c => c === move_to);

        const move_to_pos = below && newPos < category_pos ? newPos + 1 : newPos;

        const el = id_array[category_pos];

        id_array.splice(category_pos, 1);

        id_array.splice(move_to_pos, 0, el);

        console.log(id_array)
        
        dispatch(reOrderCategories({newOrder: id_array}));

    }

    return (
        <>
            {categories.map(category => {
                return <Category move={handleReorder} moveCategory={handleReOrderCategories} draggingCategory={draggingCategory} toggleDraggingCategory={toggleDraggingCategory} category_id={category.category_id} key={category.category_id} catagoryName={category.category_name} channels={localChannels.filter(c => c.category === category.category_id)} draggingChannel={draggingChannel} toggleDraggingChannel={toggleDraggingChannel} />
            })}
        </>
    );
};