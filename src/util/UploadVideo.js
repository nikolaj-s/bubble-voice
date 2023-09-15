import Axios from "axios";

export const UploadVideo = async (file) => {
    try {

        let formData = new FormData();

        formData.append('file', file);

        const server = await Axios({
            method: "GET",
            url: "https://api.gofile.io/getServer"
        }).then(res => {
            if (res.data.status === 'ok') {
                return res.data.data.server;
            } else {
                return {error: 'no available upload server'};
            }
        }).catch(err => {
            console.log(err);
            return {error: 'no available upload server', details: err}
        })
        console.log(server)
        if (server.error) return server;

        const video = await Axios({
            method: "POST",
            url: `https://${server}.gofile.io/uploadFile`,
            data: formData
        }).then(res => {return res.data})
        .catch(error => {
            console.log(error);
            return {error: "error uploading video", details: error}
        })

        const link = `https://${server}.gofile.io/download/${video.data.fileId}/${video.data.fileName}`

        return {...video, link: link};

    } catch (error) {
        console.log(error);
        return {error: 'error uploading video'}
    }
}
