export const ConvertTime = (date) => {
    try {

        const hours = date.getHours();

        const minutes = date.getMinutes();

        const time = `${hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}:${minutes < 10 ? "0" + minutes : minutes} ${hours >= 12 ? "PM" : "AM"}`

        return time;
    } catch (err) {
        return "";
    }
}