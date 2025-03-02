import Axios from "axios";
import { getToken, url } from "./Validation";

export const FetchMemberDetails = async (username, server_id, fetch_all_screenshots = false) => {
    try {

        const token = await getToken();

        const member = await Axios({
            method: "GET",
            url: `${url}/fetch-member-details${fetch_all_screenshots ? '?fetchAll=true' : '?fetchAll=false'}`,
            headers: {TOKEN: token, username: username, server_id: server_id},
        }).then(response => {
            return response.data;
        })
        .catch(err => {
            return {error: true, errorMessage: err.message}
        })
        
        return member;

    } catch (error) {
        console.log(error);
        return {error: true, errorMessage: error.message}
    }
}

