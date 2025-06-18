import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, setWebcam, setMicrophone, setSpeaker } from "../../../../features/Settings/Devices/deviceSlice";

import Dropdown from "../DropDown/DropDown";
import Label from "../../Titles/Label/Label";

export const DeviceSelector = ({ type }) => {

  const dispatch = useDispatch();

  const devices = useSelector((state) => state.deviceSlice[type + "s"]);

  const selectedDevice = useSelector((state) => state.deviceSlice[`selected${type.charAt(0).toUpperCase() + type.slice(1)}`]);

  useEffect(() => {
    if (!devices.length) {
      dispatch(fetchDevices());
    }
  }, [dispatch, devices]);

  const setDevice = (data) => {
    const device = devices.find((d) => d.deviceId === data.deviceId);
    if (type === "webcam") dispatch(setWebcam(device));
    if (type === "microphone") dispatch(setMicrophone(device));
    if (type === "speaker") dispatch(setSpeaker(device));
    
  };

  return (
    <>
    <Label label={`Select ${type}`} />
    <Dropdown options={devices} selected={selectedDevice} setSelected={setDevice}  minWidth="100%" />
    </>
  );
};
