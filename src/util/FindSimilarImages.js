import { getToken, url } from "./Validation"

import Axios from "axios";

export const FindSimilarImages = async (image) => {
    try {

        const token = await getToken();

        const images = await Axios({
            method: "POST",
            url: `${url}/find-similar-images`,
            headers: {TOKEN: token},
            data: {source: image}
        }).then(res => {
            if (res.data.error) return {error: true, errorMessage: res.data.errorMessage}
            
            return res.data;
        })
        console.log(images)
        return images;

    } catch (error) {
        return {error: true, errorMessage: "fatal error finding similar images"}
    }
}