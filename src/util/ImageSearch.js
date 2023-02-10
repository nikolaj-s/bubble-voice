
import Axios from "axios";
import { getToken, url } from "./Validation";

export const ImageSearch = async (query, serverId) => {
    try {

        const token = await getToken();
        console.log(serverId)
        const images = await Axios({
            method: "POST",
            url: `${url}/search-for-images`,
            headers: {TOKEN: token},
            data: {query: query, server_id: serverId}
        }).then(response => {

            if (response.data.error) return {error: true, errorMessage: response.data.errorMessage};

            return response.data;

        })
        .catch(error => {

            return {error: true, errorMessage: error.message}
        
        })

        return images;

    } catch (error) {
        console.log(error);
        return {error: true, errorMessage: "Fatal Error Searching For Images"}
    }
}
