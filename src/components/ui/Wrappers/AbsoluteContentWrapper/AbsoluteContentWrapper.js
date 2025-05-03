import React from 'react'

export const AbsoluteContentWrapper = ({children, onClose}) => {
  return (
    <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--overlay-color)',
        zIndex: 9,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
      <div style={{position: 'relative', zIndex: 2}}>
        {children}
      </div>
      <div 
      onClick={onClose}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
      />
    </div>
  )
}
