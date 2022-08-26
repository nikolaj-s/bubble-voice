import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'
import { MemberCard } from '../../../../components/memberCard/MemberCard';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectServerGroups, selectServerMembers } from '../../ServerSlice';

const Wrapper = () => {

    const dispatch = useDispatch();

    const serverGroups = useSelector(selectServerGroups);

    const members = useSelector(selectServerMembers);

    React.useEffect(() => {

        dispatch(setHeaderTitle("Members"))

        return () => {
            dispatch(setHeaderTitle(""));
        }
    // eslint-disable-next-line
    }, [])

    return (
        <>
        {serverGroups.map((serverGroup, key) => {
            return (
                <div key={serverGroup + key} >
                    <InputTitle marginBottom={0} key={serverGroup._id} title={serverGroup.server_group_name} />
                    {members.map(member => {
                        if (member.server_group === serverGroup._id) {
                            return <MemberCard member={member} key={member.username} />
                        } else {
                            return null
                        }
                    })}
                </div>
            )
        })}
        </>
    )
}

export const Members = () => useRoutes([
    { path: "members", element: <Wrapper /> }
])