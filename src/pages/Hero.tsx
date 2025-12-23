import React from 'react';
import { motion } from 'framer-motion';
import { ResumeButton } from '../components/ResumeButton.tsx';
import GradientText from '../components/GradientText.tsx';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 md:pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_70%)]" />
      <div className="absolute top-1/4 -left-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 blur-[100px] md:blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-600/10 blur-[100px] md:blur-[150px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[100vw] mx-auto relative z-10 px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="inline-block px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8 md:mb-10"
        >
          <span className="text-indigo-400 font-black uppercase text-[8px] md:text-[9px] tracking-[0.4em]">Available for Opportunities</span>
        </motion.div>
        
        <div className="mb-8 md:mb-12 flex justify-center w-full">
          <GradientText 
            className="text-[8.5vw] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9.5rem] font-black tracking-tighter leading-none whitespace-nowrap py-2"
            colors={['#6366f1', '#a855f7', '#ffffff', '#fb7185', '#6366f1']}
            animationSpeed={6}
          >
            EI THINZAR MYO
          </GradientText>
        </div>
        
        <p className="text-lg md:text-2xl lg:text-3xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed mb-12 md:mb-16 px-4">
          A <span className="text-white font-bold italic">visionary</span> Junior UI/UX Designer & Frontend Developer building high-performance, system-driven interfaces.
        </p>
        
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <ResumeButton />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex gap-6 md:gap-8 text-slate-500"
          >
            <a href="https://linkedin.com/in/eithinzarmyo" target="_blank" rel="noreferrer" className="hover:text-white transition-all hover:scale-110 flex items-center gap-2">
              <i className="fa-brands fa-linkedin text-xl"></i>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">LinkedIn</span>
            </a>
            <a href="https://github.com/havenyj" target="_blank" rel="noreferrer" className="hover:text-white transition-all hover:scale-110 flex items-center gap-2">
              <i className="fa-brands fa-github text-xl"></i>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">GitHub</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};