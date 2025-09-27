import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/SocketContext";
import React from 'react';
import { updateVoiceActivation } from "../../features/ServerUsers/serverUsersSlice";
import ConnectingIndicator from "../../components/Indicators/ConnectingIndicator/ConnectingIndicator";
import ErrorIndicator from "../../components/Indicators/ErrorIndicator/ErrorIndicator";
import { isValidObjectId } from "../../lib/services/helperFunctions";
import { setCurrentVoiceChannel } from "../../features/Channel/VoiceChannel/voiceChannelSlice";

export const VoiceChannelProvider = ({ channel, children }) => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const [loading, toggleLoading] = React.useState(true);
  const [error, toggleError] = React.useState(false);

  const channelsStatus = useSelector(state => state.channelsSlice.status);
  const { server_id } = useSelector(state => state.serverDetailsSlice);

  React.useEffect(() => {
    if (!socket || !channel || !server_id || channelsStatus !== 'complete') return;

    let debounceTimeout;

    const handleJoinChannel = async () => {
      toggleLoading(true);

      try {
        await socket.request('join channel', { channel_id: channel, server_id });
        toggleError(false);
      } catch (err) {
        toggleError(err);
      }

      toggleLoading(false);
    };

    const handleVoiceActivation = (data) => {
      if (data.user_id) {
        dispatch(updateVoiceActivation(data));
      }
    };

    const handleMoveChannel = (data) => {
      if (isValidObjectId(data.channel_id)) {
        dispatch(setCurrentVoiceChannel(data.channel_id));
      }
    }

    socket.on('move to channel', handleMoveChannel);

    socket.on('voice activation', handleVoiceActivation);

    socket.on('connect', handleJoinChannel);

    // Debounce join
    debounceTimeout = setTimeout(() => {
      handleJoinChannel();
    }, 250); // 250ms debounce window

    return () => {
      socket.emit('leave channel');

      socket.off('connect', handleJoinChannel);

      socket.off('voice activation', handleVoiceActivation);

      socket.off('move to channel', handleMoveChannel);

      clearTimeout(debounceTimeout);
    };

  }, [socket, channel, dispatch, channelsStatus, server_id]);

  if (loading || channelsStatus !== 'complete') return <ConnectingIndicator />;
  if (error) return <ErrorIndicator message={error} />;

  return <>{children}</>;
};
