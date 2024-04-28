
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
        <div id="system-notification" style="border-radius: 3px; width: 300px; right: 0; display: flex; height: auto; overflow: hidden; background-color: ${data.secondaryColor}; flex-direction: column; border-left: solid 4px ${data.user_color};" class="notification">
          <div style="display: flex; align-items: center; height: 45px;">  
              <div style='width: 40px; height: 40px; border-radius: ${data.shape === 'square' ? '5px' : '50%'}; overflow: hidden; flex-shrink: 0;' class="image-container">
                  <image style="width: 100%; height: 100%; object-fit: cover;"src="${data.user_image}" />
                </div>    
            <h3 style="margin-top: -15px; font-size: 0.9rem;margin-left: 10px; font-family: sans-serif; color: ${data.textColor}; word-break: keep-all; word-wrap: normal; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${data.display_name}${data.channel_name ? ' / ' + data.channel_name : ""}</h3>
          </div >
          <div style="margin-left: 50px; margin-top: -25px; font-family: sans-serif; color: white; font-size: 12px; overflow: hidden; padding: 0px 5px 10px 0px;">
              ${data?.content?.text ?
              `<p style="margin: 0px; color: ${(data?.content?.textStyle?.color || data.textColor)}; font-size: ${data?.content?.textStyle?.fontSize}; text-decoration: ${data?.content?.textStyle?.textDecoration ? 'underline' : null}; font-weight: ${data?.content?.textStyle?.bold ? 600 : null};">${data?.content?.text}</p> `
              : ""}
              ${data?.content?.emoji ?
              `<h2 style="margin: 0px; font-size: 3rem;">
                ${data?.content?.emoji}
              </h2>`
              : ""}
              ${(data?.content?.link && !data?.content?.image && !data?.content?.video) ?
                `<p style="margin: 0px 0px 0px 0px; color: rgb(66, 176, 176); text-decoration: underline; font-size: 12px; word-break: break-all;">${data?.content?.link}</p> `
                : ""}
              ${data?.content?.image ?
              ` <div style='position: relative; display: inline-block; width: calc(100% - 10px); height: 100%; max-height: 300px; overflow: hidden; border-radius: 10px; min-height: 60px;' class="image-container">
                  ${data?.nsfw && !data?.disableNsfwBlur ? 
                  `<div style='position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 2; background-color: ${data?.glassColor}; backdrop-filter: blur(20px); display: flex; justify-content: center; align-items: center; overflow: hidden; border-radius: 10px;'>
                    <h3 style='color: ${data?.textColor};'>NSFW</h3>
                  </div>` : ""}
                  <image style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"src=${data.content.image} />
                </div>` : ""
              } 
              ${data?.content?.video ?
                ` <div style='width: calc(100% - 10px); height: 100%; max-height: 300px; overflow: hidden; border-radius: 10px; min-height: 60px;' class="image-container">
                <video controls="false" autoplay style="width: 100%; height: 100%; object-fit: cover;"src=${data.content.video} />
              </div>`
              : ""}
          </div>
        </div>
      </div>
    </body>
      
      `, 
  
type: data.type}
} 