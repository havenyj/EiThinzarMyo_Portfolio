
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { PROJECTS, OTHER_PROJECTS } from '../constants.ts';
import type { Project } from '../types.ts';

interface ProjectsProps {
  onSelectProject: (p: Project) => void;
  showAll: boolean;
  onToggleShowAll: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject, showAll, onToggleShowAll }) => {
  return (
    <section id="projects" className="py-24 md:py-40 px-6 bg-slate-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 text-center flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter">Selected Works</h2>
          <div className="w-16 md:w-24 h-1.5 md:h-2 bg-indigo-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-center">
          {PROJECTS.map((project: Project, idx: number) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer bg-slate-900 border border-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden hover:border-indigo-500/40 transition-all duration-500 shadow-xl flex flex-col"
            >
              <div className="aspect-[4/3] relative overflow-hidden shrink-0 bg-slate-950">
                <ImageWithFallback 
                  src={project.image} 
                  alt={project.title} 
                  category={project.category}
                  className="transition-transform duration-700 ease-out group-hover:scale-110" 
                />
                
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px] z-10">
                  <div className="px-8 py-3 bg-white text-slate-950 font-black text-[9px] uppercase rounded-xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    View Project
                  </div>
                </div>

                <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-full z-20">
                   <span className="text-white font-black text-[7px] md:text-[8px] uppercase tracking-widest">{project.category}</span>
                </div>
              </div>

              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-5 tracking-tight group-hover:text-indigo-400 transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm md:text-base line-clamp-2 leading-relaxed mb-6 md:mb-8">{project.description}</p>
                
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tools.slice(0, 3).map((tool: string) => (
                    <span key={tool} className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-indigo-500/60">{tool}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="mt-20 md:mt-32 flex justify-center">
            <button 
              onClick={onToggleShowAll}
              className="group px-10 py-4 md:px-12 md:py-5 rounded-2xl md:rounded-3xl border border-white/10 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-slate-500 hover:text-white hover:border-indigo-500/30 transition-all flex items-center gap-4 md:gap-6"
            >
              Discover More Projects <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
            </button>
          </div>
        )}

        <AnimatePresence>
          {showAll && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-24 md:mt-32 overflow-hidden"
            >
              <div className="mb-12 md:mb-16 flex flex-col items-center">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>
                <span className="text-indigo-400 font-black text-[9px] uppercase tracking-[0.5em] mb-4">Additional Works</span>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">More Projects</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-24">
                {OTHER_PROJECTS.map((project: Project, idx: number) => (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onSelectProject(project)}
                    className="group bg-slate-900/50 border border-white/5 rounded-2xl md:rounded-[2.5rem] overflow-hidden hover:border-indigo-500/20 transition-all cursor-pointer shadow-lg flex flex-col"
                  >
                    <div className="aspect-video relative overflow-hidden bg-slate-950 shrink-0">
                      <ImageWithFallback 
                        src={project.image} 
                        alt={project.title} 
                        category={project.category}
                        className="transition-transform duration-500" 
                      />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h4 className="text-white font-black text-xl md:text-2xl mb-3 group-hover:text-indigo-400 transition-colors">{project.title}</h4>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-2">{project.description}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-indigo-400 font-bold text-[8px] md:text-[9px] uppercase tracking-[0.3em]">{project.category}</span>
                        <i className="fa-solid fa-arrow-right text-slate-700 group-hover:text-white transition-colors"></i>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={onToggleShowAll}
                  className="group px-10 py-4 md:px-12 md:py-5 rounded-2xl md:rounded-3xl border border-indigo-500/20 bg-indigo-500/5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-indigo-400 hover:bg-indigo-500/10 transition-all flex items-center gap-4 md:gap-6"
                >
                  Show Less <i className="fa-solid fa-arrow-up group-hover:-translate-y-1 transition-transform"></i>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
