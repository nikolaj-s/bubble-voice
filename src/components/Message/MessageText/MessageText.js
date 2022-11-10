import React from 'react'

export const MessageText = ({text, color}) => {
  return (
    <>
    {text ?
    <p style={{color: color}}>{text}</p>
    :null}
    </>
  )
}
