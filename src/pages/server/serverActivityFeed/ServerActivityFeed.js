import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServerActivityFeed, selectActivityFeedByServerId } from "./serverActivityFeedSlice";
import { ChannelCreatedFeedItem, UserJoinedFeedItem } from "./feedItems"; // see below

const FEED_ITEM_COMPONENTS = {
  channel_created: ChannelCreatedFeedItem,
  user_joined: UserJoinedFeedItem,
  // add more mappings as you add more components/types
};

export const ServerActivityFeed = ({ server_id }) => {
  const dispatch = useDispatch();
  // Activity feed for this server
  const { feed, loading, error } = useSelector(state =>
    selectActivityFeedByServerId(state, server_id)
  );
  // User/channel details slices (object keyed by _id)
  const users = useSelector(state => state.usersSlice.users); // { userId: {...} }
  const channels = useSelector(state => state.channelsSlice.channels); // { channelId: {...} }

  useEffect(() => {
    if (server_id) dispatch(fetchServerActivityFeed({ limit: 30 }));
  }, [dispatch, server_id]);

  if (loading) return <div>Loading activity...</div>;
  if (error) return <div>Error loading activity: {error}</div>;
  if (!feed?.length) return <div>No recent activity.</div>;

  return (
    <ul>
      {feed.map(item => {
        const FeedComponent = FEED_ITEM_COMPONENTS[item.type];
        if (!FeedComponent) return null; // fallback for unknown type
        return (
          <FeedComponent
            key={item._id}
            item={item}
            users={users}
            channels={channels}
          />
        );
      })}
    </ul>
  );
};
