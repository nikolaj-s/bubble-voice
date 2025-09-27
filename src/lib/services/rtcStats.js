// Call with an RTCPeerConnection: await summarizeRTCStats(pc)
export async function summarizeRTCStats(pc, prevSample) {
  const report = await pc.getStats();
  let inbound, outbound, remoteInbound, candidatePair, localCandidate, remoteCandidate;

  // Iterate the Map-like report
  report.forEach(stat => {
    switch (stat.type) {
      case 'inbound-rtp':
        if (!stat.isRemote && stat.kind === 'audio') inbound = inbound || stat;
        break;
      case 'outbound-rtp':
        if (stat.kind === 'audio') outbound = outbound || stat;
        break;
      case 'remote-inbound-rtp':
        if (stat.kind === 'audio') remoteInbound = remoteInbound || stat;
        break;
      case 'candidate-pair':
        if (stat.state === 'succeeded' && stat.nominated) candidatePair = stat;
        break;
      case 'local-candidate':
        localCandidate = stat.id === candidatePair?.localCandidateId ? stat : localCandidate;
        break;
      case 'remote-candidate':
        remoteCandidate = stat.id === candidatePair?.remoteCandidateId ? stat : remoteCandidate;
        break;
      default: break;
    }
  });

  // Jitter (seconds → ms) from inbound side (receiver jitter)
  const jitterMs = inbound?.jitter != null ? Math.round(inbound.jitter * 1000) : null;

  // RTT (seconds → ms). Prefer candidatePair.currentRoundTripTime, else remoteInbound.roundTripTime
  const rttMs = candidatePair?.currentRoundTripTime != null
    ? Math.round(candidatePair.currentRoundTripTime * 1000)
    : (remoteInbound?.roundTripTime != null ? Math.round(remoteInbound.roundTripTime * 1000) : null);

  // Packet loss (down = receiving; up = sending)
  const downPacketsLost = inbound?.packetsLost ?? 0;
  const downPacketsTotal = (inbound?.packetsReceived ?? 0) + downPacketsLost;
  const packetLossDownPct = downPacketsTotal ? +(100 * downPacketsLost / downPacketsTotal).toFixed(2) : null;

  const upPacketsLost = remoteInbound?.packetsLost ?? 0; // loss seen by the remote for your outbound
  const upPacketsTotal = (outbound?.packetsSent ?? 0) + upPacketsLost;
  const packetLossUpPct = upPacketsTotal ? +(100 * upPacketsLost / upPacketsTotal).toFixed(2) : null;

  // Bitrate (kbps) via deltas from previous sample
  let bitrateUpKbps = null, bitrateDownKbps = null;
  if (prevSample?.timestamp && outbound?.bytesSent != null && inbound?.bytesReceived != null) {
    const dt = (Date.now() - prevSample.timestamp) / 1000;
    if (dt > 0) {
      const dBytesUp = outbound.bytesSent - (prevSample.bytesSent ?? outbound.bytesSent);
      const dBytesDown = inbound.bytesReceived - (prevSample.bytesReceived ?? inbound.bytesReceived);
      bitrateUpKbps = Math.max(0, Math.round((dBytesUp * 8) / dt / 1000));
      bitrateDownKbps = Math.max(0, Math.round((dBytesDown * 8) / dt / 1000));
    }
  }

  // Connection details
  const conn = candidatePair ? {
    transport: candidatePair.transportId?.toUpperCase?.(), // sometimes undefined; optional
    local: localCandidate ? `${localCandidate.protocol?.toUpperCase?.() || 'UDP'} ${localCandidate.candidateType} ${localCandidate.ip || localCandidate.address}:${localCandidate.port}` : null,
    remote: remoteCandidate ? `${remoteCandidate.protocol?.toUpperCase?.() || 'UDP'} ${remoteCandidate.candidateType} ${remoteCandidate.ip || remoteCandidate.address}:${remoteCandidate.port}` : null,
  } : null;

  return {
    jitterMs,
    rttMs,
    packetLossUpPct,
    packetLossDownPct,
    bitrateUpKbps,
    bitrateDownKbps,
    connection: conn,
    // stash fields for next delta calc
    _sample: {
      timestamp: Date.now(),
      bytesSent: outbound?.bytesSent,
      bytesReceived: inbound?.bytesReceived
    }
  };
}
