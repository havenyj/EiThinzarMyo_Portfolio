
import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  category?: 'Mobile' | 'Web' | 'Dashboard' | 'Profile';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className = "", category }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let currentBlobUrl: string | null = null;

    const loadImage = async () => {
      setLoading(true);
      setError(false);
      setIsBlocked(false);

      try {
        // We fetch the asset directly to bypass some simple content blocker rules 
        // that specifically target <img> tags with certain path patterns.
        const response = await fetch(src, { cache: 'no-cache' });
        
        if (!response.ok) {
          if (response.status === 403) {
            setIsBlocked(true);
            throw new Error('Forbidden');
          }
          throw new Error('Asset not found');
        }

        const blob = await response.blob();
        if (active) {
          currentBlobUrl = URL.createObjectURL(blob);
          setBlobUrl(currentBlobUrl);
          setLoading(false);
        }
      } catch (err) {
        console.error(`Error loading asset ${src}:`, err);
        if (active) {
          setError(true);
          setLoading(false);
          // Check if it's likely a content blocker based on common error patterns
          if (err instanceof TypeError && err.message.includes('fetch')) {
             setIsBlocked(true);
          }
        }
      }
    };

    loadImage();

    return () => {
      active = false;
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
      }
    };
  }, [src]);

  if (error || isBlocked) {
    const isProfile = category === 'Profile';
    const fileName = src.split('/').pop() || 'image';
    
    return (
      <div className={`w-full h-full relative flex items-center justify-center overflow-hidden ${className} bg-slate-900 border border-white/5`}>
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-purple-800/20" />
        <div className="relative z-10 flex flex-col items-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-5 border border-white/10 backdrop-blur-xl shadow-2xl">
             <i className={`fa-solid ${isBlocked ? 'fa-shield-halved' : (isProfile ? 'fa-user' : 'fa-image-slash')} text-xl ${isBlocked ? 'text-amber-400' : 'text-indigo-400'} opacity-80`}></i>
          </div>
          <div className="text-center max-w-[200px]">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">
              {isBlocked ? 'Resource Blocked' : 'Asset 404'}
            </p>
            <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mb-3 truncate w-full">{fileName}</p>
            
            {isBlocked && (
              <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-[8px] font-bold text-amber-200/70 leading-relaxed uppercase tracking-tight">
                  Try disabling AdBlockers or Tracking Protection for this site.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent">
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/40 backdrop-blur-[4px]">
           <div className="flex flex-col items-center gap-3">
             <div className="w-8 h-8 border-2 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
             <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.3em] animate-pulse">Fetching...</span>
           </div>
        </div>
      )}
      {blobUrl && (
        <img 
          src={blobUrl} 
          alt={alt} 
          className={`absolute inset-0 w-full h-full object-cover ${className} ${loading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'} transition-all duration-1000 ease-out`} 
        />
      )}
    </div>
  );
};
