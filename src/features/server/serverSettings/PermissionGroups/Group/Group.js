import React from 'react'
import { RadioButton } from '../../../../../components/buttons/RadioButton/RadioButton'
import { TextButton } from '../../../../../components/buttons/textButton/TextButton'
import { InputTitle } from '../../../../../components/titles/inputTitle/InputTitle'
import { InputPlaceHolder } from '../../../../../components/titles/InputPlaceHolder/InputPlaceHolder'
import { DeleteIcon } from '../../../../../components/Icons/DeleteIcon/DeleteIcon';

export const Group = ({permission, action, handleDelete}) => {
    return (
        <>
        <InputTitle title={permission.server_group_name} />
        {
        permission.delete ?
        <InputPlaceHolder fontSize='0.8rem' value={`Hit Apply To Save Changes And Delete ${permission.server_group_name}`} />
        :
        Object.entries(permission).map(perm => {
            if (perm[0].includes('user_can')) {
                return <RadioButton key={perm[0]} action={() => {action(permission._id, perm[0])}} name={perm[0].split('_').join(' ')} state={perm[1]} />
            } else {
                return null
            }
        })}
        {permission.server_group_name !== "Owner" && permission.server_group_name !== "Guest" && permission.delete !== true ?
        <TextButton action={() => {handleDelete(permission._id)}} name={`Delete ${permission.server_group_name}`} icon={<DeleteIcon />} />
        :null
        }
        </>
    )
}
