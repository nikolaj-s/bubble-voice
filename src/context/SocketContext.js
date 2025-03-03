
import React, { createContext, useState, useEffect, useContext } from 'react';

import io from 'socket.io-client';

import { API_URL } from '../lib/Validation';

import { useDispatch } from 'react-redux';

import DashboardSkeleton from '../components/Loading/DashBoardSkeleton/DashBoardSkeleton';

import { clearToken, getToken } from '../lib/services/authService';

import { useNavigate } from 'react-router';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const navigate = useNavigate();

    const [socket, setSocket] = useState(null);

    const [loading, toggleLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {

        const token = getToken();

        if (!token) {

            clearToken();

            navigate("/");
        
        }

        const socketConnection = io(API_URL,{query: {
            "TOKEN": token
        }});

        socketConnection.on('connect', () => {
            console.log('Connected to socket');

            socketConnection.request = function request(type, data = {}) {
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

            toggleLoading(false);
        });

        socketConnection.on('disconnect', () => {
            console.log('Disconnected from socket');
        });

        setSocket(socketConnection);

        return () => {

            if (socketConnection) {

                socketConnection.disconnect();

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
