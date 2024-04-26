import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccentColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { SearchIcon } from '../../../components/Icons/SearchIcon/SearchIcon';

import "./Snippet.css";

export const Snippet = ({snippet, metaData, handleLink}) => {

    const [domain, setDomain] = React.useState({});

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    React.useEffect(() => {

        if (snippet) {
            setDomain({domain: snippet.domain, url: snippet.url})
        }

    }, [snippet])
    console.log(metaData)
    return (
        <div className='snippet-container'>
            <h3 style={{
                color: textColor,
                fontWeight: '400',
                margin: "5px 5px 0px 5px",
                width: 'calc(100% - 10px)',
                wordBreak: 'break-all'
            }}>{metaData?.tags}</h3>
            {domain?.domain ?
            <p
            onClick={() => {handleLink(domain.url)}}
            className='domain-name-link'
            style={{
                color: textColor,
                margin: "5px 0px 0px 5px",
            }}
            >{domain.domain}</p>
            : null}
            <a 
            onClick={(e) => {e.preventDefault(); handleLink(metaData?.image)}}
            style={{overflow: 'hidden', textOverflow: 'ellipsis',
            maxWidth: "calc(100% - 10px)"}}
            className='expanded-content-image-source-link'>
                {metaData?.image}
            </a>
            <h4 
            style={{
                color: textColor,
                backgroundColor: accentColor,
                width: 'auto',
                margin: '5px 0px',
                padding: '5px 10px',
                borderRadius: '10px',
                alignSelf: 'flex-start'
            }}
            >{metaData?.width} x {metaData?.height}</h4>
            {metaData?.query ?
            <div style={{
                backgroundColor: accentColor,
                width: 'auto',
                margin: '5px 0px',
                padding: '5px 10px',
                borderRadius: '10px',
                alignSelf: 'flex-start',
                display:'flex',
                alignItems: 'center'
            }}>
                <SearchIcon />
                <h4 
                style={{
                    color: textColor,
                    margin: "0px 0px 0px 5px"
                }}
                >{metaData?.query}
                
                </h4>
                
            </div>
            : null}
        </div>
    )
}
