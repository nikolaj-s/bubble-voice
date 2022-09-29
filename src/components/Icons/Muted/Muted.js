import React from 'react'
import { useSelector } from 'react-redux'

import {selectTextColor} from "../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice";

export const Muted = () => {

  const color = useSelector(selectTextColor);

  return (
    <div className='extra-media-icon'>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.60447 2.8489L4.08447 5.33334H1.7778C1.54206 5.33334 1.31596 5.42699 1.14927 5.59369C0.982567 5.76039 0.888916 5.98648 0.888916 6.22223V9.77778C0.888916 10.0135 0.982567 10.2396 1.14927 10.4063C1.31596 10.573 1.54206 10.6667 1.7778 10.6667H4.06225L7.35558 13.9867C7.44204 14.0667 7.54353 14.1287 7.65416 14.1691C7.76479 14.2096 7.88236 14.2276 8.00003 14.2222C8.11589 14.2222 8.23063 14.1996 8.33781 14.1556C8.50083 14.0886 8.64027 13.9747 8.7384 13.8283C8.83653 13.6819 8.88892 13.5096 8.88892 13.3333V10.12L11.5067 12.7378C11.3956 12.8045 11.2889 12.8667 11.1734 12.9245C11.0679 12.9775 10.9878 13.0703 10.9507 13.1824C10.9136 13.2945 10.9225 13.4167 10.9756 13.5222C11.0286 13.6277 11.1214 13.7078 11.2335 13.7449C11.3456 13.782 11.4679 13.7731 11.5734 13.72C11.7731 13.6192 11.9675 13.5079 12.1556 13.3867L13.1689 14.4L13.7778 13.7778L2.22225 2.22223L1.60447 2.8489ZM8.00003 13.3333L4.56447 9.88001C4.47642 9.80649 4.36335 9.76986 4.24892 9.77778H1.7778V6.22223H4.28447C4.34327 6.22198 4.40144 6.21007 4.45561 6.18719C4.50978 6.1643 4.55887 6.13089 4.60003 6.0889L4.71558 5.97334L8.00003 9.2489V13.3333Z" fill={color}/>
        <path d="M11.0623 2.97335C11.8369 3.33516 12.517 3.87197 13.0487 4.54146C13.5805 5.21094 13.9495 5.9948 14.1266 6.83123C14.3037 7.66766 14.2841 8.5338 14.0693 9.36136C13.8546 10.1889 13.4505 10.9553 12.889 11.6L13.5201 12.2311C14.183 11.4856 14.6626 10.5956 14.9209 9.63198C15.1792 8.66837 15.209 7.65778 15.0078 6.68064C14.8067 5.70351 14.3803 4.78682 13.7624 4.00355C13.1446 3.22028 12.3524 2.59206 11.449 2.16891C11.3962 2.14158 11.3385 2.1251 11.2793 2.12045C11.2201 2.11579 11.1605 2.12306 11.1042 2.14182C11.0478 2.16057 10.9958 2.19044 10.9511 2.22966C10.9065 2.26887 10.8702 2.31663 10.8443 2.37012C10.8185 2.4236 10.8036 2.48173 10.8006 2.54106C10.7976 2.60039 10.8065 2.65972 10.8269 2.71554C10.8472 2.77137 10.8785 2.82255 10.9189 2.86607C10.9594 2.90959 11.0081 2.94456 11.0623 2.96891V2.97335Z" fill={color}/>
        <path d="M10.0843 5.60889C10.5026 5.85297 10.8501 6.20186 11.0925 6.62116C11.3349 7.04046 11.4638 7.51569 11.4666 8C11.4666 8.59486 11.2731 9.17358 10.9154 9.64889L11.5554 10.28C12.0752 9.63397 12.3576 8.82916 12.3554 8C12.3525 7.36034 12.183 6.73247 11.8634 6.17833C11.5439 5.6242 11.0854 5.16292 10.5332 4.84C10.4826 4.80784 10.4261 4.78625 10.3669 4.77652C10.3078 4.76679 10.2473 4.76913 10.189 4.78339C10.1308 4.79765 10.0761 4.82354 10.0281 4.8595C9.98018 4.89547 9.94 4.94076 9.91 4.99265C9.88 5.04455 9.86081 5.10198 9.85358 5.16148C9.84636 5.22099 9.85124 5.28134 9.86794 5.33891C9.88464 5.39647 9.91282 5.45007 9.95077 5.49647C9.98872 5.54286 10.0357 5.58111 10.0888 5.60889H10.0843Z" fill={color}/>
        <path d="M7.99992 2.66664V6.7333L8.88881 7.62219V2.66664C8.88895 2.49046 8.83673 2.31822 8.73879 2.17177C8.64085 2.02533 8.5016 1.91129 8.33873 1.84414C8.17585 1.77699 7.99669 1.75975 7.824 1.79462C7.65131 1.82949 7.49287 1.91489 7.36881 2.03997L5.33325 4.07553L5.95992 4.70219L7.99992 2.66664Z" fill={color}/>
        </svg>
    </div>
  )
}
