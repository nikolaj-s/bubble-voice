
import Axios from "axios";
import { getToken, url } from "./Validation";

export const ImageSearch = async (query, serverId, format, source) => {
    try {

        const token = await getToken();
        
        const images = await Axios({
            method: "POST",
            url: `${url}/search-for-images`,
            headers: {TOKEN: token},
            data: {query: query, server_id: serverId, format: format, source: source}
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
