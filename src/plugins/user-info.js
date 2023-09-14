function isMobile() {
  return /Mobi/.test(navigator.userAgent);
}

function getOSName() {
  let OSName = 'Unknown OS';
  if (navigator.appVersion.indexOf('Win') !== -1) OSName = 'Windows';
  if (navigator.appVersion.indexOf('Mac') !== -1) OSName = 'MacOS';
  if (navigator.appVersion.indexOf('X11') !== -1) OSName = 'UNIX';
  if (navigator.appVersion.indexOf('Linux') !== -1) OSName = 'Linux';
  if (navigator.appVersion.indexOf('Linux x86_64') !== -1) OSName = 'Ubuntu';

  return OSName;
}

function getBrowserNameAndVersion() {
  const nAgt = navigator.userAgent;
  let browserName = navigator.appName;
  let fullVersion = `${parseFloat(navigator.appVersion)}`;
  let verOffset;
  let ix;

  verOffset = nAgt.indexOf('Opera');
  if (verOffset !== -1) {
    browserName = 'Opera';
    fullVersion = nAgt.substring(verOffset + 6);

    verOffset = nAgt.indexOf('Version');
    if (verOffset !== -1) {
      fullVersion = nAgt.substring(verOffset + 8);
    }
  } else if (nAgt.indexOf('MSIE') !== -1) {
    browserName = 'Microsoft Internet Explorer';
    fullVersion = nAgt.substring(nAgt.indexOf('MSIE') + 5);
  } else if (nAgt.indexOf('Edg/') !== -1) {
    browserName = 'Edge';
    fullVersion = nAgt.substring(nAgt.indexOf('Edg') + 4);
  } else if (nAgt.indexOf('Chrome') !== -1) {
    browserName = 'Chrome';
    fullVersion = nAgt.substring(nAgt.indexOf('Chrome') + 7);
  } else if (nAgt.indexOf('Safari') !== -1) {
    browserName = 'Safari';
    fullVersion = nAgt.substring(nAgt.indexOf('Safari') + 7);

    if (nAgt.indexOf('Version') !== -1) {
      fullVersion = nAgt.substring(nAgt.indexOf('Version') + 8);
    }
  } else if (nAgt.indexOf('Firefox') !== -1) {
    browserName = 'Firefox';
    fullVersion = nAgt.substring(nAgt.indexOf('Firefox') + 8);
  } else if ((nAgt.lastIndexOf(' ') + 1) < (nAgt.lastIndexOf('/'))) {
    browserName = nAgt.substring(nAgt.lastIndexOf(' ') + 1, nAgt.lastIndexOf('/'));
    fullVersion = nAgt.substring(nAgt.lastIndexOf('/') + 1);

    if (browserName.toLowerCase() === browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }

  ix = fullVersion.indexOf(';');
  if (ix !== -1) {
    fullVersion = fullVersion.substring(0, ix);
  }

  ix = fullVersion.indexOf(' ');
  if (ix !== -1) {
    fullVersion = fullVersion.substring(0, ix);
  }

  return {
    browser_name: browserName,
    browser_version: fullVersion,
  };
}

function androidVersion() {
  if (/Android/.test(navigator.appVersion)) {
    const v = (navigator.appVersion).match(/Android (\d+).(\d+)/);
    return v;
  }

  return false;
}

function iOSVersion() {
  if (/iP(hone|od|ad)/.test(navigator.appVersion)) {
    const v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }

  return false;
}

function getOSFullName() {
  let os;
  if (isMobile()) {
    if (/Windows/.test(navigator.userAgent)) {
      os = 'Windows';
      if (/Phone 8.0/.test(navigator.userAgent)) {
        os += ' Phone 8.0';
      } else if (/Phone 10.0/.test(navigator.userAgent)) {
        os += ' Phone 10.0';
      }
    } else if (/Android/.test(navigator.userAgent)) {
      const ver = androidVersion();
      [os] = ver;
    } else if (/iPhone;/.test(navigator.userAgent)) {
      const ver = iOSVersion();
      os = `iOS ${ver[0]}.${ver[1]}.${ver[2]}`;
    } else if (/iPad;/.test(navigator.userAgent)) {
      const ver = iOSVersion();
      os = `iOS ${ver[0]}.${ver[1]}.${ver[2]}`;
    } else if (/BBd*/.test(navigator.userAgent)) {
      os = 'BlackBerry';
    }
  } else if (/Windows/.test(navigator.userAgent)) {
    os = 'Windows';
    if (/5.1;/.test(navigator.userAgent)) {
      os += ' XP';
    } else if (/6.0;/.test(navigator.userAgent)) {
      os += ' Vista';
    } else if (/6.1;/.test(navigator.userAgent)) {
      os += ' 7';
    } else if (/6.2/.test(navigator.userAgent)) {
      os += ' 8';
    } else if (/10.0;/.test(navigator.userAgent)) {
      os += ' 10';
    }

    if (/64/.test(navigator.userAgent)) {
      os += ' 64-bit';
    } else {
      os += ' 32-bit';
    }
  } else if (/Macintosh/.test(navigator.userAgent)) {
    os = 'Macintosh';
    if (/OS X/.test(navigator.userAgent)) {
      os += ' OS X';
    }
  }

  return os;
}

function getUserInfo() {
  return {
    ...getBrowserNameAndVersion(),
    browser_resolution: `${window.innerWidth} x ${window.innerHeight}`,
    device: isMobile() ? 'Mobile' : 'Desktop',
    language: navigator.language,
    languages: navigator.languages,
    os: getOSName(),
    os_full: getOSFullName(),
    screen_resolution: `${window.screen.width} x ${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

module.exports = {
  getUserInfo: getUserInfo(),
};
