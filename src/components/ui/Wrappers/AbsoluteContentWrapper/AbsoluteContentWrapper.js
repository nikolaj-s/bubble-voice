import React from 'react'

export const AbsoluteContentWrapper = ({children}) => {
  return (
    <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--primary-color)',
        zIndex: 9
    }}>
        {children}
    </div>
  )
}
