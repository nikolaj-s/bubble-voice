

export const GetTimeDifference = (time) => {

    if (!time) return "";

    let data = Math.floor(((Date.now() - time) / 1000) / 60);

    let time_stamp = "";

    if (data <= 1) {
        time_stamp = "Less Than A Minute Ago";
    } else if (data > 1 && data < 60) {
        time_stamp = data + " Minutes Ago";
    } else if (data >= 60 && data < 120) {
        time_stamp = "An Hour Ago";
    } else if (data >= 120 && data < 1440) {
        time_stamp = Math.floor(data / 60) + " Hours Ago";
    } else if (data >= 1440 && data < 2880) {
        time_stamp = "A Day Ago"
    } else if (data >= 2880) {
        time_stamp = Math.floor(data / 1440) + " Days Ago"
    }

    return time_stamp;

}