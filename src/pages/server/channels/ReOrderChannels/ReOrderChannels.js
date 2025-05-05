import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Category } from "../../../../components/ChannelCategory/ChannelCategory";

import { reorderChannels } from "../../../../features/Channel/Channels/channelsSlice";

import { reorderCategories } from "../../../../features/Categories/categoriesSlice";

import { useSocket } from "../../../../context/SocketContext";

// 🔹 Main Channels Component
export const ReOrderChannels = ({ onDrop }) => {

    const socket = useSocket();

    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channelsSlice.channels);

    const categories = useSelector((state) => state.categoriesSlice.categories);

    const [reordering, toggleReordering] = React.useState(false);

    const [draggingChannel, toggleDraggingChannel] = React.useState(false);

    const [draggingCategory, toggleDraggingCategory] = React.useState(false);

    const [localChannels, setLocalChannels] = React.useState([]);

    React.useEffect(() => {

      setLocalChannels(Object.values(channels).sort((a, b) => a.sort_order - b.sort_order));

    }, [channels])

    const handleReorder = async (id, moveTo, category) => {
        if (reordering) return;
        toggleReordering(true);
      
        let id_array = localChannels
          .map(c => c.channel_id);
      console.log(id, moveTo, category)
        const originatingPos = id_array.indexOf(id);

        const newPos = id_array.indexOf(moveTo);
      
        if (originatingPos === -1) {
          console.warn('Invalid reorder indices:', { id, moveTo });
          toggleReordering(false);
          return;
        }
      
        const element = id_array[originatingPos];
        let move_to_pos = newPos < originatingPos ? newPos + 1 : newPos;
      
        id_array.splice(originatingPos, 1);
        id_array.splice(move_to_pos, 0, element);
      
        try {
          const data = { newOrder: id_array, category, channel_id: id };
          
          const res = await socket.request('reorder channels', data);

          if (res.newOrder) {
            dispatch(reorderChannels(res));
          }
          
        } catch (err) {
          console.error(err);
        }
      
        toggleReordering(false);
    };
      

    const handleReOrderCategories = async (category_id, move_to, below) => {
    
        if (category_id === 'channels') return;

        toggleReordering(true);

        let id_array = categories.map(c => c.category_id);

        const category_pos = id_array.findIndex(c => c === category_id);
        
        if (category_pos === -1) return;

        const newPos = id_array.findIndex(c => c === move_to);

        const move_to_pos = below && newPos < category_pos ? newPos + 1 : newPos;

        const el = id_array[category_pos];

        id_array.splice(category_pos, 1);

        id_array.splice(move_to_pos, 0, el);

        const data = {
            newOrder: id_array
        }
        
        await socket.request('reorder categories', data)
        .then(res => {
            dispatch(reorderCategories(res));
            return;
        })
        .catch(err => {
            console.log(err);
            return;
        })

        toggleReordering(false);

    }
console.log(categories)
    return (
        <>
            {categories.map(category => {
                return <Category 
                move={handleReorder} 
                moveCategory={handleReOrderCategories} 
                draggingCategory={draggingCategory} 
                toggleDraggingCategory={toggleDraggingCategory} 
                category_id={category.category_id} 
                key={category.category_id} 
                catagoryName={category.category_name} 
                channels={localChannels.filter(c => c.category === category.category_id)} 
                draggingChannel={draggingChannel} toggleDraggingChannel={toggleDraggingChannel} 
                category={category}
                />
            })}
            <Category 
            move={handleReorder} 
            moveCategory={() => {}} 
            draggingCategory={draggingCategory} 
            toggleDraggingCategory={() => {}}
            catagoryName={'Channels'}
            category_id={'channels'}
            channels={localChannels.map(c => ({ ...c, category: c.category || 'channels' }))
              .filter(c => c.category === 'channels')}

            draggingChannel={draggingChannel}
            toggleDraggingChannel={toggleDraggingChannel}
            />
        </>
    );
};
