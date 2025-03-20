import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch devices as a thunk
export const fetchDevices = createAsyncThunk("deviceSlice/fetchDevices", async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();

  return devices
    .filter((d) => ["audioinput", "audiooutput", "videoinput"].includes(d.kind))
    .map((device) => ({
      deviceId: device.deviceId,
      label: device.label || "Unnamed Device",
      kind: device.kind,
    })); // ✅ Only storing serializable data
});

const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState: {
    webcams: [],
    microphones: [],
    speakers: [],
    selectedWebcam: null,
    selectedMicrophone: null,
    selectedSpeaker: null,
  },
  reducers: {
    setWebcam: (state, action) => {
      state.selectedWebcam = action.payload;
      localStorage.setItem("selectedWebcam", JSON.stringify(action.payload)); // ✅ Save to localStorage
    },
    setMicrophone: (state, action) => {
      state.selectedMicrophone = action.payload;
      localStorage.setItem("selectedMicrophone", JSON.stringify(action.payload));
    },
    setSpeaker: (state, action) => {
      state.selectedSpeaker = action.payload;
      localStorage.setItem("selectedSpeaker", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.webcams = action.payload.filter((d) => d.kind === "videoinput");
      state.microphones = action.payload.filter((d) => d.kind === "audioinput");
      state.speakers = action.payload.filter((d) => d.kind === "audiooutput");

      // Load saved devices or set default
      state.selectedWebcam = JSON.parse(localStorage.getItem("selectedWebcam")) || state.webcams[0] || null;
      state.selectedMicrophone = JSON.parse(localStorage.getItem("selectedMicrophone")) || state.microphones[0] || null;
      state.selectedSpeaker = JSON.parse(localStorage.getItem("selectedSpeaker")) || state.speakers[0] || null;
    });
  },
});

export const { setWebcam, setMicrophone, setSpeaker } = deviceSlice.actions;
export default deviceSlice.reducer;

