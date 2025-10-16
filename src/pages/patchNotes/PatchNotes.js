
import React from 'react'
import ScrollLoadWrapper from '../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper'
import ContentHeader from '../../components/Headers/ContentHeader/ContentHeader'
import { Bandage, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SpinnerLoading from '../../components/ui/Loading/Spinner/SpinnerLoading'
import TextLabelError from '../../components/Error/TextLabelError/TextLabelError'
import ContentPlaceholder from '../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder'
import { Card } from '../../components/ui/Wrappers/Card/Card'
import Header from '../../components/ui/Titles/Header/Header'
import { Markdown } from '../../components/Markdown/Markdown'
import DateTimeDisplay from '../../components/ui/DateTimeDisplay/DateTimeDisplay'
import { DefaultHeader } from '../../components/DefaultHeader/DefaultHeader'
import { getPatchNotes } from '../../features/PatchNotes/Thunks/getPatchNotes'
import Pagination from '../../components/Pagination/Pagination'

export const PatchNotes = () => {

    const dispatch = useDispatch();

    const {loading, error, patchNotes, pages} = useSelector(state => state.patchNotesSlice);

    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const page = Number(searchParams.get('page') || 1);

        if (loading) return;

        dispatch(getPatchNotes(page))
    }, [searchParams])

    return (
        <>
        <DefaultHeader />
        <ScrollLoadWrapper style={{backgroundColor: 'transparent'}} >
            <ContentHeader title={"Bubble Patch Notes"} Icon={Bandage} />
            {error && (<TextLabelError error={error} />)}

            {(patchNotes.length === 0 && !loading) && (
                <ContentPlaceholder icon={X} title={'No Patch Notes'} message={'Currently no patch notes'} />
            )}
            {patchNotes.map(patchNote => {
                return (
                    <Card key={patchNote?._id}>
                        <Header text={patchNote?.version} />
                        <Markdown text={patchNote?.content} />
                        <DateTimeDisplay date={patchNote?.createdAt} />
                    </Card>
                )
            })}
            
            <Pagination pageCount={pages}  />
            {loading && (<SpinnerLoading />)}
        </ScrollLoadWrapper>
        </>
    )
}
