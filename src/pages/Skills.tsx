
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants.ts';
import type { SkillCategory } from '../types.ts';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">SKILLS</h2>
          <div className="w-16 md:w-24 h-1.5 md:h-2 bg-indigo-500 rounded-full mt-4 md:mt-6"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {SKILLS.map((cat: SkillCategory, idx: number) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -5 }}
              className="p-6 sm:p-8 md:p-12 bg-slate-900/40 border border-white/5 rounded-2xl sm:rounded-3xl md:rounded-[3rem] hover:bg-slate-900/60 hover:border-indigo-500/20 transition-all group"
            >
              <div className="w-10 h-10 md:w-16 md:h-16 bg-indigo-500/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform">
                <i className={`fa-solid ${cat.icon} text-lg md:text-2xl text-indigo-500`}></i>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-4 md:mb-8">{cat.title}</h3>
              <ul className="space-y-2 md:space-y-4">
                {cat.skills.map((s: string, i: number) => (
                  <li key={i} className="text-slate-400 text-[10px] md:text-sm font-medium flex items-center gap-2 md:gap-3">
                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-indigo-500/30 shrink-0"></div>
                    <span className="line-clamp-1">{s}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
