import Axios from "axios";
import { getToken, url } from "./Validation";

export const VideoSearch = async (query, serverId) => {
    try {

        const token = await getToken();
        
        const videos = await Axios({
            method: "POST",
            url: `${url}/search-for-videos`,
            headers: {TOKEN: token},
            data: {query: query, server_id: serverId}
        }).then(response => {

            if (response.data.error) return {error: true, errorMessage: response.data.errorMessage};

            return response.data;

        })
        .catch(error => {

            return {error: true, errorMessage: error.message}
        
        })
        console.log(videos)
        return videos;

    } catch (error) {
        console.log(error);
        return {error: true, errorMessage: "Fatal Error Searching For Images"}
    }
}