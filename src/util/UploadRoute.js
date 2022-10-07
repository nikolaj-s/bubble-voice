

import Axios from 'axios';
import { getToken, url } from './Validation';


export const uploadImage = async (file) => {
    try {

        if (!file || !file.type) return {error: true, errorMessage: "upload image cannot be called with an empty argument"}

        const token = await getToken();

        if (token) {

            const data = new FormData();

            data.append("image", file);

            const image = await Axios({
                method: "POST",
                url: `${url}/upload-image`,
                headers: {"TOKEN": token},
                data
            }).then(response => {

                return response.data.image;

            }).catch(error => {

                return {error: true, errorMessage: error};

            })

            return image;
        
        } else {
            return {error: true, errorMessage: "validation error"}
        }

    } catch (error) {
        console.log(error);
        return {error: true, errorMessage: error}
    }
}