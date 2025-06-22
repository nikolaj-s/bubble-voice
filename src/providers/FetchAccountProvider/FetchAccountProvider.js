import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { fetchAccount } from "../../features/Account/Thunks/fetchAccount";

import DashboardSkeleton from "../../components/ui/Loading/DashBoardSkeleton/DashBoardSkeleton";

import { selectAccount, selectAccountError } from "../../features/Account/accountSlice";

const FetchAccountProvider = ({ children }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(selectAccount);

    const error = useSelector(selectAccountError);

    const token = useSelector(state => state.authSlice.token);

    useEffect(() => {
        try {
            
            if (!token) return;

            if (token?.trim() === ';') return;

            if (token) {

                dispatch(fetchAccount());
            
            }

        } catch (error) {
            navigate('/account-error')
        }
    //eslint-disable-next-line
    }, [dispatch, token]);

    useEffect(() => {
       
        if (error) {

            navigate("/account-error"); // Redirect to login

        }
    //eslint-disable-next-line
    }, [error, dispatch]);

    if (!user) return <DashboardSkeleton />;

    return (
        <>
        {children}
        </>
    );
};

export default FetchAccountProvider;
