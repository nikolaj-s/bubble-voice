import React, { useEffect, useRef, useState } from 'react';

import styles from './ConnectionIndicator.module.css';

import IconButton from '../ui/Buttons/IconButton/IconButton';

import { useSocketPing } from '../../hooks/useSocketPing';
import { useSelector } from 'react-redux';
import ConnectionDetails from '../ConnectionDetails/ConnectionDetails';

const WINDOW_MS = 30_000;

export const ConnectionIndicator = () => {

    const [samples, setSamples] = useState([]);

    const {status, connectionInfo} = useSelector(state => state.connectionSlice);

    const ping = useSocketPing(2000);
// array of { ts, ping, jitter, packetLossUp, ... }
    const mountedRef = useRef(false);

    // helper - build a sample from available sources
    const makeSample = (ts = Date.now()) => {
        const base = { ts };
        // prefer the separate ping hook if it exists; otherwise use connectionInfo.ping
        if (typeof ping === 'number' && !Number.isNaN(ping)) base.ping = ping;
        if (connectionInfo && typeof connectionInfo === 'object') {
        // copy only numeric values we care about
        if (typeof connectionInfo.jitter === 'number') base.jitter = connectionInfo.jitter;
        if (typeof connectionInfo.packetLossUp === 'number') base.packetLossUp = connectionInfo.packetLossUp;
        if (typeof connectionInfo.packetLossDown === 'number') base.packetLossDown = connectionInfo.packetLossDown;
        if (typeof connectionInfo.bitrateUp === 'number') base.bitrateUp = connectionInfo.bitrateUp;
        if (typeof connectionInfo.bitrateDown === 'number') base.bitrateDown = connectionInfo.bitrateDown;
        // ensure ping from connectionInfo is included when the separate hook is absent
        if (base.ping == null && typeof connectionInfo.ping === 'number') base.ping = connectionInfo.ping;
        }
        return base;
    };

    // seed an initial sample on mount so the graph has a value to show immediately
    useEffect(() => {
        mountedRef.current = true;
        const hasInitial = (connectionInfo && typeof connectionInfo === 'object') ||
                        (typeof ping === 'number' && !Number.isNaN(ping));
        if (hasInitial) {
        setSamples(prev => {
            // Prevent double-seeding if parent pre-provided samples somehow
            if (prev && prev.length > 0) return prev;
            return [makeSample()];
        });
        }
        return () => { mountedRef.current = false; };
        // eslint-disable-next-line
    }, []); // run once on mount

    // main updater: append a new sample whenever connectionInfo or ping changes
    useEffect(() => {
        const hasConn = connectionInfo && typeof connectionInfo === 'object';
        const hasPing = typeof ping === 'number' && !Number.isNaN(ping);
        if (!hasConn && !hasPing) return;

        const ts = Date.now();
        const newSample = makeSample(ts);

        setSamples(prev => {
        const cutoff = ts - WINDOW_MS;
        // append and prune to last WINDOW_MS
        const appended = [...(prev || []), newSample].filter(s => s && typeof s.ts === 'number' && s.ts >= cutoff);

        // optionally limit to a max count (safe-guard): keep last 200 entries
        if (appended.length > 200) return appended.slice(appended.length - 200);
        return appended;
        });
    }, [connectionInfo, ping]);

    return (
        <IconButton 
        width={'calc((var(--users-width) - 45px) / 4)'}
        padding={10}
        height={35}
        backgroundColor='var(--primary-color)'
        title={
            <>
            <ConnectionDetails ping={ping} {...connectionInfo} samples={samples} />
            </>
        }
        Icon={
        <div className={styles.connection}>
            <div
            className={styles.barOne}
            style={{
                backgroundColor:
                ping != null && ping < 300
                    ? ping < 150
                    ? 'var(--success-color)'
                    : 'var(--error-color)'
                    : null
            }}
            />
            <div
            className={styles.barTwo}
            style={{
                backgroundColor: ping != null && ping < 150 ? 'var(--success-color)' : null
            }}
            />
            <div
            className={styles.barThree}
            style={{
                backgroundColor: ping != null && ping < 80 ? 'var(--success-color)' : null
            }}
            />
        </div>
        }
        onClick={() => {}}
        />
    )
}
