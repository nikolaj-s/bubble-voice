import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const AltEditIcon = () => {

    const color = useSelector(selectTextColor);

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0001 2C12.5561 2 13.1001 2.046 13.6321 2.132L11.7601 4.004C10.1995 4.05083 8.68668 4.55331 7.40817 5.44948C6.12966 6.34566 5.14133 7.59637 4.56501 9.04743C3.9887 10.4985 3.84958 12.0865 4.16482 13.6156C4.48006 15.1448 5.23588 16.5483 6.33909 17.6531C7.44231 18.758 8.84471 19.5158 10.3734 19.8333C11.9021 20.1507 13.4903 20.0139 14.9422 19.4397C16.3941 18.8655 17.6463 17.879 18.5443 16.6018C19.4423 15.3246 19.947 13.8125 19.9961 12.252L21.8701 10.38C22.2017 12.4 21.9054 14.4732 21.0212 16.3194C20.137 18.1657 18.7075 19.6961 16.9257 20.704C15.144 21.7118 13.0958 22.1486 11.0579 21.9553C9.01996 21.762 7.09046 20.9479 5.52998 19.623C3.96949 18.2981 2.85321 16.5262 2.3319 14.5466C1.81059 12.5671 1.90936 10.4752 2.61488 8.55353C3.32039 6.63188 4.59866 4.97304 6.27704 3.80106C7.95542 2.62909 9.95304 2.00043 12.0001 2ZM20.8821 3.124C20.5266 2.76848 20.1046 2.48646 19.6401 2.29405C19.1757 2.10164 18.6779 2.00261 18.1751 2.00261C17.6724 2.00261 17.1745 2.10164 16.7101 2.29405C16.2456 2.48646 15.8236 2.76848 15.4681 3.124L10.3001 8.292C10.1913 8.40111 10.1091 8.5339 10.0601 8.68L8.09211 14.52C8.02678 14.714 8.0169 14.9224 8.06356 15.1217C8.11022 15.3211 8.21158 15.5034 8.35623 15.6483C8.50088 15.7931 8.68308 15.8947 8.88234 15.9417C9.0816 15.9886 9.29 15.979 9.48411 15.914L15.3241 13.95C15.4709 13.9012 15.6044 13.8191 15.7141 13.71L20.8821 8.54C21.2376 8.18453 21.5196 7.76251 21.7121 7.29804C21.9045 6.83357 22.0035 6.33575 22.0035 5.833C22.0035 5.33025 21.9045 4.83243 21.7121 4.36796C21.5196 3.90349 21.2376 3.47947 20.8821 3.124ZM16.8821 4.538C17.225 4.19507 17.6901 4.00242 18.1751 4.00242C18.6601 4.00242 19.1252 4.19507 19.4681 4.538C19.811 4.88092 20.0037 5.34603 20.0037 5.831C20.0037 6.31597 19.811 6.78107 19.4681 7.124L14.4641 12.126L10.5661 13.438L11.8781 9.542L16.8821 4.538Z" fill={color} />
</svg>

  )
}
