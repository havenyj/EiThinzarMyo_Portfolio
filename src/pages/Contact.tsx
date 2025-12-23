
import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 md:py-48 px-6 relative overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-indigo-500/5 blur-[80px] md:blur-[150px] rounded-full" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-10 md:mb-16 flex flex-col items-center">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter">Let's Talk.</h2>
          <div className="w-16 md:w-24 h-1.5 md:h-2 bg-indigo-500 rounded-full mt-4 md:mt-6"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <a href="mailto:sly.eithinzarmyo@gmail.com" className="px-4 py-6 md:px-6 md:py-8 bg-white text-slate-950 font-black rounded-2xl md:rounded-3xl hover:scale-105 transition-all flex flex-col items-center gap-2 md:gap-3 shadow-2xl">
            <i className="fa-solid fa-envelope text-xl md:text-2xl"></i>
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest">Email Me</span>
          </a>
          <a href="https://wa.me/6588938384" target="_blank" rel="noreferrer" className="px-4 py-6 md:px-6 md:py-8 bg-emerald-600 text-white font-black rounded-2xl md:rounded-3xl hover:scale-105 transition-all flex flex-col items-center gap-2 md:gap-3 shadow-2xl">
            <i className="fa-brands fa-whatsapp text-xl md:text-2xl"></i>
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest">WhatsApp</span>
          </a>
          <a href="https://linkedin.com/in/eithinzarmyo" target="_blank" rel="noreferrer" className="px-4 py-6 md:px-6 md:py-8 bg-slate-900 border border-white/10 text-white font-black rounded-2xl md:rounded-3xl hover:scale-105 transition-all flex flex-col items-center gap-2 md:gap-3">
            <i className="fa-brands fa-linkedin text-xl md:text-2xl text-indigo-400"></i>
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest">LinkedIn</span>
          </a>
          <a href="https://github.com/havenyj" target="_blank" rel="noreferrer" className="px-4 py-6 md:px-6 md:py-8 bg-slate-900 border border-white/10 text-white font-black rounded-2xl md:rounded-3xl hover:scale-105 transition-all flex flex-col items-center gap-2 md:gap-3">
            <i className="fa-brands fa-github text-xl md:text-2xl"></i>
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest">GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};
