
import ContentPlaceholder from '../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder'
import { CircleX } from 'lucide-react'
import { useNavigate } from 'react-router'

export const NotFound = () => {

    const navigate = useNavigate();

    return (
        <>
        <ContentPlaceholder title={'404'} message={"“We looked everywhere, even under the couch cushions.”"} icon={CircleX} actionTitle={'Return Home'} action={() => {navigate("/")}} />
        </>
    )
}
