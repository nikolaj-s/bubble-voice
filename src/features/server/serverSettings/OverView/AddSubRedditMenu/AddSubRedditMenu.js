import React from 'react'
import { TextInput } from '../../../../../components/inputs/TextInput/TextInput'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { throwServerError } from '../../../ServerSlice';
import { SelectSubReddit } from '../../../../../components/buttons/SelectSubReddit/SelectSubReddit';
import { InputTitle } from '../../../../../components/titles/inputTitle/InputTitle';

export const AddSubRedditMenu = ({add, toggleLoading = () => {}}) => {

    const dispatch = useDispatch();

    const [results, setResults] = React.useState([]);

    const [query, setQuery] = React.useState("");

    const search = async () => {

        if (query.length === 0) return;

        toggleLoading(true);

        const data = await Axios.get(`https://www.reddit.com/subreddits/search.json?q=${query}&include_over_18=on&limit=9`)
        .then(data => {

                return data.data.data.children.map(c => {return {...c.data}});
            
        })
        .catch(err => {
            dispatch(throwServerError({error: true, errorMessage: 'No Results'}));
        });

        setQuery("");

        toggleLoading(false)

        console.log(data);

        const mapped_data = data.map(d => {return {thumbnail: d.community_icon, url: d.url, title: d.display_name_prefixed, nsfw: d.over18}})

        setResults(mapped_data);

    }


    const handleInput = (value) => {
        setQuery(value);
    }

    const handleSearch = (keycode) => {
        if (keycode === 13) search();
    }

    return (
        <>
        <div style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexWrap: 'wrap'
        }}> 
            {results.length > 0 ?
            <InputTitle title={"Results"} />
            : null}
            {results.map(sub => {
                return (
                    <SelectSubReddit add={add} data={sub} />
                )
            })}
        </div>
        <TextInput keyCode={handleSearch} inputValue={query} action={handleInput} placeholder={"Search For Subreddit To Add"} />
        </>
    )
}
