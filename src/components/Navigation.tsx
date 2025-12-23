
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onNavClick?: (id: string) => void;
  activeId?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavClick, activeId }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const links = [
    { name: 'About', id: 'about', icon: 'fa-user-ninja' },
    { name: 'Projects', id: 'projects', icon: 'fa-briefcase' },
    { name: 'Skills', id: 'skills', icon: 'fa-bolt' },
    { name: 'Journey', id: 'experience', icon: 'fa-ranking-star' },
    { name: 'Contact', id: 'contact', icon: 'fa-paper-plane' },
  ];

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-center"
    >
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <ul className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = activeId === link.id;
            const isHovered = hoveredId === link.id;
            const showLabel = isActive || isHovered;
            
            return (
              <li key={link.name}>
                <motion.button 
                  onClick={(e) => handleClick(e, link.id)}
                  onMouseEnter={() => setHoveredId(link.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`
                    flex items-center justify-center gap-2.5 px-3 py-2.5 md:px-4 md:py-3 rounded-xl transition-all outline-none relative overflow-hidden
                    ${isActive ? 'bg-indigo-500/20 text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'}
                  `}
                  animate={{
                    width: 'auto',
                    transition: { type: 'spring', stiffness: 400, damping: 30 }
                  }}
                >
                  <i className={`fa-solid ${link.icon} text-sm md:text-base transition-colors ${isActive ? 'text-indigo-400' : 'opacity-70'}`}></i>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {showLabel && (
                      <motion.span
                        initial={{ opacity: 0, width: 0, x: -10 }}
                        animate={{ opacity: 1, width: 'auto', x: 0 }}
                        exit={{ opacity: 0, width: 0, x: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="text-[10px] uppercase tracking-[0.2em] font-black whitespace-nowrap overflow-hidden leading-none"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-indigo-500/10 blur-md -z-10"
                    />
                  )}
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};
