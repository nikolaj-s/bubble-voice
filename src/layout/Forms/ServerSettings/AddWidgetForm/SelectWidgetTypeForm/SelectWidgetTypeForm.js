import React from 'react'
import TypeInput from '../../../../../components/ui/Inputs/TypeInput/TypeInput'
import { widgetOptions } from '../../../../../features/Widgets/State/widgetOptions'
import Label from '../../../../../components/ui/Titles/Label/Label'
import { useSearchParams } from 'react-router-dom'
import Header from '../../../../../components/ui/Titles/Header/Header'

export const SelectWidgetTypeForm = ({channel}) => {

    const [options, setOptions] = React.useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const navigate = (option) => {
        console.log(option)
        setSearchParams({section: 'addWidget', widget: option});
    }

    React.useEffect(() => {

        setOptions(widgetOptions.filter(widget => {
            if (channel.channel_type !== 'voice' && widget.type === 'media_player') {
                return false;
            }
            if (channel.channel_type === 'voice' && widget.type === 'featured_posts') {
                return false;
            }
            return true;
        }))

    }, [channel])

    return (
       <>
       <Header level={3} text='Choose a Widget' />
       <Label label='options:' />
       <TypeInput types={options} onSelect={navigate} />
       </>
    )
}
