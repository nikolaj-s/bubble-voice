
import { useDispatch } from 'react-redux';
import { pushNotificationOverlay, removeNotificationOverlay } from '../features/Notifications/notificationsSlice';

export const useNotify = () => {

    const dispatch = useDispatch();

    const notify = (message) => {

        if (message) {

            const id = Date.now();

            dispatch(pushNotificationOverlay({id, ...message}));

            setTimeout(() => {

                dispatch(removeNotificationOverlay(id));

            }, 5000)

        }

    }

    const handleMediaPlayerNotification = (data, type) => {
        const prefix = "🎧 [Media Player]";

        const messageTemplates = {
            'play/pause': data.playing
            ? [
                `${prefix} Playback resumed! Let's vibe 🎶`,
                `${prefix} Hit play — we're back on track!`,
                `${prefix} The music lives again!`
                ]
            : [
                `${prefix} Paused... catch your breath ⏸️`,
                `${prefix} Music’s on hold. Sit tight.`,
                `${prefix} Playback paused. Silence for now.`
                ],

            'newMedia': [
            `${prefix} "${data?.media?.title}" just dropped into the queue!`,
            `${prefix} Added a new banger: "${data?.media?.title}"`,
            `${prefix} Incoming track: "${data?.media?.title}" 🎵`
            ],

            'skippedMedia': [
            `${prefix} Skipped to the next one 🔁`,
            `${prefix} That one didn’t hit. Next!`,
            `${prefix} Onward to the next track!`
            ],

            'removedMedia': [
            `${prefix} Removed "${data?.title}" from the queue 🗑️`,
            `${prefix} Booted "${data?.title}" — wasn’t the vibe.`,
            `${prefix} Took "${data?.title}" out of rotation.`
            ],
            'nowPlaying': [
            `${prefix} Now playing: "${data?.title}" 🎧`,
            `${prefix} Serving up: "${data?.title}" — enjoy the ride!`,
            `${prefix} You’re listening to: "${data?.title}" 🔊`,
            `${prefix} Spinning now: "${data?.title}" 🔥`,
            `${prefix} Let’s go! "${data?.title}" just hit the stage 🎶`
            ],
            'reorderedMedia': [
            `${prefix} Queue’s been shuffled 🔀`,
            `${prefix} Someone rearranged the tracks!`,
            `${prefix} Reordered the lineup. Fresh flow!`
            ]
        };

        const templates = messageTemplates[type];
        if (!templates) return;

        const text = templates[Math.floor(Math.random() * templates.length)];

        notify({
            text,
            _id: data.user,
            user_id: data.user,
            type: 'message'
        });
    };


    return {notify, handleMediaPlayerNotification};
}
