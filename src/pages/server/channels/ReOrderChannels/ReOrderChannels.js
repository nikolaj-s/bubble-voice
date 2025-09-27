import React, { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Category } from "../../../../components/ChannelCategory/ChannelCategory";

import { reorderChannels } from "../../../../features/Channel/Channels/channelsSlice";

import { reorderCategories } from "../../../../features/Categories/categoriesSlice";

import { useSocket } from "../../../../context/SocketContext";
import { triggerAlert } from "../../../../features/Alerts/alertsSlice";
import { NoChannelsPlaceholder } from "../../../../components/Placeholders/NoChannelsPlaceholder/NoChannelsPlaceholder";
import { usePermissions } from "../../../../hooks/usePermissions";

// 🔹 Main Channels Component
export const ReOrderChannels = ({ onDrop }) => {

    const socket = useSocket();

    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channelsSlice.channels);

    const categories = useSelector((state) => state.categoriesSlice.categories);

    const permission = usePermissions();

    const {_id: user_id} = useSelector(state => state.accountSlice.account);

    const [reordering, toggleReordering] = React.useState(false);

    const [draggingChannel, toggleDraggingChannel] = React.useState(false);

    const [draggingCategory, toggleDraggingCategory] = React.useState(false);

    const [localChannels, setLocalChannels] = React.useState([]);

    React.useEffect(() => {

      setLocalChannels(Object.values(channels).sort((a, b) => a.sort_order - b.sort_order));

    }, [channels])

    const channelsByCategory = useMemo(() => {

      if (localChannels.length === 0) return;

      const map = new Map();
      // seed real categories
      categories.forEach(cat => map.set(cat.category_id, []));
      // seed uncategorized
      map.set('channels', []);

      localChannels.forEach(c => {
        const bucket = c.category || 'channels';
     
        const ok =
          !c?.locked_channel ||
          permission?.user_can_manage_channels ||
          c?.authorized_users?.[user_id] ||
          c?.active_users?.includes(user_id);

        if (ok) {
          // only push if that bucket exists
          if (!map.has(bucket)) map.set(bucket, []);
          map.get(bucket).push(c);
        }
      });

    return map;
    }, [categories, localChannels, permission, user_id]);

    // 3) unified category list (real + uncategorized)
    const allCategories = useMemo(
      () => [
        ...categories,
        { category_id: 'channels', category_name: 'Channels', auto_sort: false }
      ],
      [categories]
    );

    const handleReorder = async (id, moveTo, category) => {
        if (reordering) return;
        toggleReordering(true);
      
        let id_array = localChannels
          .map(c => c.channel_id);
    
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
          dispatch(triggerAlert(err, 'error'))
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
            dispatch(triggerAlert(err, 'error'))
            return;
        })

        toggleReordering(false);

    }

    if (localChannels.length === 0) return <NoChannelsPlaceholder />

     return (
      <>
        {allCategories.map(cat => (
          <Category
            key={cat.category_id}
            move={handleReorder}
            moveCategory={handleReOrderCategories}
            draggingCategory={draggingCategory}
            toggleDraggingCategory={toggleDraggingCategory}
            category_id={cat.category_id}
            catagoryName={cat.category_name}
            autoSort={cat.auto_sort}
            channels={channelsByCategory.get(cat.category_id) || []}
            draggingChannel={draggingChannel}
            toggleDraggingChannel={toggleDraggingChannel}
            category={cat}
          />
        ))}
      </>
    );
};
