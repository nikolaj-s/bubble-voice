import React from 'react'
import RichTextView from '../../ui/RichTexrView/RichTextView'

export const RichTextWidget = ({rich_text}) => {
  return (
    <RichTextView content={rich_text} />
  )
}
