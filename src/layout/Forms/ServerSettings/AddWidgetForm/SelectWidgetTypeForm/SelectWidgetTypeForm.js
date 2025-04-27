import React from 'react'
import TypeInput from '../../../../../components/ui/Inputs/TypeInput/TypeInput'
import { widgetOptions } from '../../../../../features/Widgets/State/widgetOptions'
import Label from '../../../../../components/ui/Titles/Label/Label'
import { useSearchParams } from 'react-router-dom'
import Header from '../../../../../components/ui/Titles/Header/Header'

export const SelectWidgetTypeForm = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const navigate = (option) => {
        console.log(option)
        setSearchParams({section: 'addWidget', widget: option});
    }

    return (
       <>
       <Header level={3} text='Choose a Widget Type' />
       <Label label='options:' />
       <TypeInput types={widgetOptions} onSelect={navigate} />
       </>
    )
}
