import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const BubbleSvg = ({width = 300, height = 300, top = null, left = null, right = null, bottom = null, rotate = '0deg'}) => {

    const color = useSelector(selectTextColor);
  
    return (
      <div style={{backgroundColor: 'transparent',width: width, height: height, position: 'absolute', top: top, right: right, left: left, bottom: bottom, transform: `rotate(${rotate})`}}>
          <svg style={{width: "100%", height: "100%", objectFit: "cover"}} width="830" height="806" viewBox="0 0 830 806" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M353.634 9.92325C577.396 -22.8233 785.878 126.833 819.539 343.86C853.199 560.887 699.364 763.566 475.602 796.313C251.84 829.059 43.3577 679.403 9.69725 462.376C-23.9632 245.349 129.873 42.6698 353.634 9.92325Z" stroke={color} strokeWidth="10"/>
          <ellipse rx="34.0879" ry="112.491" transform="matrix(-0.397124 -0.917765 0.925807 -0.377997 304.289 110.925)" fill={color}/>
          <ellipse rx="25.9004" ry="26.6293" transform="matrix(-0.153265 -0.988185 0.989461 -0.144803 142.331 195.754)" fill={color}/>
          </svg>
      </div>
    )
}
