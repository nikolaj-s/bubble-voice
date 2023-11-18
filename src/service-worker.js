
const sleep_detection_worker = new Worker("./DetectWakeUp.js");

sleep_detection_worker.onmessage = function(ev) {
  if (ev && ev.data === 'wakeup') {
    window.location.reload();
  }
}
