import React, { useEffect, useState } from 'react';

const LoadingEffect: React.FC = () => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate dots
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + 2));
    }, 30);

    return () => {
      clearInterval(dotInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-pulse">
      {/* 8-bit Book/Disk Icon (CSS Art) */}
      <div className="w-16 h-16 border-4 border-cyan-400 bg-cyan-900 relative rotate-45 mb-4">
         <div className="absolute inset-2 border-2 border-cyan-200"></div>
         <div className="absolute top-1/2 left-0 right-0 h-1 bg-cyan-400 -translate-y-1/2"></div>
      </div>

      <div className="text-cyan-400 text-xl tracking-widest uppercase">
        Consulting Oracle{dots}
      </div>

      {/* Retro Loading Bar */}
      <div className="w-full h-6 border-2 border-cyan-500 p-1">
        <div 
          className="h-full bg-pink-500 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-slate-500 uppercase mt-2">Connecting to Dimension 3N-E2B...</p>
    </div>
  );
};

export default LoadingEffect;