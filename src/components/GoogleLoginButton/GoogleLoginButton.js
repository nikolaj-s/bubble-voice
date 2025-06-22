// src/components/GoogleLoginButton.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle } from '../../features/Auth/Thunks/signInWithGoogle';

export default function GoogleLoginButton() {

    const dispatch = useDispatch();

    return (
        <div style={{borderRadius: 10, overflow: 'hidden'}}>
        <GoogleLogin
        
            onSuccess={credentialResponse => {
            // credentialResponse.credential is your ID token
            dispatch(signInWithGoogle(credentialResponse.credential));
            }}
            onError={() => {
            console.error('Google Login Failed');
            }}
        />
        </div>
    );
}
