import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import DesktopApp from './DesktopApp.jsx';
import MobileApp from './MobileApp.jsx';
import './styles.css';

function usePortrait() {
  const getPortrait = () => window.matchMedia('(orientation: portrait)').matches;
  const [portrait, setPortrait] = useState(getPortrait);

  useEffect(() => {
    const media = window.matchMedia('(orientation: portrait)');
    const update = () => setPortrait(media.matches);
    media.addEventListener?.('change', update);
    window.addEventListener('resize', update);
    return () => {
      media.removeEventListener?.('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return portrait;
}

function App() {
  const portrait = usePortrait();
  return portrait ? <MobileApp /> : <DesktopApp />;
}

createRoot(document.getElementById('root')).render(<App />);
