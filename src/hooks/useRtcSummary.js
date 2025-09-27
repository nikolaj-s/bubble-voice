import { useEffect, useRef, useState } from 'react';
import { summarizeRTCStats } from '../lib/services/rtcStats';
import { useDispatch } from 'react-redux';
import { setConnectionInfo } from '../features/Connection/connectionSlice';

export function useRtcSummary(pc, intervalMs = 1000) {

    const dispatch = useDispatch();
  const [summary, setSummary] = useState(null);
  const prevRef = useRef(null);

  useEffect(() => {

    if (!pc) return;

    let t;

    const tick = async () => {
      try {
        const res = await summarizeRTCStats(pc, prevRef.current);
        prevRef.current = res._sample;
        setSummary(res);
        dispatch(setConnectionInfo(res))
      } catch {}
      t = setTimeout(tick, intervalMs);
    };

    tick();

    return () => clearTimeout(t);
  }, [pc, intervalMs]);
 
  return summary;
}
