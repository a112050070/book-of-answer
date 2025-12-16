import React from 'react';

interface RetroButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  color?: 'cyan' | 'pink';
}

const RetroButton: React.FC<RetroButtonProps> = ({ onClick, label, disabled = false, color = 'cyan' }) => {
  // Styles based on the retro gaming palette
  const baseClasses = "w-full py-4 text-center cursor-pointer transition-transform active:scale-95 select-none relative group";
  
  const colorClasses = color === 'cyan' 
    ? "bg-cyan-500 hover:bg-cyan-400 text-black border-cyan-700"
    : "bg-pink-500 hover:bg-pink-400 text-white border-pink-700";

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Pixelated Shadow/Edge */}
      <div className={`absolute inset-0 translate-y-2 translate-x-2 bg-black`}></div>
      
      {/* Main Button Body */}
      <div className={`relative border-2 border-black ${colorClasses} font-bold tracking-widest text-lg md:text-xl flex items-center justify-center h-full`}>
        {label}
      </div>
    </button>
  );
};

export default RetroButton;