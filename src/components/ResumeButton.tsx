import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeFilePath } from '../constants.ts';

type ViewMode = 'none' | 'selection' | 'viewer' | 'confirm_download';

export const ResumeButton: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('none');
  
  const pdfPath = resumeFilePath;
  const fileName = pdfPath.split('/').pop() || 'EiThinzarMyo_Resume.pdf';

  // Handle Scroll Lock and Global Nav suppression based on active mode
  useEffect(() => {
    const isModalActive = viewMode !== 'none';
    if (isModalActive) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
      document.body.style.touchAction = 'none';
      window.dispatchEvent(new CustomEvent('resume-viewer-toggle', { detail: true }));
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
      document.body.style.touchAction = 'auto';
      window.dispatchEvent(new CustomEvent('resume-viewer-toggle', { detail: false }));
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
      document.body.style.touchAction = 'auto';
      window.dispatchEvent(new CustomEvent('resume-viewer-toggle', { detail: false }));
    };
  }, [viewMode]);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setViewMode('none');
  };

  const handlePopOut = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      // We set the tab title to the requested "EiThinzarMyo.pdf"
      // and wrap the PDF in a full-screen iframe for a professional, branded look.
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>EiThinzarMyo.pdf</title>
            <style>
              body, html { 
                margin: 0; 
                padding: 0; 
                height: 100%; 
                width: 100%; 
                overflow: hidden; 
                background-color: #020617; /* Matches your site background */
              }
              iframe { 
                width: 100%; 
                height: 100%; 
                border: none;
                display: block;
              }
            </style>
          </head>
          <body>
            <iframe src="${window.location.origin}/${pdfPath}#view=FitH"></iframe>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12"
      >
        <motion.button 
          onClick={() => setViewMode('selection')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3 mx-auto group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <i className="fa-solid fa-file-pdf text-lg group-hover:rotate-12 transition-transform"></i>
          Resume Options
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* SELECTION MODAL */}
        {viewMode === 'selection' && (
          <div key="selection-modal" className="fixed inset-0 z-[210] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
              onClick={() => setViewMode('none')}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full shadow-2xl text-center"
            >
              <button 
                onClick={() => setViewMode('none')}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase leading-none">Resume Portal</h3>
              <p className="text-slate-500 text-[10px] mb-10 font-bold uppercase tracking-[0.3em]">Accessing: {fileName}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setViewMode('viewer')}
                  className="group relative p-8 bg-slate-800/50 border border-white/5 rounded-3xl hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-left flex flex-col h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-eye text-2xl text-indigo-400"></i>
                  </div>
                  <h4 className="text-xl font-black text-white mb-2">View Preview</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed uppercase tracking-wider">In-app interactive view</p>
                </button>

                <button 
                  onClick={() => setViewMode('confirm_download')}
                  className="group relative p-8 bg-slate-800/50 border border-white/5 rounded-3xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left flex flex-col h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-download text-2xl text-emerald-400"></i>
                  </div>
                  <h4 className="text-xl font-black text-white mb-2">Download PDF</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed uppercase tracking-wider">Save file to device</p>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* DOWNLOAD CONFIRMATION MODAL */}
        {viewMode === 'confirm_download' && (
          <div key="confirm-modal" className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl"
              onClick={() => setViewMode('selection')}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-emerald-500/5 rounded-full"
                />
                <i className="fa-solid fa-cloud-arrow-down text-3xl text-emerald-400 relative z-10"></i>
              </div>

              <h3 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase">Ready to Download?</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Confirming download of: <span className="text-white font-bold block mt-1">{fileName}</span>
              </p>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={triggerDownload}
                  className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <i className="fa-solid fa-check-circle"></i>
                  Yes, Download
                </button>
                <button 
                  onClick={() => setViewMode('selection')}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all border border-white/5"
                >
                  No, Go Back
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* INTERACTIVE PREVIEW - FULL SCREEN */}
        {viewMode === 'viewer' && (
          <div key="viewer-modal" className="fixed inset-0 z-[220] flex items-center justify-center overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950"
              onClick={() => setViewMode('selection')}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-slate-900 w-full h-[100dvh] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Top Navigation Bar */}
              <div className="p-4 md:px-8 md:py-5 border-b border-white/5 flex items-center justify-between shrink-0 bg-slate-900/95 backdrop-blur-xl z-30">
                <div className="flex items-center gap-2 md:gap-4">
                  <button 
                    onClick={() => setViewMode('selection')}
                    className="h-10 px-3 md:px-5 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 border border-white/10 group"
                  >
                    <i className="fa-solid fa-chevron-left text-xs group-hover:-translate-x-1 transition-transform"></i>
                    Back to Selection
                  </button>
                  <div className="hidden sm:flex items-center gap-4 border-l border-white/10 pl-4">
                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400 text-xs">
                      <i className="fa-solid fa-file-pdf"></i>
                    </div>
                    <div className="hidden lg:block">
                      <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] leading-none mb-0">
                        {fileName}
                      </h3>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handlePopOut}
                    className="h-10 px-4 md:px-5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-indigo-500/20 transition-all flex items-center gap-2"
                  >
                    <i className="fa-solid fa-up-right-from-square"></i> <span className="hidden sm:inline">Pop Out</span>
                  </button>
                  <button 
                    onClick={() => setViewMode('none')}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-rose-500 text-white flex items-center justify-center transition-all border border-white/10 shadow-lg"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>

              {/* Main Content Area - Full Bleed */}
              <div className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-slate-950 px-8 text-center pointer-events-none">
                  <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Preparing Document...</p>
                </div>

                <iframe 
                  src={`${pdfPath}#view=Fit&pagemode=none&scrollbar=0&toolbar=0`}
                  className="relative inset-0 w-full h-full border-none bg-white z-10"
                  title="Resume Document"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};