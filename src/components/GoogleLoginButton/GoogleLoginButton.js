import React, { useEffect, useState, useCallback } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../features/Auth/Thunks/signInWithGoogle';

import styles from './GoogleLoginButton.module.css';

export default function GoogleLoginButton() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helpers to detect electron API surface that you might have exposed in preload.js
  const hasElectronAuth = typeof window !== 'undefined' && !!window.electronAuth && typeof window.electronAuth.startGoogleOAuth === 'function';
  const hasLegacyIpc = typeof window !== 'undefined' && !!window.electron && !!window.electron.ipcRenderer;

  // Unified success handler: dispatch to your thunk with id_token (preferred) or access_token.
  const handleSuccessPayload = useCallback((payload) => {
    setLoading(false);
    setError(null);

    if (!payload || !payload.tokens) {
      setError('Invalid auth payload');
      return;
    }

    // Prefer id_token for server-side verification; fallback to access_token if needed.
    const idToken = payload.tokens.id_token;
    const accessToken = payload.tokens.access_token;

    const credentialToSend = idToken || accessToken;
    if (!credentialToSend) {
      setError('No token received from Google');
      return;
    }

    // dispatch your thunk. adapt to your thunk signature if needed.
    // If your thunk expects a plain string credential: pass credentialToSend
    // If it expects an object, adjust accordingly.
    dispatch(signInWithGoogle(credentialToSend));
  }, [dispatch]);

  const handleFailurePayload = useCallback((payload) => {
    console.log(payload)
    setLoading(false);
    const message = (payload && (payload.error || payload.message)) ? (payload.error || payload.message) : 'OAuth failed';
    setError(typeof message === 'string' ? message : JSON.stringify(message));
  }, []);

  // Attach listeners once on mount; cleanup on unmount.
  useEffect(() => {
    // If preload provided convenience functions that internally call ipcRenderer.on:
    if (hasElectronAuth) {
      // The preload's onSuccess/onFailure add listeners internally; prefer them if present.
      // Note: these wrapper functions may not expose removal — that depends on your preload implementation.
      // We still add them for convenience; they will be active for the app lifetime.
      try {
        window.electronAuth.onSuccess((payload) => {
          handleSuccessPayload(payload);
        });
        window.electronAuth.onFailure((payload) => {
          handleFailurePayload(payload);
        });
      } catch (e) {
        // ignore if the preload wrapper doesn't allow registering
        // we'll fall back to direct ipcRenderer below if available
      }
    }

    // If a direct ipcRenderer was exposed (legacy) we can add/remove listeners cleanly
    if (hasLegacyIpc) {
      const { ipcRenderer } = window.electron;
      const successHandler = (_, payload) => handleSuccessPayload(payload);
      const failureHandler = (_, payload) => handleFailurePayload(payload);

      ipcRenderer.on('google-oauth-success', successHandler);
      ipcRenderer.on('google-oauth-failed', failureHandler);

      return () => {
        try {
          ipcRenderer.removeListener('google-oauth-success', successHandler);
          ipcRenderer.removeListener('google-oauth-failed', failureHandler);
        } catch (e) {
          // ignore removal errors
        }
      };
    }

    // If neither path supports removal, still return a no-op cleanup to satisfy hook
    return () => {};
  }, [hasElectronAuth, hasLegacyIpc, handleSuccessPayload, handleFailurePayload]);

  // Trigger the electron-auth flow
  const startElectronSignin = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (hasElectronAuth) {
        // preferred: your preload exposed a safe API (contextBridge)
        // The invoke returns a minimal result; the full payload comes via the event handler above.
        await window.electronAuth.startGoogleOAuth();
        // keep loading until event arrives
      } else if (hasLegacyIpc) {
        // fallback: direct ipcRenderer invoke
        const res = await window.electron.ipcRenderer.invoke('start-google-oauth');
        // res is minimal {ok:true/false}
        if (res && res.ok === false) {
          setLoading(false);
          setError(res.error || 'Failed to start OAuth');
        }
        // otherwise wait for the event from main process
      } else {
        setLoading(false);
        setError('No electron auth API available');
      }
    } catch (err) {
      setLoading(false);
      setError(err && err.message ? err.message : String(err));
    }
  }, [hasElectronAuth, hasLegacyIpc]);

  // UI: if an electron environment is present render a native button; otherwise render the GoogleLogin web component
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden' }}>
      { (hasElectronAuth || hasLegacyIpc) ? (
        <div className={styles.electronContainer ?? ''}>
          <button
            className={styles.electronButton ?? ''}
            onClick={startElectronSignin}
            disabled={loading}
            type="button"
          >
            {loading ? 'Signing in…' : 'Sign in with Google'}
          </button>

          {error && <div className={styles.error ?? ''} role="alert">{JSON.stringify(error)}</div>}

          {/* optional: small UX note */}
          <div className={styles.hint ?? ''} style={{ fontSize: 12, marginTop: 8 }}>
            The system browser will open to complete sign in.
          </div>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={credentialResponse => {
            // credentialResponse.credential is an ID token
            if (credentialResponse && credentialResponse.credential) {
              dispatch(signInWithGoogle(credentialResponse.credential));
            } else {
              console.error('Google Login: no credential in response', credentialResponse);
            }
          }}
          onError={() => {
            console.error('Google Login Failed');
            setError('Google Login Failed');
          }}
        />
      )}
    </div>
  );
}
