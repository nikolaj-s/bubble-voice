import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAccount } from "../../features/Account/Thunks/fetchAccount";

import DashboardSkeleton from "../../components/ui/Loading/DashBoardSkeleton/DashBoardSkeleton";
import { selectAccount, selectAccountError } from "../../features/Account/accountSlice";
import { fetchDevices } from "../../features/Settings/Devices/deviceSlice";

const FetchAccountProvider = ({ children }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(selectAccount);

    const error = useSelector(selectAccountError);

    const token = useSelector(state => state.authSlice.token);

    useEffect(() => {
        try {
            dispatch(fetchDevices());
            
            if (!token) return;

            if (token?.trim() === ';') return;

            if (token) {

                dispatch(fetchAccount());
            
            }

        } catch (error) {
            navigate('/account-error')
        }
    }, [dispatch, token]);

    useEffect(() => {
        console.log(error)
        if (error) {

            navigate("/account-error"); // Redirect to login

        }
    }, [error, dispatch]);

    if (!user) return <DashboardSkeleton />;

    return (
        <>
        {children}
        </>
    );
};

export default FetchAccountProvider;
