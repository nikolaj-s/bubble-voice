
import React from 'react'

export const SocialIcon = ({width, height, color}) => {
    return (
        <div style={{
            width: width,
            height: height
        }}>
            <svg width="30" height="30" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M166 104C166 105.591 165.368 107.117 164.243 108.243C163.117 109.368 161.591 110 160 110H96C94.4087 110 92.8826 109.368 91.7574 108.243C90.6321 107.117 90 105.591 90 104C90 102.409 90.6321 100.883 91.7574 99.7574C92.8826 98.6321 94.4087 98 96 98H160C161.591 98 163.117 98.6321 164.243 99.7574C165.368 100.883 166 102.409 166 104ZM160 130H96C94.4087 130 92.8826 130.632 91.7574 131.757C90.6321 132.883 90 134.409 90 136C90 137.591 90.6321 139.117 91.7574 140.243C92.8826 141.368 94.4087 142 96 142H160C161.591 142 163.117 141.368 164.243 140.243C165.368 139.117 166 137.591 166 136C166 134.409 165.368 132.883 164.243 131.757C163.117 130.632 161.591 130 160 130ZM230 56V184C230 187.713 228.525 191.274 225.899 193.899C223.274 196.525 219.713 198 216 198H156.5C156.156 198.015 155.822 198.114 155.525 198.288C155.229 198.462 154.98 198.707 154.8 199L140 223.7C138.756 225.771 136.996 227.484 134.894 228.674C132.791 229.864 130.416 230.489 128 230.489C125.584 230.489 123.209 229.864 121.106 228.674C119.004 227.484 117.244 225.771 116 223.7L101.2 199C101.02 198.707 100.771 198.462 100.475 198.288C100.178 198.114 99.8436 198.015 99.5 198H40C36.287 198 32.726 196.525 30.1005 193.899C27.475 191.274 26 187.713 26 184V56C26 52.287 27.475 48.726 30.1005 46.1005C32.726 43.475 36.287 42 40 42H216C219.713 42 223.274 43.475 225.899 46.1005C228.525 48.726 230 52.287 230 56V56ZM218 56C218 55.4696 217.789 54.9609 217.414 54.5858C217.039 54.2107 216.53 54 216 54H40C39.4696 54 38.9609 54.2107 38.5858 54.5858C38.2107 54.9609 38 55.4696 38 56V184C38 184.53 38.2107 185.039 38.5858 185.414C38.9609 185.789 39.4696 186 40 186H99.5C101.917 186.001 104.293 186.628 106.396 187.82C108.498 189.011 110.257 190.727 111.5 192.8L126.3 217.5C126.458 217.816 126.7 218.082 127.001 218.267C127.301 218.453 127.647 218.551 128 218.551C128.353 218.551 128.699 218.453 128.999 218.267C129.3 218.082 129.542 217.816 129.7 217.5L144.5 192.8C145.743 190.727 147.502 189.011 149.604 187.82C151.707 186.628 154.083 186.001 156.5 186H216C216.53 186 217.039 185.789 217.414 185.414C217.789 185.039 218 184.53 218 184V56Z" fill={color} />
            </svg>

        </div>
    )
}