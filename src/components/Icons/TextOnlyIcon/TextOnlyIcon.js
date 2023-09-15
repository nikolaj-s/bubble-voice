import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const TextOnlyIcon = () => {

    const color = useSelector(selectTextColor);

    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2268_49)">
<path fillRule="evenodd" clipRule="evenodd" d="M11.1781 0.0899902C11.2749 0.108684 11.367 0.146252 11.4492 0.200548C11.5314 0.254844 11.6021 0.324804 11.6573 0.406432C11.7124 0.488059 11.751 0.579755 11.7707 0.67628C11.7904 0.772806 11.7909 0.87227 11.7721 0.96899L11.2591 3.63899H13.1721C13.2706 3.63899 13.3682 3.65839 13.4592 3.69608C13.5502 3.73377 13.6328 3.78902 13.7025 3.85866C13.7721 3.9283 13.8274 4.01098 13.8651 4.10198C13.9027 4.19297 13.9221 4.2905 13.9221 4.38899C13.9221 4.48748 13.9027 4.58501 13.8651 4.676C13.8274 4.767 13.7721 4.84968 13.7025 4.91932C13.6328 4.98896 13.5502 5.04421 13.4592 5.0819C13.3682 5.11959 13.2706 5.13899 13.1721 5.13899H10.9711L10.2551 8.86099H13.1721C13.3711 8.86099 13.5618 8.94001 13.7025 9.08066C13.8431 9.22131 13.9221 9.41208 13.9221 9.61099C13.9221 9.8099 13.8431 10.0007 13.7025 10.1413C13.5618 10.282 13.3711 10.361 13.1721 10.361H9.96615L9.39815 13.314C9.38033 13.4114 9.34339 13.5044 9.28946 13.5875C9.23552 13.6706 9.16566 13.7421 9.08391 13.7981C9.00216 13.854 8.91013 13.8932 8.81315 13.9134C8.71617 13.9336 8.61615 13.9343 8.51887 13.9156C8.42159 13.897 8.32898 13.8592 8.24638 13.8045C8.16378 13.7498 8.09283 13.6793 8.03762 13.5971C7.98242 13.5148 7.94406 13.4224 7.92476 13.3253C7.90545 13.2281 7.90558 13.1281 7.92515 13.031L8.43915 10.361H4.74315L4.17515 13.314C4.15733 13.4114 4.12039 13.5044 4.06646 13.5875C4.01252 13.6706 3.94266 13.7421 3.86091 13.7981C3.77916 13.854 3.68713 13.8932 3.59015 13.9134C3.49317 13.9336 3.39315 13.9343 3.29587 13.9156C3.19859 13.897 3.10598 13.8592 3.02338 13.8045C2.94078 13.7498 2.86983 13.6793 2.81463 13.5971C2.75942 13.5148 2.72106 13.4224 2.70176 13.3253C2.68245 13.2281 2.68258 13.1281 2.70215 13.031L3.21615 10.361H0.827148C0.628236 10.361 0.437471 10.282 0.296818 10.1413C0.156166 10.0007 0.0771484 9.8099 0.0771484 9.61099C0.0771484 9.41208 0.156166 9.22131 0.296818 9.08066C0.437471 8.94001 0.628236 8.86099 0.827148 8.86099H3.50415L4.22015 5.13799H0.827148C0.628236 5.13799 0.437471 5.05897 0.296818 4.91832C0.156166 4.77767 0.0771484 4.5869 0.0771484 4.38799C0.0771484 4.18908 0.156166 3.99831 0.296818 3.85766C0.437471 3.71701 0.628236 3.63799 0.827148 3.63799H4.51015L5.07615 0.68599C5.11368 0.490526 5.22732 0.317975 5.39207 0.206297C5.55682 0.0946189 5.75918 0.052962 5.95465 0.0904902C6.15011 0.128018 6.32266 0.241657 6.43434 0.406408C6.54602 0.571159 6.58768 0.773526 6.55015 0.96899L6.03715 3.63899H9.73315L10.3001 0.68599C10.3187 0.589172 10.3562 0.496967 10.4105 0.414649C10.4647 0.332331 10.5347 0.261515 10.6163 0.206253C10.6979 0.15099 10.7897 0.112365 10.8862 0.0925876C10.9828 0.0728097 11.0824 0.0722669 11.1791 0.0909902L11.1781 0.0899902ZM5.74815 5.13799L5.03215 8.86099H8.72715L9.44315 5.13799H5.74815Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_2268_49">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>


    )
}
