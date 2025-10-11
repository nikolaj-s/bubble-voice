export function isDesktop() {
  const ua = navigator.userAgent;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(ua);
  const isWideScreen = window.innerWidth >= 1024;
  return !isMobileUA && isWideScreen;
}