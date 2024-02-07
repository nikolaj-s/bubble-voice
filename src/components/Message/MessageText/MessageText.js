import React from 'react'

export const MessageText = ({text, color, loading, style = {}}) => {
 console.log(text)
  return (
    <>
    {text?.length > 0 ?
    <p className={loading ? 'message-loading-text' : null} style={{
      color: (style?.color || color),
      fontSize: style?.fontSize,
      textDecoration: style?.textDecoration ? 'underline' : null,
      fontWeight: style?.bold ? '600' : null,
      fontFamily: style?.fontFamily,

    }}>{text}</p>
    :null}
    </>
  )
}
