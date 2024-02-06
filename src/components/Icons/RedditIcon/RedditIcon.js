import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const RedditIcon = () => {

    const color = useSelector(selectTextColor);

    return (
        <svg width="20" height="20" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.118963 10V3.45455H1.87891V4.59659H1.94709C2.06641 4.19034 2.26669 3.88352 2.54794 3.67614C2.82919 3.46591 3.15305 3.3608 3.51953 3.3608C3.61044 3.3608 3.70845 3.36648 3.81357 3.37784C3.91868 3.3892 4.01101 3.40483 4.09055 3.42472V5.03551C4.00533 5.00994 3.88743 4.98722 3.73686 4.96733C3.58629 4.94744 3.44851 4.9375 3.32351 4.9375C3.05646 4.9375 2.81783 4.99574 2.6076 5.11222C2.40021 5.22585 2.23544 5.38494 2.11328 5.58949C1.99396 5.79403 1.9343 6.02983 1.9343 6.29688V10H0.118963ZM8.45526 0.863636L5.64276 11.3125H4.07884L6.89134 0.863636H8.45526Z" fill={color}/>
</svg>


    )
}
