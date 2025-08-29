// PWA 설치 관련 유틸리티

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export const isPWAInstalled = (): boolean => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as NavigatorWithStandalone).standalone === true
  );
};

export const isPWAInstallable = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface WindowWithDeferredPrompt extends Window {
  deferredPrompt?: BeforeInstallPromptEvent;
}

export const showInstallPrompt = (): void => {
  // PWA 설치 프롬프트 표시
  const deferredPrompt = (window as WindowWithDeferredPrompt).deferredPrompt;
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA 설치됨');
      }
      (window as WindowWithDeferredPrompt).deferredPrompt = undefined;
    });
  }
};

export const registerPWAInstallListener = (callback: () => void): void => {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    (window as WindowWithDeferredPrompt).deferredPrompt =
      e as BeforeInstallPromptEvent;
    callback();
  });
};

// 웹뷰 감지
export const isWebView = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return (
    userAgent.includes('wv') || // Android WebView
    (userAgent.includes('mobile') &&
      userAgent.includes('safari') &&
      !userAgent.includes('chrome'))
  ); // iOS WebView
};

// 모바일 감지
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// 터치 이벤트 최적화
export const addTouchOptimization = (): void => {
  // 터치 이벤트 최적화를 위한 CSS 클래스 추가
  document.body.classList.add('touch-optimized');

  // 터치 이벤트 리스너 추가
  document.addEventListener(
    'touchstart',
    () => {
      // 터치 이벤트 최적화
    },
    { passive: true }
  );
  document.addEventListener(
    'touchmove',
    () => {
      // 터치 이벤트 최적화
    },
    { passive: true }
  );
  document.addEventListener(
    'touchend',
    () => {
      // 터치 이벤트 최적화
    },
    { passive: true }
  );
};

// 화면 방향 감지
export const getScreenOrientation = (): 'portrait' | 'landscape' => {
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

// 화면 방향 변경 리스너
export const addOrientationChangeListener = (
  callback: (orientation: 'portrait' | 'landscape') => void
): void => {
  const handleOrientationChange = () => {
    callback(getScreenOrientation());
  };

  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', handleOrientationChange);
};

// PWA 상태 확인
export const getPWAStatus = () => {
  return {
    isInstalled: isPWAInstalled(),
    isInstallable: isPWAInstallable(),
    isWebView: isWebView(),
    isMobile: isMobile(),
    orientation: getScreenOrientation(),
  };
};
