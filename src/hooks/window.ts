import { useEffect, useRef, useMemo } from "react";

export function useNotification(title: string, condition: boolean) {
  useEffect(() => {
    if (Notification.permission === "default") Notification.requestPermission();
  }, []);

  useEffect(() => {
    if (condition) {
      new Notification(title);
    }
  }, [title, condition]);
}

export function useAskBeforeClose(title: string, condition: boolean) {
  useEffect(() => {
    if (condition) {
      window.onbeforeunload = function (e: BeforeUnloadEvent) {
        e = e || window.event;
        if (e) {
          e.returnValue = title;
        }
        return title;
      };
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [condition, title]);
}

export function usePageTitle(title: string, condition: boolean) {
  const oldTitle = useRef(window.document.title);
  useEffect(() => {
    if (condition) {
      window.document.title = title;
    }
    return () => {
      window.document.title = oldTitle.current;
    };
  }, [title, condition]);
}

export function useSoundNotice(src: string, condition: boolean) {
  const audio = useMemo(() => new Audio(src), [src]);
  useEffect(() => {
    if (condition) audio.play();
  }, [src, condition]);
}
