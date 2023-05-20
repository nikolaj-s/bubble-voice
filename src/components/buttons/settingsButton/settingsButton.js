
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'


export const SettingsButton = ({flip_desc, id, action, margin, width = 25, height = 25, desc_space, padding, description = 'Settings', transparent}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper
        transparent={transparent}
        id={id}
        flip_description={flip_desc}
        action={action}
        width={width}
        height={height}
        padding={padding}
        desc_space={desc_space}
        description={description}
        zIndex={5}
        borderRadius={5}
        margin={margin}
        altInvert={true}
        >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.1875 26.1875V23.7968L45.1875 21.1718C45.7405 20.6844 46.1034 20.0172 46.212 19.2881C46.3207 18.559 46.1681 17.8149 45.7812 17.1875L42.0937 10.9375C41.8197 10.4629 41.4257 10.0687 40.9513 9.79444C40.4768 9.52019 39.9386 9.37553 39.3906 9.37496C39.051 9.37236 38.7132 9.42514 38.3906 9.53121L34.5937 10.8125C33.9382 10.3769 33.2544 9.98536 32.5468 9.64059L31.75 5.70309C31.6071 4.98372 31.2157 4.33753 30.6444 3.87762C30.0731 3.41772 29.3583 3.17341 28.625 3.18746H21.3125C20.5792 3.17341 19.8643 3.41772 19.293 3.87762C18.7217 4.33753 18.3304 4.98372 18.1875 5.70309L17.3906 9.64059C16.678 9.98528 15.989 10.3768 15.3281 10.8125L11.6093 9.46871C11.2832 9.38375 10.9456 9.35209 10.6093 9.37496C10.0613 9.37553 9.52311 9.52019 9.04866 9.79444C8.57421 10.0687 8.18022 10.4629 7.90622 10.9375L4.21872 17.1875C3.85401 17.814 3.71849 18.5479 3.83536 19.2633C3.95223 19.9788 4.31422 20.6314 4.85934 21.1093L7.81247 23.8125V26.2031L4.85934 28.8281C4.29882 29.3093 3.92693 29.9736 3.80965 30.703C3.69238 31.4324 3.8373 32.1798 4.21872 32.8125L7.90622 39.0625C8.18022 39.5371 8.57421 39.9312 9.04866 40.2055C9.52311 40.4797 10.0613 40.6244 10.6093 40.625C10.949 40.6276 11.2867 40.5748 11.6093 40.4687L15.4062 39.1875C16.0617 39.6231 16.7456 40.0146 17.4531 40.3593L18.25 44.2968C18.3929 45.0162 18.7842 45.6624 19.3555 46.1223C19.9268 46.5822 20.6417 46.8265 21.375 46.8125H28.75C29.4833 46.8265 30.1981 46.5822 30.7694 46.1223C31.3407 45.6624 31.7321 45.0162 31.875 44.2968L32.6718 40.3593C33.3844 40.0147 34.0735 39.6232 34.7343 39.1875L38.5156 40.4687C38.8382 40.5748 39.176 40.6276 39.5156 40.625C40.0636 40.6244 40.6018 40.4797 41.0763 40.2055C41.5507 39.9312 41.9447 39.5371 42.2187 39.0625L45.7812 32.8125C46.1459 32.1859 46.2814 31.4521 46.1646 30.7366C46.0477 30.0211 45.6857 29.3685 45.1406 28.8906L42.1875 26.1875ZM39.3906 37.5L34.0312 35.6875C32.7766 36.7501 31.3428 37.5808 29.7968 38.1406L28.6875 43.75H21.3125L20.2031 38.2031C18.6694 37.6274 17.2433 36.7982 15.9843 35.75L10.6093 37.5L6.92184 31.25L11.1718 27.5C10.8829 25.8826 10.8829 24.2267 11.1718 22.6093L6.92184 18.75L10.6093 12.5L15.9687 14.3125C17.2233 13.2498 18.6572 12.4191 20.2031 11.8593L21.3125 6.24996H28.6875L29.7968 11.7968C31.3306 12.3725 32.7567 13.2017 34.0156 14.25L39.3906 12.5L43.0781 18.75L38.8281 22.5C39.117 24.1174 39.117 25.7732 38.8281 27.3906L43.0781 31.25L39.3906 37.5Z" fill={color}/>
            <path d="M25 34.375C23.1458 34.375 21.3332 33.8252 19.7915 32.795C18.2498 31.7649 17.0482 30.3007 16.3386 28.5877C15.6291 26.8746 15.4434 24.9896 15.8051 23.171C16.1669 21.3525 17.0598 19.682 18.3709 18.3709C19.682 17.0598 21.3525 16.1669 23.171 15.8051C24.9896 15.4434 26.8746 15.6291 28.5877 16.3386C30.3007 17.0482 31.7649 18.2498 32.795 19.7915C33.8252 21.3332 34.375 23.1458 34.375 25C34.3875 26.2346 34.1536 27.4594 33.6869 28.6024C33.2202 29.7455 32.5301 30.784 31.6571 31.6571C30.784 32.5301 29.7455 33.2202 28.6024 33.6869C27.4594 34.1536 26.2346 34.3875 25 34.375V34.375ZM25 18.75C24.174 18.7308 23.3526 18.8793 22.5857 19.1866C21.8187 19.4938 21.122 19.9535 20.5377 20.5377C19.9535 21.122 19.4938 21.8187 19.1866 22.5857C18.8793 23.3526 18.7308 24.174 18.75 25C18.7308 25.826 18.8793 26.6474 19.1866 27.4144C19.4938 28.1813 19.9535 28.878 20.5377 29.4623C21.122 30.0465 21.8187 30.5062 22.5857 30.8135C23.3526 31.1207 24.174 31.2692 25 31.25C25.826 31.2692 26.6474 31.1207 27.4144 30.8135C28.1813 30.5062 28.878 30.0465 29.4623 29.4623C30.0465 28.878 30.5062 28.1813 30.8135 27.4144C31.1207 26.6474 31.2692 25.826 31.25 25C31.2692 24.174 31.1207 23.3526 30.8135 22.5857C30.5062 21.8187 30.0465 21.122 29.4623 20.5377C28.878 19.9535 28.1813 19.4938 27.4144 19.1866C26.6474 18.8793 25.826 18.7308 25 18.75Z" fill={color}/>
            </svg>
        </ButtonAnimationWrapper>
    )
}