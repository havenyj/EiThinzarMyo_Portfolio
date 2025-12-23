
import React from 'react';
import { motion } from 'framer-motion';
import { LEADERSHIP } from '../constants.ts';
import type { Experience as ExperienceType } from '../types.ts';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-40 px-6 bg-slate-900/20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">JOURNEY</h2>
          <div className="w-16 md:w-24 h-1.5 md:h-2 bg-indigo-500 rounded-full mt-4 md:mt-6"></div>
        </div>
        <div className="space-y-16">
          {LEADERSHIP.map((item: ExperienceType, idx: number) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-12 border-l-2 border-slate-800"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-6 gap-2">
                <h3 className="text-3xl font-black text-white tracking-tight">{item.title}</h3>
                <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">{item.period}</span>
              </div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-8">{item.organization}</div>
              <ul className="space-y-5">
                {item.bullets.map((b: string, bi: number) => (
                  <li key={bi} className="text-slate-400 text-base leading-relaxed flex gap-4">
                    <span className="text-indigo-500 font-bold">•</span>
                    {b}
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
