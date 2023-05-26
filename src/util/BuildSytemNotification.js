
export const BuildSystemNotification = (data) => {
    return ` 
  <div style="width: 100%; height: 98vh; overflow: hidden; display: flex; justify-content: flex-end; align-items: flex-end;">
  <div style="border-radius: 8px; width: 300px; right: 0; display: flex; height: auto; padding: 5px; overflow: hidden; background-color: ${data.secondaryColor}; flex-direction: column; padding-bottom: 10px;" class="notification">
  <div style="display: flex; align-items: center; height: 45px;">  
      <div style='width: 40px; height: 40px; border-radius: ${data.shape === 'square' ? '5px' : '50%'}; overflow: hidden; flex-shrink: 0;' class="image-container">
          <image style="width: 100%; height: 100%; object-fit: cover;"src="${data.user_image}" />
        </div>    
    <h3 style="margin-left: 10px; font-family: sans-serif; color: ${data.textColor}; word-break: keep-all; word-wrap: normal; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${data.display_name}${data.channel_name ? ' / ' + data.channel_name : ""}</h3>
  </div >
    <div style="margin-left: 50px; margin-top: 0px; font-family: sans-serif; color: white; font-size: 14px; overflow: hidden;">
      ${data?.content?.text ?
      `<p style="margin: 0px; color: ${data.textColor};">${data?.content?.text}</p> `
      : ""}
      ${(data?.content?.link && !data?.content?.image) ?
        `<p style="margin: 0px; color: ${data.textColor};">${data?.content?.link}</p> `
        : ""}
      ${data?.content?.image ?
      `<div style='width: 100%; height: 100%; max-height: 300px; overflow: hidden; border-radius: 5px; min-height: 60px;' class="image-container">
          <image style="width: 100%; height: 100%; object-fit: cover;"src=${data.content.image} />
      </div>` : ""} 
    </div>
    </div>
</div>`
} 