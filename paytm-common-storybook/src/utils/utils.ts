export const withSSRGuard = (fn: any, ...args: any) => {
	return () => {
		if (typeof window === "undefined") {
			return
		}
		return triggerCallback(fn, args)
	}
}

export const checkUndefined = (value: any) => {
    /* eslint-disable-next-line */
    if (value === undefined || value === null || value === '' || !value || (typeof value === 'string' && value.trim() === '' && value !== "Not Applicable") || value === "javascript://") {
        return false;
    }
    return true;
};

export const mThrottle = (func: (e: any) => void, wait: number = 1500) => {
  let isActive = true;
  let timeout: NodeJS.Timeout | null | undefined = null;
  return (mData: any) => {
      if (isActive) {
          isActive = false;
          func(mData);
          timeout = setTimeout(() => {
              isActive = true;
              if (timeout) {
                clearTimeout(timeout);
              }
          }, wait);
      }
  };
};

export const getMobileOperatingSystem = withSSRGuard(() => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
      return "windows";
  }

  if (/android/i.test(userAgent)) {
      return "android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return "ios";
  }

  return "android";
});

export const hideAlertActions = ['pods', 'knowMore', 'faqs', 'iconListRow', 'customComponent'];

export const triggerCallback = (callback: any, ...args: any) => {
    if (callback && typeof callback === "function") {
        return callback(...args)
    }
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const rgbToHex = (rgb: number[]) => '#' + rgb.map(x => {
    const hex = x.toString(16).toUpperCase();
    return hex.length === 1 ? '0' + hex : hex
}).join('')
  
export const debounce = (func: Function, timeout = 200) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any) => {
        clearTimeout(timer);
        if (args[0]?.nativeEvent && args[0]?.persist) {
            args[0].persist();
        }
        timer = setTimeout(() => {func(...args)}, timeout);
    };
}

export const getObjectKeyLength = (obj: {[x: string]: any} = {}) => Object.keys(obj)?.length || 0

export const onEnter = (e: React.KeyboardEvent, cb: any) => {
    if (e.key === "Enter") {
        triggerCallback(cb)
    }
}

export const isBrowser = withSSRGuard(() =>
  typeof window !== "undefined" && typeof window.document !== "undefined");

export const isH5Container = withSSRGuard(() => {
  return isBrowser() && /AppContainer/i.test(window.navigator?.userAgent);
});