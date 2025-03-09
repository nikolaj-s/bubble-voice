
import React, { createContext, useState, useEffect, useContext } from 'react';

import io from 'socket.io-client';

import { API_URL } from '../lib/Validation';

import { useDispatch, useSelector } from 'react-redux';

import DashboardSkeleton from '../components/Loading/DashBoardSkeleton/DashBoardSkeleton';

import { clearToken, getToken } from '../lib/services/authService';

import { useNavigate } from 'react-router';

import { selectServers } from '../features/Servers/serversSlice';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const navigate = useNavigate();

    const [socket, setSocket] = useState(null);

    const [loading, toggleLoading] = useState(true);

    useEffect(() => {

        const token = getToken();

        if (!token) {

            clearToken();

            navigate("/");
        
        }

        const socket = io(API_URL,{query: {
            "TOKEN": token
        }});

        socket.on('connect', () => {
            console.log('Connected to socket');

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
