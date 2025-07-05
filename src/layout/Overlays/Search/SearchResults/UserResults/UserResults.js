import React from 'react'
import ContentPlaceholder from '../../../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder'
import { Users } from 'lucide-react'
import UserButton from '../../../../../components/ui/Buttons/UserButton/UserButton'
import { triggerContext } from '../../../../../lib/services/helperFunctions'

export const UserResults = ({results = []}) => {
    return (
        <div>
            {results.length === 0 ?
            <ContentPlaceholder icon={Users} title={'Start Searching By Username'} message={'Currently No Users Found'} />
            : 
            results.map((user, key)=> (<UserButton key={key} {...user} user={user} onClick={(u, e) => {triggerContext(e, `${u}-search-result`); console.log(e,`${u}-search-result`)}} id='search-result' showContextButton={true} showUsername={true} />))
            }
        </div>
    )
}
