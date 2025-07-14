import { Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteMoment } from "../../../features/Moments/Thunks/deleteMoment";


export const useMomentCtxMenu = () => {


    const dispatch = useDispatch();

    const {_id: user_id} = useSelector(state => state.accountSlice.account);

    const getMomentOptions = useCallback((options, permissions, moment) => {

        if (permissions.user_can_delete_moments || moment.created_by === user_id) {
            options.push({
                label: "Delete Moment",
                type: 'button',
                icon: <Trash2 color="var(-error-color)" />,
                color: 'var(--error-color)',
                onClick: () => {
                    dispatch(deleteMoment(moment._id))
                }
            })
        }

    }, [dispatch])

    return {getMomentOptions}

}