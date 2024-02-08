// library
import React from 'react';
// style
import "./BubbleLogo.css";

export const BubbleLogo = ({action}) => {

    return (
        <div
        style={{marginBottom: 5}}
        onClick={action} className='logo-container'>
            <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M511.997 291.872C512.619 411.717 418.208 508.929 301.126 509C184.043 509.071 88.6247 411.974 88.0031 292.128C87.3814 172.283 181.792 75.071 298.874 75C415.957 74.9291 511.375 172.026 511.997 291.872Z" fill="url(#paint0_linear_0_1)"/>
<path d="M250.41 25C125.317 25 23.9502 128.422 24 256C24.0294 331.173 59.2639 397.96 113.797 440.143M397.645 80.44C446.192 122.807 476.973 185.741 477 256C477.05 383.578 375.683 487 250.59 487C241.392 487 232.321 486.441 223.41 485.354" stroke="#010216" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M124 217C143.273 161.323 186.016 118.574 242 107" stroke="#010216" stroke-width="50" stroke-linecap="round"/>
<defs>
<linearGradient id="paint0_linear_0_1" x1="153.097" y1="125.099" x2="459.742" y2="435.654" gradientUnits="userSpaceOnUse">
<stop stop-color="#00B2FF"/>
<stop offset="1" stop-color="white"/>
</linearGradient>
</defs>
</svg>
    </div>
    )
}
