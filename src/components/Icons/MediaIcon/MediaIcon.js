import React from 'react'

export const MediaIcon = ({color}) => {
  return (
    <svg width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.0938 4.10156H7.03125C6.66865 4.10156 6.3209 4.24561 6.0645 4.502C5.80811 4.7584 5.66406 5.10615 5.66406 5.46875V7.22656H3.90625C3.54365 7.22656 3.1959 7.3706 2.9395 7.627C2.68311 7.8834 2.53906 8.23115 2.53906 8.59375V19.5312C2.53906 19.8939 2.68311 20.2416 2.9395 20.498C3.1959 20.7544 3.54365 20.8984 3.90625 20.8984H17.9688C18.3314 20.8984 18.6791 20.7544 18.9355 20.498C19.1919 20.2416 19.3359 19.8939 19.3359 19.5312V17.7734H21.0938C21.4564 17.7734 21.8041 17.6294 22.0605 17.373C22.3169 17.1166 22.4609 16.7689 22.4609 16.4062V5.46875C22.4609 5.10615 22.3169 4.7584 22.0605 4.502C21.8041 4.24561 21.4564 4.10156 21.0938 4.10156ZM6.83594 5.46875C6.83594 5.41695 6.85651 5.36727 6.89314 5.33064C6.92977 5.29401 6.97945 5.27344 7.03125 5.27344H21.0938C21.1456 5.27344 21.1952 5.29401 21.2319 5.33064C21.2685 5.36727 21.2891 5.41695 21.2891 5.46875V12.0674L19.9736 10.752C19.8467 10.625 19.696 10.5243 19.5301 10.4555C19.3642 10.3868 19.1864 10.3515 19.0068 10.3515C18.8273 10.3515 18.6495 10.3868 18.4836 10.4555C18.3177 10.5243 18.167 10.625 18.04 10.752L15.9482 12.8428L11.5137 8.4082C11.3867 8.28123 11.236 8.18051 11.0701 8.1118C10.9042 8.04308 10.7264 8.00771 10.5469 8.00771C10.3673 8.00771 10.1895 8.04308 10.0236 8.1118C9.85776 8.18051 9.70703 8.28123 9.58008 8.4082L6.83594 11.1523V5.46875ZM18.1641 19.5312C18.1641 19.5831 18.1435 19.6327 18.1069 19.6694C18.0702 19.706 18.0206 19.7266 17.9688 19.7266H3.90625C3.85445 19.7266 3.80477 19.706 3.76814 19.6694C3.73151 19.6327 3.71094 19.5831 3.71094 19.5312V8.59375C3.71094 8.54195 3.73151 8.49227 3.76814 8.45564C3.80477 8.41901 3.85445 8.39844 3.90625 8.39844H5.66406V16.4062C5.66406 16.7689 5.80811 17.1166 6.0645 17.373C6.3209 17.6294 6.66865 17.7734 7.03125 17.7734H18.1641V19.5312ZM21.0938 16.6016H7.03125C6.97945 16.6016 6.92977 16.581 6.89314 16.5444C6.85651 16.5077 6.83594 16.4581 6.83594 16.4062V12.8096L10.4082 9.2373C10.4263 9.21914 10.4479 9.20474 10.4716 9.19491C10.4953 9.18508 10.5207 9.18002 10.5464 9.18002C10.5721 9.18002 10.5975 9.18508 10.6212 9.19491C10.6449 9.20474 10.6664 9.21914 10.6846 9.2373L15.5342 14.0869C15.5886 14.1414 15.6532 14.1846 15.7244 14.2141C15.7955 14.2436 15.8717 14.2588 15.9487 14.2588C16.0257 14.2588 16.102 14.2436 16.1731 14.2141C16.2442 14.1846 16.3089 14.1414 16.3633 14.0869L18.8682 11.5811C18.8863 11.5629 18.9078 11.5485 18.9316 11.5387C18.9553 11.5288 18.9807 11.5238 19.0063 11.5238C19.032 11.5238 19.0574 11.5288 19.0811 11.5387C19.1049 11.5485 19.1264 11.5629 19.1445 11.5811L21.293 13.7295V16.4062C21.293 16.4322 21.2878 16.458 21.2777 16.4819C21.2677 16.5059 21.2529 16.5276 21.2344 16.5458C21.2158 16.5639 21.1938 16.5782 21.1697 16.5878C21.1455 16.5974 21.1197 16.6021 21.0938 16.6016ZM15.8203 8.20312C15.8203 8.00998 15.8776 7.82117 15.9849 7.66058C16.0922 7.49998 16.2447 7.37481 16.4232 7.3009C16.6016 7.22699 16.798 7.20765 16.9874 7.24533C17.1768 7.28301 17.3508 7.37602 17.4874 7.51259C17.624 7.64917 17.717 7.82317 17.7547 8.01261C17.7924 8.20204 17.773 8.3984 17.6991 8.57684C17.6252 8.75528 17.5 8.9078 17.3394 9.01511C17.1788 9.12241 16.99 9.17969 16.7969 9.17969C16.5379 9.17969 16.2895 9.0768 16.1063 8.89366C15.9232 8.71052 15.8203 8.46213 15.8203 8.20312Z" fill={color}/>
</svg>
  )
}
