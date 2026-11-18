// ponytail: responsive 3-book wedding album showcase — zero bloat, auto-scales to every screen
import React, { useState, useEffect, useMemo } from 'react';
import { AlbumData } from '@/data/albums';
import { AlbumBookCover } from './AlbumBookCover';
import { RenewalCountdown } from './RenewalCountdown';
import { RotateScreenOverlay } from './RotateScreenOverlay';
import { BookOpen, ChevronRight, Share2 } from 'lucide-react';

interface AlbumShowcaseProps {
  albums: AlbumData[];
  onSelectAlbum: (albumId: string) => void;
}

export const AlbumShowcase: React.FC<AlbumShowcaseProps> = ({
  albums,
  onSelectAlbum,
}) => {
  // 1. Reactive viewport measurement for screen-fitted geometry
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  useEffect(() => {
    const onResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // 2. Keyboard shortcut support: 1, 2, 3 to open directly
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1' && albums[0]) onSelectAlbum(albums[0].id);
      if (e.key === '2' && albums[1]) onSelectAlbum(albums[1].id);
      if (e.key === '3' && albums[2]) onSelectAlbum(albums[2].id);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [albums, onSelectAlbum]);

  // ponytail: minimal 1-line native share with clipboard fallback, no boilerplate state
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Dev & Suchismita · Wedding Digital Album', url });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  // 4. Screen classification
  const isPortrait = viewport.height > viewport.width && viewport.width < 768;
  const isShortLandscape = !isPortrait && viewport.height < 520;

  // 4. Exact proportional dimensions calculated so all 3 books fit without overflow
  const dimensions = useMemo(() => {
    if (isShortLandscape) {
      // Mobile Landscape: 3 horizontal books fitting tightly
      const reservedHeader = 50;
      const usableHeight = Math.max(160, viewport.height - reservedHeader - 50);
      const gap = 16;
      const maxBookW = (viewport.width - 32 - 2 * gap) / 3;
      const bookHeight = Math.max(75, Math.min(130, Math.floor(Math.min(usableHeight, maxBookW / 1.5))));
      const bookWidth = Math.round(bookHeight * 1.5);
      return { bookWidth, bookHeight, isShortLandscape: true };
    }

    // Standard Desktop / Tablet Landscape: 3 books side by side
    const reservedVertical = viewport.height < 720 ? 190 : 250;
    const usableHeight = Math.max(140, viewport.height - reservedVertical);
    const maxContentWidth = Math.min(viewport.width - 48, 1320);
    const gap = viewport.width < 1024 ? 20 : 36;
    const maxBookW = (maxContentWidth - 2 * gap) / 3;
    const bookHeight = Math.max(120, Math.min(270, Math.floor(Math.min(usableHeight, maxBookW / 1.5))));
    const bookWidth = Math.round(bookHeight * 1.5);
    return { bookWidth, bookHeight, isShortLandscape: false };
  }, [viewport.width, viewport.height, isShortLandscape]);

  return (
    <main
      className="w-full h-full min-h-[100dvh] max-h-[100dvh] bg-[#f5f4ef] text-neutral-900 flex flex-col justify-between overflow-y-auto md:overflow-hidden select-none relative"
      style={{
        background: 'radial-gradient(ellipse at 50% 25%, #ffffff 0%, #f6f3eb 55%, #eae5d9 100%)',
      }}
    >
      {/* Subtle luxury watermark motif in corner */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#b8860b]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-[#2d0402]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Share Button — Conveniently placed on top-left */}
      <div className="absolute top-2.5 sm:top-4 left-3 sm:left-6 z-30 pointer-events-auto">
        <button
          onClick={handleShare}
          title="Share Album Collection"
          aria-label="Share Wedding Album Collection"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-black border border-neutral-200/90 shadow-xs backdrop-blur-md transition-all active:scale-95 text-xs font-semibold hover:border-[#b8860b]"
        >
          <Share2 className="w-3.5 h-3.5 text-[#b8860b]" />
          <span>Share Album</span>
        </button>
      </div>

      {/* Top Floating Renewal Countdown — Discreet in top-right corner, zero center clutter */}
      <div className="absolute top-2.5 sm:top-4 right-3 sm:right-6 z-30 pointer-events-auto">
        <RenewalCountdown />
      </div>

      {/* Vertical / Portrait Mode Rotate Screen Prompt Overlay — same as single album page */}
      <RotateScreenOverlay isVisible={isPortrait} />

      {/* Header Bar — Pure Luxury Editorial Typography */}
      <header
        className={`w-full flex flex-col items-center text-center shrink-0 z-10 ${isShortLandscape ? 'pt-2 pb-1' : isPortrait ? 'pt-4 sm:pt-5 pb-2 px-4' : 'pt-6 lg:pt-8 pb-3 px-6'
          }`}
      >
        {/* Studio Branding */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-1 sm:mb-1.5">
          <div className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent via-[#b8860b]/40 to-transparent" />
          <span className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#8b6508]">
            The Photographer House
          </span>
          <div className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent via-[#b8860b]/40 to-transparent" />
        </div>

        {/* Main Couple Names */}
        <h1
          className={`tracking-tight text-neutral-950 font-normal leading-tight ${isShortLandscape
            ? 'text-lg sm:text-xl mt-0.5'
            : isPortrait
              ? 'text-2xl sm:text-3xl mt-0.5'
              : 'text-3xl sm:text-4xl lg:text-[2.65rem] mt-1'
            }`}
          style={{ fontFamily: '"Cormorant Garamond", "Cinzel", Georgia, serif' }}
        >
          Dev <span className="italic font-light text-[#b8860b] px-0.5 sm:px-1.5">&amp;</span> Suchismita
        </h1>

        {/* Sub-heading: The Wedding Collection and Digital Album */}
        {!isShortLandscape && (
          <div className="flex items-center justify-center gap-2 mt-1 sm:mt-1.5 text-neutral-500 font-sans font-medium tracking-[0.2em] sm:tracking-[0.24em] text-[10px] sm:text-[11px] uppercase">
            <span>The Wedding Collection</span>
            <span className="text-[#b8860b]/60">•</span>
            <span>Digital Album</span>
          </div>
        )}
      </header>

      {/* Main Books Showcase Container — 3 Books Side-by-Side */}
      <section
        aria-label="Wedding Album Volumes"
        className="w-full flex-1 flex items-center justify-center z-10 px-4 sm:px-8 py-2"
      >
        <div className="w-full max-w-7xl flex flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {albums.map((album) => (
            <a
              key={album.id}
              href={`/${album.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectAlbum(album.id);
              }}
              className="group flex flex-col items-center text-center cursor-pointer transition-all duration-500 ease-out focus:outline-none no-underline"
              style={{ width: `${dimensions.bookWidth}px` }}
            >
              {/* 3D Photobook Cover */}
              <AlbumBookCover
                coverImage={album.coverImage}
                width={dimensions.bookWidth}
                height={dimensions.bookHeight}
                alt={`${album.title} Photobook Cover`}
              />

              {/* Album Metadata & Action Button */}
              <div
                className={`flex flex-col items-center w-full transition-all duration-300 ${isShortLandscape ? 'mt-2' : 'mt-3 lg:mt-4'
                  }`}
              >
                <h2
                  className={`font-serif font-bold text-neutral-900 group-hover:text-black transition-colors truncate max-w-full ${isShortLandscape
                    ? 'text-sm mt-0.5'
                    : 'text-base lg:text-lg mt-1'
                    }`}
                >
                  {album.title}
                </h2>

                <p className="text-[11px] lg:text-xs text-neutral-500 mt-0.5">
                  {album.date}
                </p>

                {/* Open Button Badge */}
                <div
                  className={`rounded-full transition-all duration-300 font-medium active:scale-95 flex items-center justify-center gap-1 shadow-xs border ${isShortLandscape
                    ? 'mt-1.5 px-3 py-1 text-[11px] bg-white/90 group-hover:bg-[#b8860b] group-hover:text-white border-neutral-200'
                    : 'mt-2.5 px-4 py-1.5 text-xs bg-white/90 hover:bg-[#b8860b] group-hover:bg-[#b8860b] text-neutral-800 group-hover:text-white hover:text-white border-neutral-300/80 group-hover:border-[#b8860b] shadow-xs'
                    }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Album</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer Credit */}
      <footer
        className={`w-full text-center font-sans shrink-0 z-10 ${isShortLandscape ? 'py-1 text-[10px]' : 'py-2.5 sm:py-3 text-[11px] sm:text-xs'
          }`}
      >
        <a
          href="https://www.mindtrixmedia.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-neutral-400 hover:text-neutral-800 transition-colors tracking-wide cursor-pointer"
        >
          <span>This album is made with</span>
          <span className="font-semibold text-neutral-600 hover:text-neutral-950 underline underline-offset-2 decoration-neutral-300 hover:decoration-[#b8860b] transition-all">
            Mindtrix Media
          </span>
        </a>
      </footer>
    </main>
  );
};
