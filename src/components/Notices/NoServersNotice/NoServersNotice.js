import React from 'react'

import Header from '../../Titles/Header/Header'
import Label from '../../Titles/Label/Label'
import TextButton from '../../Buttons/TextButton/TextButton'
import CardWrapper from '../../ui/Wrappers/CardWrapper/CardWrapper';

export const NoServersNotice = ({joinServer, createServer}) => {

    return (
        <CardWrapper>
            <Header level={2} text="You're not part of any Bubbles yet! 🎉" />
            <Label label="Join or create your own by clicking the button below and let's get the fun started!" />
            <TextButton action={joinServer} title='Join' />
            <TextButton action={createServer} title='Create' />
        </CardWrapper>
    )
}
