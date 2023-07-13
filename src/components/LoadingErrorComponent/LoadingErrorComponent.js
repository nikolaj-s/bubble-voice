import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Error } from '../Error/Error'
import { Loading } from '../LoadingComponents/Loading/Loading'

export const LoadingErrorComponent = ({error, errorMessage, loading, action, label="Ok"}) => {
    return (
        <AnimatePresence>
            {error ? <Error position='absolute' errorMessage={errorMessage} action={action} buttonLabel={label} /> : null}
            <Loading loading={loading} error={error} />
        </AnimatePresence>
    )
}
