import { useEffect } from 'react';

interface GifCurtainProps {
  onComplete: () => void;
  opening?: boolean;
}

export function GifCurtain({ onComplete, opening = false }: GifCurtainProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2000);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`gif-curtain ${opening ? 'gif-curtain-opening' : ''}`} aria-hidden="true">
      <div className="gif-curtain-image-wrap">
        <img className="gif-curtain-image" src="/digiguard_&_cerebro.gif" alt="" />
      </div>
      <div className="gif-curtain-sheen" />
    </div>
  );
}
