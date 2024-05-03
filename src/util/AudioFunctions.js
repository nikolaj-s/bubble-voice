const frequencyToIndex = (frequency, sampleRate, frequencyBinCount) => {

    let nyquist = sampleRate / 2;
    
    let index = Math.round(frequency / nyquist * frequencyBinCount);

    return Math.min(Math.max(index, 0), frequencyBinCount);

}

export const analyserFrequencyAverage = (div, analyser, frequencies, minHz, maxHz) => {
    
    let sampleRate = analyser.context.sampleRate;

    let binCount = analyser.frequencyBinCount;

    let start = frequencyToIndex(minHz, sampleRate, binCount);

    let end = frequencyToIndex(maxHz, sampleRate, binCount);

    let count = end - start;

    let sum = 0;

    for (; start < end; start ++) {
        sum += frequencies[start] / div;
    }
    
    return count === 0 ? 0 : (sum / count);

}