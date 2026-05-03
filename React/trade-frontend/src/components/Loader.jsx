import { useEffect, useState } from 'react';
import './Loader.css';

function Loader() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1600);
    const hideTimer = setTimeout(() => setHidden(true), 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`loader-overlay${fading ? ' fade-out' : ''}`}>
      <div className="loader-brand">
        <span className="loader-brand-dot" />
        Tradiary
      </div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
      <span className="loader-label"></span>
    </div>
  );
}

export default Loader;
