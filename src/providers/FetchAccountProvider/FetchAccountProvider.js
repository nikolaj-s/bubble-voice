import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAccount } from "../../features/Account/Thunks/fetchAccount";

import DashboardSkeleton from "../../components/Loading/DashBoardSkeleton/DashBoardSkeleton";
import { selectAccount, selectAccountError } from "../../features/Account/accountSlice";
import { fetchDevices } from "../../features/Settings/Devices/DeviceSlice";

const FetchAccountProvider = ({ children }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(selectAccount);

    const error = useSelector(selectAccountError);

    const token = useSelector(state => state.authSlice.token);

    useEffect(() => {

        dispatch(fetchDevices());
        
        if (token.trim() === ';') return;

        if (token) {

            dispatch(fetchAccount());
        
        }

    }, [dispatch, token]);

    useEffect(() => {
        if (error) {

            navigate("/login"); // Redirect to login

        }
    }, [error, dispatch, navigate]);

    if (!user) return <DashboardSkeleton />;

    return (
        <>
        {children}
        </>
    );
};

export default FetchAccountProvider;
