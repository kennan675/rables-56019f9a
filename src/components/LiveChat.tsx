import { useEffect } from "react";

const DEFAULT_TAWK_PROPERTY_ID = "6920b705dadafd1960195a8b";
const DEFAULT_TAWK_WIDGET_ID = "1jajslrdm";

const TAWK_PROPERTY_ID = import.meta.env.VITE_TAWK_PROPERTY_ID ?? DEFAULT_TAWK_PROPERTY_ID;
const TAWK_WIDGET_ID = import.meta.env.VITE_TAWK_WIDGET_ID ?? DEFAULT_TAWK_WIDGET_ID;

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

export const LiveChat = () => {
  useEffect(() => {
    if (document.getElementById("tawk-chat-script")) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.id = "tawk-chat-script";
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.async = true;
    script.charset = "UTF-8";
    script.crossOrigin = "*";

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
    if (!firstScript) {
      document.body.appendChild(script);
    }

    return () => {
      script.remove();
      delete window.Tawk_API;
      delete window.Tawk_LoadStart;
    };
  }, []);

  return null;
};
