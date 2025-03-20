

export const getOptions = (e, useSelector, dispatch, navigate, serverID) => {
    try {

        const options = [];

        const path = e.composedPath();

        const data = {}

        for (const el of path) {
            try {
                if (el?.getAttribute('data-context')) {
                   const json = JSON.parse(el.getAttribute('data-context'));

                   data[json.type] = json;
                }
            } catch (error) {
                continue;
            }
        }

        if (data.channel) {

            const channel = data.channel;

            const root = `/dashboard/server/${channel.server_id}`;

            if (channel.channel_type === 'voice') {
                
                if (channel.active) {
                    options.push({label: "Leave Channel", action: () => {navigate(root)}, type: 'button'});
                } else {
                    options.push({label: "Join Channel", action: () => {navigate(`${root}/channel/${channel.channel_id}`)}, type: "button"})
            
                }
                
            } else {
                
                options.push({label: "Open Channel", action: () => {navigate(`${root}/channel/${channel.channel_id}`)}, type: "button"})
            
            }

            options.push({label: "Edit Channel", action: () => {}, type: "button"});

        }

        return options;
    
    } catch (error) {
        console.log(error);
        return [];
    }
}