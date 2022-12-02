import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ClearButton = ({action, width, height}) => {

    const color = useSelector(selectTextColor)

    return (
        <ButtonAnimationWrapper description={"Clear"} altInvert={true} padding={3} action={action} width={width} height={height} >
            <svg width="43" height="43" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2H18C19.0609 2 20.0783 2.42143 20.8284 3.17157C21.5786 3.92172 22 4.93913 22 6V18C22 19.0609 21.5786 20.0783 20.8284 20.8284C20.0783 21.5786 19.0609 22 18 22H6C4.93913 22 3.92172 21.5786 3.17157 20.8284C2.42143 20.0783 2 19.0609 2 18V6C2 4.93913 2.42143 3.92172 3.17157 3.17157C3.92172 2.42143 4.93913 2 6 2V2ZM6 4C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6ZM13.414 12L16.243 14.828C16.4306 15.0156 16.5361 15.2701 16.5361 15.5355C16.5361 15.8009 16.4306 16.0554 16.243 16.243C16.0554 16.4306 15.8009 16.5361 15.5355 16.5361C15.2701 16.5361 15.0156 16.4306 14.828 16.243L12 13.414L9.172 16.243C8.98436 16.4306 8.72986 16.5361 8.4645 16.5361C8.19914 16.5361 7.94464 16.4306 7.757 16.243C7.56936 16.0554 7.46394 15.8009 7.46394 15.5355C7.46394 15.2701 7.56936 15.0156 7.757 14.828L10.586 12L7.757 9.172C7.56936 8.98436 7.46394 8.72986 7.46394 8.4645C7.46394 8.19914 7.56936 7.94464 7.757 7.757C7.94464 7.56936 8.19914 7.46394 8.4645 7.46394C8.72986 7.46394 8.98436 7.56936 9.172 7.757L12 10.586L14.828 7.757C15.0156 7.56936 15.2701 7.46394 15.5355 7.46394C15.8009 7.46394 16.0554 7.56936 16.243 7.757C16.4306 7.94464 16.5361 8.19914 16.5361 8.4645C16.5361 8.72986 16.4306 8.98436 16.243 9.172L13.414 12Z" fill={color}/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
