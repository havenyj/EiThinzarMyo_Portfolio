import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation.tsx';
import { ImageWithFallback } from './components/ImageWithFallback.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import type { Project } from './types.ts';
import { scrollToId } from './lib/utils.ts';

// Page imports
import { Hero } from './pages/Hero.tsx';
import { About } from './pages/About.tsx';
import { Projects } from './pages/Projects.tsx';
import { Skills } from './pages/Skills.tsx';
import { Experience } from './pages/Experience.tsx';
import { Contact } from './pages/Contact.tsx';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showOtherProjects, setShowOtherProjects] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);

  // Sync with ResumeButton viewer state via Custom Events
  useEffect(() => {
    const handleResumeToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIsResumeViewerOpen(customEvent.detail);
    };
    window.addEventListener('resume-viewer-toggle', handleResumeToggle);
    return () => window.removeEventListener('resume-viewer-toggle', handleResumeToggle);
  }, []);

  // Body scroll lock with dynamic height support for modals
  useEffect(() => {
    if (selectedProject || isResumeViewerOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.height = '100dvh'; 
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      document.body.style.height = 'auto';
    }
  }, [selectedProject, isResumeViewerOpen]);

  // Active section observer
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="selection:bg-indigo-500 selection:text-white min-h-screen bg-slate-950 text-slate-200">
      {/* Immersive experience: hide site navigation when PDF viewer is open */}
      <AnimatePresence>
        {!isResumeViewerOpen && (
          <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] flex justify-center py-6 md:py-8 px-4 pointer-events-none"
          >
            <div className="pointer-events-auto">
              <Navigation activeId={activeSection} onNavClick={(id) => scrollToId(id)} />
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <main>
        <div id="home"><Hero /></div>
        <About />
        <Projects 
          onSelectProject={setSelectedProject} 
          showAll={showOtherProjects} 
          onToggleShowAll={() => setShowOtherProjects(!showOtherProjects)} 
        />
        <Skills />
        <Experience />
        <Contact />
      </main>

      {!isResumeViewerOpen && <ScrollToTop />}

      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tighter">Ei Thinzar Myo</div>
        <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.4em]">
          © {new Date().getFullYear()} Designed & Built with Precision
        </p>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-8 lg:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl" 
              onClick={() => setSelectedProject(null)} 
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 30 }} 
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] md:rounded-[4rem] w-full max-w-7xl h-[92dvh] md:h-[85vh] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-800/90 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-700 z-[270] border border-white/10 shadow-xl"
              >
                <i className="fa-solid fa-xmark text-lg md:text-xl"></i>
              </button>
              
              <div className="flex flex-col md:flex-row h-full w-full min-h-0 overflow-hidden">
                <div className="w-full md:w-5/12 lg:w-1/2 bg-slate-950 flex items-center justify-center h-[25vh] sm:h-[35vh] md:h-full relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.1),transparent_80%)]" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
                    <ImageWithFallback 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="object-cover w-full h-full" 
                    />
                  </div>
                </div>
                
                <div className="relative w-full md:w-7/12 lg:w-1/2 flex flex-col h-full min-h-0 bg-slate-900/40 backdrop-blur-xl">
                  <div className="flex-1 p-6 sm:p-10 md:p-12 lg:p-20 overflow-y-auto overscroll-contain">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 0.2 }}
                      className="pb-24"
                    >
                      <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-6">
                        <span className="text-indigo-400 font-black text-[9px] uppercase tracking-[0.4em]">Case Study</span>
                      </div>
                      
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">
                        {selectedProject.title}
                      </h2>
                      
                      <div className="grid grid-cols-2 gap-6 mb-12 pb-10 border-b border-white/5">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Timeline</div>
                          <div className="text-sm md:text-base font-bold text-white/90">{selectedProject.duration}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Medium</div>
                          <div className="text-sm md:text-base font-bold text-white/90">{selectedProject.category}</div>
                        </div>
                      </div>

                      <div className="prose prose-invert max-w-none">
                        <p className="text-slate-400 text-lg leading-relaxed mb-12">
                          {selectedProject.description}
                        </p>
                        
                        <div className="space-y-12">
                          <div>
                            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.4em] mb-6 opacity-40">The Process</h4>
                            <ul className="space-y-4">
                              {selectedProject.details.map((d, i) => (
                                <li key={i} className="text-slate-300 text-base flex gap-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                                  <i className="fa-solid fa-circle-check text-indigo-500 mt-1"></i>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.4em] mb-6 opacity-40">Tools Used</h4>
                            <div className="flex flex-wrap gap-2.5">
                              {selectedProject.tools.map(t => (
                                <span key={t} className="px-4 py-2.5 bg-indigo-500/10 rounded-xl text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 whitespace-nowrap">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};