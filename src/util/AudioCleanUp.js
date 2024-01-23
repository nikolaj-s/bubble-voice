import { audioMap } from "./AudioAmplifier"

export const AudioCleanUp = (consumer_id) => {
    try {

        console.log('cleaning up audio');

        let audio_to_clean_up = audioMap.get(consumer_id);

        if (audio_to_clean_up) {

            audio_to_clean_up.gain.disconnect();

            audio_to_clean_up.source.disconnect();

            audioMap.delete(consumer_id);

        }

        return;

    } catch (error) {
        console.log("Error cleaning up audio")
        return;
    }
        
}