import React from 'react'
import { DefaultHeader } from '../../components/DefaultHeader/DefaultHeader'

import ScrollLoadWrapper from '../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper'
import ContentPlaceholder from '../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder'
import { CircleX } from 'lucide-react'
import { useNavigate } from 'react-router'

export const NotFound = () => {

    const navigate = useNavigate();

    return (
        <>
        <DefaultHeader />
        <ScrollLoadWrapper>
            <ContentPlaceholder title={'404'} message={"“We looked everywhere, even under the couch cushions.”"} icon={CircleX} actionTitle={'Return Home'} action={() => {navigate("/")}} />
        </ScrollLoadWrapper>

        </>
    )
}
