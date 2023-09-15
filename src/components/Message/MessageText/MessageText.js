import React from 'react'

export const MessageText = ({text, color, loading}) => {
  return (
    <>
    {text ?
    <p className={loading ? 'message-loading-text' : null} style={{color: color}}>{text}</p>
    :null}
    </>
  )
}
