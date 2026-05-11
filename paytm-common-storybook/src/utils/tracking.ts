import { isH5Container, withSSRGuard } from "./utils"

const version = '__pods_version__'
const mode = '__pods_mode__'
const IP_REGEX = /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)(?::\d{0,4})?\b/

export const trackPODSUsage = withSSRGuard(() => {
  if (isTrackingEnabled()) {
    requestIdleCallback(() => {
      if (window.JSBridge) {
        callAnalyticsBridge();
        return;
      }
      document.addEventListener('JSBridgeReady', () => {
        callAnalyticsBridge();
      }, false);
    })
  }
});

const isTrackingEnabled = withSSRGuard(() => {
  return typeof window.requestIdleCallback !== "undefined" 
    && isH5Container()
    && isNotDevURL();
});

const isNotDevURL = withSSRGuard(() => {
  const location = window.location?.href
  return !(
    location.includes("localhost") 
    || location.includes("ngrok")
    || (location.match(IP_REGEX) || []).length
    || window.location?.protocol === "http:"
  ) 
});

const callAnalyticsBridge = withSSRGuard(() => {
  window.JSBridge.call(
    "paytmAnalyticsTracking",
    {
      eventName: "openScreen",
      screenName: "Mini App - PODS-React invocation",
      data: {
        vertical_name: "mini_app",
        event_category: "PODS-React invocation",
        event_action: "Event Triggered",
        event_label2: version,
        event_label3: mode,
        event_label8: (window.location || {}).href || "<NULL>"
      },
    },
    function (result) {
      // console.log(JSON.stringify(result));
    }
  );
});