import { useEffect, useState } from "react";

export const PageLoader = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      const timer = setTimeout(() => setIsActive(false), 450);
      return () => clearTimeout(timer);
    };

    const cleanup = handleLoad();
    window.addEventListener("load", handleLoad);

    return () => {
      cleanup?.();
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <div className="page-loader" aria-live="polite" aria-label="Loading Rable Bakes">
      <div className="page-loader__backdrop" />
      <div className="page-loader__ring">
        <span className="page-loader__spark" />
        <span className="page-loader__spark page-loader__spark--tail" />
      </div>
      <div className="page-loader__mark">
        <span className="page-loader__initial">R</span>
        <span className="page-loader__name">Rable Bakes</span>
        <span className="page-loader__tag">Crafting sweet memories</span>
      </div>
    </div>
  );
};

export default PageLoader;
