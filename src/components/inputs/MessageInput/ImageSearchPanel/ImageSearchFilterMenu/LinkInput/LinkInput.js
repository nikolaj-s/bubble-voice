import React from 'react'
import { TextInput } from '../../../../TextInput/TextInput';

export const LinkInput = ({onEnter, mediaLocation, handleSetMediaLocation}) => {

    React.useEffect(() => {

        document.getElementById('link-source-input')?.focus();

    }, [])

  return (
    <TextInput id={'link-source-input'} invert={true} keyCode={onEnter} inputValue={mediaLocation} action={handleSetMediaLocation} placeholder={"Link Website To Fetch Media From e.g. reddit.com"} />
  )
}
