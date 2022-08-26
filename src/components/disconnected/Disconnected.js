// library's
import React from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router';
import { selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import { motion } from "framer-motion";
// style
import "./Disconnected.css";

const Wrapper = () => {

    const secondaryColor = useSelector(selectSecondaryColor);

    const color = useSelector(selectTextColor);

    return (
        <div className='disconnected-outer-container'>
            <div style={{
                backgroundColor: secondaryColor
            }} className='disconnected-inner-container'>
                <div className='disconnected-content-wrapper'>
                    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_422_20)">
                    <path d="M143.51 0.000122264C142.217 0.139051 141.01 0.710292 140.083 1.62128L130.529 11.1751C117.813 2.00205 100.177 3.64628 88.3384 14.9655C88.3384 15.404 83.4057 20.2155 78.9692 24.5194L73.373 18.929C72.7782 18.2955 72.0479 17.8046 71.2367 17.4929C70.4255 17.1812 69.5544 17.0568 68.6884 17.129C68.4445 17.173 68.2036 17.2328 67.9673 17.3078C66.9115 17.4989 65.9299 17.9806 65.1328 18.6988C64.3357 19.417 63.7547 20.3433 63.455 21.3735C63.1554 22.4038 63.1489 23.4972 63.4365 24.5309C63.724 25.5645 64.2941 26.4976 65.0827 27.2251L78.2423 40.3847L59.3192 59.3136C58.7745 59.8579 58.3423 60.5043 58.0473 61.2156C57.7524 61.927 57.6004 62.6895 57.6002 63.4596C57.5999 64.2297 57.7513 64.9923 58.0458 65.7039C58.3402 66.4155 58.772 67.0621 59.3163 67.6069C59.8607 68.1516 60.507 68.5838 61.2184 68.8787C61.9297 69.1737 62.6923 69.3256 63.4624 69.3259C64.2325 69.3262 64.9951 69.1747 65.7066 68.8803C66.4182 68.5858 67.0648 68.1541 67.6096 67.6097L86.5384 48.6809L101.325 63.4617L82.3904 82.3905C81.2902 83.4906 80.6722 84.9828 80.6722 86.5386C80.6722 88.0944 81.2902 89.5865 82.3904 90.6867C83.4905 91.7868 84.9826 92.4048 86.5384 92.4048C88.0943 92.4048 89.5864 91.7868 90.6865 90.6867L109.615 71.7578L122.775 84.9117C123.319 85.4564 123.966 85.8886 124.677 86.1835C125.388 86.4785 126.151 86.6304 126.921 86.6307C127.691 86.631 128.454 86.4795 129.165 86.1851C129.877 85.8906 130.524 85.4589 131.068 84.9146C131.613 84.3702 132.045 83.7239 132.34 83.0125C132.635 82.3011 132.787 81.5386 132.787 80.7685C132.788 79.9984 132.636 79.2358 132.342 78.5242C132.047 77.8126 131.615 77.166 131.071 76.6213L125.481 71.0309L135.035 61.6617C146.342 50.354 147.49 32.7694 138.64 19.6501L148.385 9.9232C149.296 9.07949 149.911 7.96421 150.137 6.74315C150.364 5.52209 150.191 4.26045 149.643 3.14576C149.096 2.03107 148.203 1.12286 147.098 0.556123C145.993 -0.0106112 144.734 -0.205607 143.51 0.000122264ZM22.5346 63.2828C22.2906 63.3269 22.0497 63.3866 21.8134 63.4617C20.7576 63.6527 19.7761 64.1344 18.979 64.8527C18.1819 65.5709 17.6008 66.4971 17.3012 67.5274C17.0015 68.5576 16.9951 69.651 17.2826 70.6847C17.5701 71.7184 18.1402 72.6514 18.9288 73.379L24.5192 78.9694L14.9654 88.3386C3.65766 99.6463 2.50959 117.231 11.3596 130.35L1.61535 140.077C1.06986 140.623 0.637157 141.27 0.341939 141.983C0.0467219 142.696 -0.105225 143.459 -0.105225 144.231C-0.105225 145.002 0.0467219 145.766 0.341939 146.479C0.637157 147.192 1.06986 147.839 1.61535 148.385C2.16085 148.93 2.80844 149.363 3.52116 149.658C4.23387 149.953 4.99776 150.105 5.7692 150.105C6.54064 150.105 7.30453 149.953 8.01725 149.658C8.72996 149.363 9.37756 148.93 9.92305 148.385L19.4769 138.825C32.1923 148.01 49.8288 146.36 61.6673 135.041C61.6673 134.602 66.6 129.791 71.0365 125.487L76.6327 131.077C77.1774 131.621 77.824 132.053 78.5356 132.348C79.2472 132.642 80.0098 132.793 80.7799 132.793C81.55 132.793 82.3125 132.641 83.0239 132.346C83.7353 132.051 84.3816 131.619 84.9259 131.074C85.4703 130.529 85.902 129.883 86.1965 129.171C86.4909 128.46 86.6423 127.697 86.6421 126.927C86.6418 126.157 86.4899 125.394 86.1949 124.683C85.9 123.972 85.4678 123.325 84.923 122.781L27.2307 65.0886C26.6352 64.4543 25.904 63.9629 25.0918 63.6512C24.2795 63.3395 23.4073 63.2155 22.5404 63.2886L22.5346 63.2828Z" fill="black"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_422_20">
                    <rect width="150" height="150" fill={color}/>
                    </clipPath>
                    </defs>
                    </svg>
                    <h1 style={{color: color}}>Connection Lost</h1>
                    <motion.div 
                    style={{
                        width: 80,
                        height: 80
                    }}
                    animate={{rotate: ["0deg", "360deg"]}}
                    transition={{ease: "linear", duration: "1", repeat: Infinity}}
                    >
                        <svg 
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.5" d="M24.9998 4.16675C20.8794 4.16675 16.8515 5.3886 13.4255 7.6778C9.99944 9.96699 7.32918 13.2207 5.75236 17.0275C4.17553 20.8343 3.76296 25.0232 4.56682 29.0645C5.37068 33.1057 7.35486 36.8179 10.2685 39.7315C13.182 42.6451 16.8942 44.6292 20.9355 45.4331C24.9767 46.237 29.1656 45.8244 32.9724 44.2476C36.7792 42.6707 40.0329 40.0005 42.3221 36.5745C44.6113 33.1484 45.8332 29.1205 45.8332 25.0001C45.8332 22.2642 45.2943 19.5551 44.2473 17.0275C43.2004 14.4999 41.6658 12.2032 39.7312 10.2687C37.7967 8.33414 35.5 6.79956 32.9724 5.75259C30.4448 4.70562 27.7357 4.16675 24.9998 4.16675V4.16675ZM24.9998 41.6667C21.7035 41.6667 18.4812 40.6893 15.7403 38.8579C12.9995 37.0265 10.8633 34.4236 9.60185 31.3781C8.34039 28.3327 8.01034 24.9816 8.65343 21.7486C9.29651 18.5156 10.8839 15.5458 13.2147 13.215C15.5456 10.8841 18.5153 9.29675 21.7483 8.65366C24.9814 8.01057 28.3325 8.34063 31.3779 9.60209C34.4233 10.8635 37.0263 12.9998 38.8577 15.7406C40.689 18.4814 41.6665 21.7037 41.6665 25.0001C41.6665 29.4204 39.9106 33.6596 36.785 36.7852C33.6594 39.9108 29.4201 41.6667 24.9998 41.6667V41.6667Z" fill="white"/>
                        <path d="M41.6667 25.0001H45.8333C45.8333 22.2642 45.2945 19.5551 44.2475 17.0275C43.2005 14.4999 41.6659 12.2032 39.7314 10.2687C37.7968 8.33414 35.5002 6.79956 32.9726 5.75259C30.445 4.70562 27.7359 4.16675 25 4.16675V8.33341C29.4203 8.33341 33.6595 10.0894 36.7851 13.215C39.9107 16.3406 41.6667 20.5798 41.6667 25.0001Z" fill="black"/>
                        </svg>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export const Disconnected = () => useRoutes([
    {path: "/dashboard/server/:id/create-channel-menu/disconnected/*", element: <Wrapper />},
    {path: "/dashboard/server/:id/channel/:id/create-channel-menu/disconnected/*", element: <Wrapper />},
    {path: "/dashboard/server/:id/channel/:id/disconnected/*", element: <Wrapper />},
    {path: "/dashboard/server/:id/disconnected/*", element: <Wrapper />},
    {path: "/dashboard/disconnected/*", element: <Wrapper />}
])