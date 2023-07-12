
export const BuildSystemNotification = (data) => {
    return {message: ` 
      <head>
        <style>
        body {
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
        .notification {
          posistion: absolute;
          bottom: -100%;
          right: 0px;
          animation: fadeInOut 3.1s ease-in-out;
          padding: 5px 5px 5px 5px;
          flex-shrink: 0;
          min-height: 80px;
          transition: 0.1s;
        }
        @keyframes fadeInOut {
          0% {
            transform: translateY(100%);
          }
          10% {
            transform: translateY(0%);
          }
          80% {
              transform: translateY(0%);
          }
          100% {
              transform: translateY(100%);
          }
        }
        </style>
      </head>
    <body>
      <div style="width: 100%; height: 100%; overflow: hidden; display: flex; justify-content: flex-end; align-items: flex-end; position: relative;">
        <div id="system-notification" style="border-radius: 3px; width: 300px; right: 0; display: flex; height: auto; overflow: hidden; background-color: ${data.secondaryColor}; flex-direction: column;" class="notification">
          <div style="display: flex; align-items: center; height: 45px;">  
              <div style='width: 40px; height: 40px; border-radius: ${data.shape === 'square' ? '5px' : '50%'}; overflow: hidden; flex-shrink: 0;' class="image-container">
                  <image style="width: 100%; height: 100%; object-fit: cover;"src="${data.user_image}" />
                </div>    
            <h3 style="margin-top: -15px; font-size: 0.9rem;margin-left: 10px; font-family: sans-serif; color: ${data.textColor}; word-break: keep-all; word-wrap: normal; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${data.display_name}${data.channel_name ? ' / ' + data.channel_name : ""}</h3>
          </div >
          <div style="margin-left: 50px; margin-top: -25px; font-family: sans-serif; color: white; font-size: 12px; overflow: hidden; padding: 0px 5px 10px 0px;">
              ${data?.content?.text ?
              `<p style="margin: 0px; color: ${data.textColor};">${data?.content?.text}</p> `
              : ""}
              ${(data?.content?.link && !data?.content?.image) ?
                `<p style="margin: 0px; color: ${data.textColor};">${data?.content?.link}</p> `
                : ""}
              ${data?.content?.image ?
              ` <div style='width: calc(100% - 10px); height: 100%; max-height: 300px; overflow: hidden; border-radius: 5px; min-height: 60px;' class="image-container">
                  <image style="width: 100%; height: 100%; object-fit: cover;"src=${data.content.image} />
                </div>` : ""
              } 
          </div>
        </div>
      </div>
    </body>
      
      `, 
  
type: data.type}
} 