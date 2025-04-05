import React from 'react'
import IconButton from '../../../ui/Buttons/IconButton/IconButton'
import { Search } from 'lucide-react'
import { KeybindToolTip } from '../../../ui/Titles/KeybindToolTip/KeybindToolTip'

export const SearchButton = ({onClick}) => {
  return (
    <IconButton 
        width={'100px'} 
        onClick={onClick} 
        padding={"5px 0px"}
        Icon={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: 'solid 1px var(--accent-color)',
          width: 98,
          borderRadius: '5px',
          padding: '0px 5px',
          height: 28,
          gap: 10
        }}>
          <p style={{
            margin: 0,
            padding: 0,
            opacity: 0.5,
            color: 'var(--text-color)'
          }}>
            Search
          </p>
          <Search 
          style={{
            width: 20
          }}
          color="var(--text-color)"
          />
        </div>} 
        position="bottom" 
        title={(
        <>
        <KeybindToolTip binds={["Ctrl", "/"]} width={100} />
        </>
        )} />
  )
}
