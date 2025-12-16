import React from 'react';

interface RetroInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const RetroInput: React.FC<RetroInputProps> = ({ value, onChange, placeholder, disabled }) => {
  return (
    <div className="relative w-full">
      {/* Label Decoration */}
      <div className="absolute -top-3 left-4 bg-[#0f172a] px-2 text-cyan-400 text-xs tracking-widest z-10">
        INPUT_QUERY
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        rows={4}
        className="w-full bg-slate-900 border-4 border-slate-700 text-cyan-100 p-4 focus:outline-none focus:border-cyan-500 transition-colors resize-none text-base md:text-lg leading-relaxed placeholder-slate-600 font-sans"
        style={{ fontFamily: "'Press Start 2P', cursive" }}
      />
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-500"></div>
      <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-500"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-500"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-500"></div>
    </div>
  );
};

export default RetroInput;