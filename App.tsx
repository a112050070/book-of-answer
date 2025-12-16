import React, { useState, useCallback } from 'react';
import { AppState } from './types';
import { fetchAnswerFromAI } from './services/aiService';
import RetroButton from './components/RetroButton';
import RetroInput from './components/RetroInput';
import LoadingEffect from './components/LoadingEffect';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');

  // Handle the "Get Answer" click
  const handleConsultOracle = useCallback(async () => {
    // 1. Transition to Loading (Ceremony)
    setState(AppState.LOADING);
    setAnswer(''); // Clear previous answer

    // 2. Perform API call
    // Spec says 1-3 seconds animation. We fetch first, but ensure at least 2s delay for "ritual".
    const minDelay = new Promise(resolve => setTimeout(resolve, 2000));
    const apiCall = fetchAnswerFromAI(query);

    try {
      const [fetchedAnswer] = await Promise.all([apiCall, minDelay]);
      setAnswer(fetchedAnswer);
      setState(AppState.REVEALED);
    } catch (e) {
      console.error(e);
      setAnswer("訊號干擾，請重試。"); // Should be covered by service fallback, but just in case
      setState(AppState.REVEALED);
    }
  }, [query]);

  // Handle "Ask Again"
  const handleReset = useCallback(() => {
    setQuery('');
    setAnswer('');
    setState(AppState.IDLE);
  }, []);

  return (
    <div className="min-h-screen w-full retro-grid flex items-center justify-center p-4 md:p-8 text-white relative">
      
      {/* Decorative Background Elements (8-bit stars/grid) */}
      <div className="absolute top-10 left-10 text-cyan-600 opacity-50 animate-bounce">★</div>
      <div className="absolute bottom-20 right-20 text-pink-600 opacity-50 animate-bounce delay-700">✚</div>
      
      {/* Main Card Container */}
      <div className="w-full max-w-lg relative">
        
        {/* Card Header / Title */}
        <div className="bg-black border-4 border-white border-b-0 p-4 text-center z-10 relative pixel-shadow">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 tracking-tighter shadow-white drop-shadow-md" 
              style={{ textShadow: '2px 2px 0px #000' }}>
            AI BOOK OF ANSWERS
          </h1>
          <p className="text-[10px] md:text-xs text-slate-400 mt-2 tracking-[0.2em] uppercase">
            Ver 1.0 // 2025
          </p>
        </div>

        {/* Card Body */}
        <div className="bg-slate-800 border-4 border-white p-6 md:p-10 pixel-shadow relative min-h-[400px] flex flex-col justify-between">
          
          {/* STATE: IDLE (Input) */}
          {state === AppState.IDLE && (
            <div className="flex flex-col h-full justify-between space-y-8 animate-in fade-in duration-500">
              <div className="space-y-4">
                <p className="text-sm md:text-base text-cyan-200 leading-6">
                  心中默念你的問題，<br/>
                  或者將它輸入下方的方框中。<br/>
                  當你準備好接受宇宙的指引時，<br/>
                  按下按鈕。
                </p>
                <div className="h-px w-full bg-slate-600 my-4"></div>
              </div>

              <div className="flex-grow flex items-center">
                 <RetroInput 
                   value={query} 
                   onChange={setQuery} 
                   placeholder="在此輸入問題 (選填)..."
                 />
              </div>

              <div className="mt-8">
                <RetroButton 
                  label="尋求解答" 
                  onClick={handleConsultOracle} 
                  color="cyan"
                />
              </div>
            </div>
          )}

          {/* STATE: LOADING (Ceremony) */}
          {state === AppState.LOADING && (
             <div className="flex-grow flex items-center justify-center h-full">
               <LoadingEffect />
             </div>
          )}

          {/* STATE: REVEALED (Answer) */}
          {state === AppState.REVEALED && (
            <div className="flex flex-col h-full justify-between animate-in zoom-in-95 duration-500">
              
              <div className="text-center space-y-2">
                 <h2 className="text-slate-400 text-xs uppercase tracking-widest">The Oracle Speaks:</h2>
              </div>

              <div className="flex-grow flex items-center justify-center py-8">
                <div className="relative p-6 border-2 border-dashed border-pink-500/50 bg-slate-900/50 w-full text-center">
                   {/* Decorative corners */}
                   <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-pink-500"></span>
                   <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-pink-500"></span>
                   <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-pink-500"></span>
                   <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-pink-500"></span>

                   <p className="text-2xl md:text-4xl leading-relaxed font-bold text-white drop-shadow-[0_0_10px_rgba(255,0,153,0.5)]">
                     {answer}
                   </p>
                </div>
              </div>

              <div className="mt-8">
                <RetroButton 
                  label="再問一次" 
                  onClick={handleReset} 
                  color="pink"
                />
              </div>
            </div>
          )}

        </div>
        
        {/* Footer / Credits */}
        <div className="mt-4 text-center text-[10px] text-slate-600 uppercase tracking-widest">
           Powered by OpenRouter & Gemma
        </div>
      </div>
    </div>
  );
};

export default App;