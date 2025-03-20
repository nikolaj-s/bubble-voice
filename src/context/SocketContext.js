
import React, { createContext, useState, useEffect, useContext } from 'react';

import io from 'socket.io-client';

import { API_URL } from '../lib/Validation';

import DashboardSkeleton from '../components/Loading/DashBoardSkeleton/DashBoardSkeleton';

import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const navigate = useNavigate();

    const [socket, setSocket] = useState(null);

    const [loading, toggleLoading] = useState(true);

    const token = useSelector(state => state.authSlice.token);

    useEffect(() => {


        if (!token) {

            return navigate('/login');
        
        }

        const socket = io(API_URL,{query: {
            "TOKEN": token
        }});

        socket.request = function request(type, data = {}) {
            return new Promise((resolve, reject) => {
                socket.emit(type, data, (data) => {
                    if (data.error) {
                    reject(data.errorMessage);
                    } else {
                    resolve(data);
                    }
                })
            })
        }

        socket.on('connect', () => {
            console.log('Connected to socket');

            toggleLoading(false);
        });

        socket.on("duplicate_connection", (message) => {
            alert("You have been disconnected due to duplicate connection");
            socket.disconnect();
        })

        socket.on('disconnect', (reason) => {
            console.log('Disconnected from socket', reason);
        });

        setSocket(socket);

        return () => {

            if (socket) {

                socket.disconnect();

                setSocket(null);
            }

        };

    }, []);

    if (loading) {

        return <DashboardSkeleton />

    }

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
