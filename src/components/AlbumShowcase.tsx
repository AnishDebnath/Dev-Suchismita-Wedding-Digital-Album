// ponytail: responsive 3-book wedding album showcase — zero bloat, auto-scales to every screen
import React, { useState, useEffect, useMemo } from 'react';
import { AlbumData } from '@/data/albums';
import { AlbumBookCover } from './AlbumBookCover';
import { RenewalCountdown } from './RenewalCountdown';
import { BookOpen, ChevronRight, Calendar } from 'lucide-react';

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

  // 3. Screen classification
  const isPortrait = viewport.height > viewport.width && viewport.width < 768;
  const isShortLandscape = !isPortrait && viewport.height < 520;

  // 4. Exact proportional dimensions calculated so all 3 books fit without overflow
  const dimensions = useMemo(() => {
    if (isPortrait) {
      // Mobile Portrait: 3 stacked cards fitting in viewport height
      const reservedHeader = Math.min(130, Math.round(viewport.height * 0.16));
      const usableHeight = Math.max(280, viewport.height - reservedHeader - 24);
      const cardHeight = Math.floor(usableHeight / 3);
      const bookHeight = Math.max(68, Math.min(110, Math.floor(cardHeight - 20)));
      const bookWidth = Math.round(bookHeight * 1.5);
      return { bookWidth, bookHeight, cardHeight, isPortrait: true, isShortLandscape: false };
    }

    if (isShortLandscape) {
      // Mobile Landscape: 3 horizontal books fitting tightly
      const reservedHeader = 50;
      const usableHeight = Math.max(160, viewport.height - reservedHeader - 50);
      const gap = 16;
      const maxBookW = (viewport.width - 32 - 2 * gap) / 3;
      const bookHeight = Math.max(75, Math.min(130, Math.floor(Math.min(usableHeight, maxBookW / 1.5))));
      const bookWidth = Math.round(bookHeight * 1.5);
      return { bookWidth, bookHeight, cardHeight: 0, isPortrait: false, isShortLandscape: true };
    }

    // Standard Desktop / Tablet Landscape: 3 books side by side
    const reservedVertical = viewport.height < 720 ? 190 : 250;
    const usableHeight = Math.max(140, viewport.height - reservedVertical);
    const maxContentWidth = Math.min(viewport.width - 48, 1320);
    const gap = viewport.width < 1024 ? 20 : 36;
    const maxBookW = (maxContentWidth - 2 * gap) / 3;
    const bookHeight = Math.max(120, Math.min(270, Math.floor(Math.min(usableHeight, maxBookW / 1.5))));
    const bookWidth = Math.round(bookHeight * 1.5);
    return { bookWidth, bookHeight, cardHeight: 0, isPortrait: false, isShortLandscape: false };
  }, [viewport.width, viewport.height, isPortrait, isShortLandscape]);

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

      {/* Top Floating Renewal Countdown — Discreet in top-right corner, zero center clutter */}
      <div className="absolute top-2.5 sm:top-4 right-3 sm:right-6 z-30 pointer-events-auto">
        <RenewalCountdown />
      </div>

      {/* Header Bar — Pure Luxury Editorial Typography */}
      <header
        className={`w-full flex flex-col items-center text-center shrink-0 z-10 ${
          isShortLandscape ? 'pt-2 pb-1' : isPortrait ? 'pt-4 sm:pt-5 pb-2 px-4' : 'pt-6 lg:pt-8 pb-3 px-6'
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
          className={`tracking-tight text-neutral-950 font-normal leading-tight ${
            isShortLandscape
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

      {/* Main Books Showcase Container */}
      <section
        aria-label="Wedding Album Volumes"
        className={`w-full flex-1 flex items-center justify-center z-10 ${
          isPortrait ? 'px-3 py-1' : 'px-4 sm:px-8 py-2'
        }`}
      >
        {isPortrait ? (
          /* Mobile Portrait: 3 Stacked Luxury Cards */
          <div className="w-full max-w-md flex flex-col justify-around gap-2.5 h-full max-h-[calc(100dvh-150px)]">
            {albums.map((album, idx) => (
              <article
                key={album.id}
                onClick={() => onSelectAlbum(album.id)}
                className="group relative flex items-center gap-3.5 p-2.5 rounded-2xl bg-white/80 hover:bg-white/95 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                {/* 3D Photobook Cover */}
                <div className="shrink-0 flex items-center justify-center">
                  <AlbumBookCover
                    coverImage={album.coverImage}
                    width={dimensions.bookWidth}
                    height={dimensions.bookHeight}
                    alt={`${album.title} Cover`}
                  />
                </div>

                {/* Album Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h2 className="text-base font-serif font-bold text-neutral-900 truncate">
                    {album.title}
                  </h2>
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-0.5">
                    <Calendar className="w-3 h-3 text-neutral-400" />
                    <span>{album.date}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#8b6508] group-hover:text-black transition-colors">
                    <span>Open Album</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Landscape & Desktop: 3 Books Side-by-Side */
          <div className="w-full max-w-7xl flex flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            {albums.map((album, idx) => (
              <article
                key={album.id}
                onClick={() => onSelectAlbum(album.id)}
                className="group flex flex-col items-center text-center cursor-pointer transition-all duration-500 ease-out focus:outline-none"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectAlbum(album.id);
                  }
                }}
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
                  className={`flex flex-col items-center w-full transition-all duration-300 ${
                    isShortLandscape ? 'mt-2' : 'mt-3 lg:mt-4'
                  }`}
                >
                  <h2
                    className={`font-serif font-bold text-neutral-900 group-hover:text-black transition-colors truncate max-w-full ${
                      isShortLandscape
                        ? 'text-sm mt-0.5'
                        : 'text-base lg:text-lg mt-1'
                    }`}
                  >
                    {album.title}
                  </h2>

                  <p className="text-[11px] lg:text-xs text-neutral-500 mt-0.5">
                    {album.date}
                  </p>

                  {/* Open Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAlbum(album.id);
                    }}
                    className={`rounded-full transition-all duration-300 font-medium active:scale-95 flex items-center justify-center gap-1 shadow-xs border ${
                      isShortLandscape
                        ? 'mt-1.5 px-3 py-1 text-[11px] bg-white/90 group-hover:bg-[#b8860b] group-hover:text-white border-neutral-200'
                        : 'mt-2.5 px-4 py-1.5 text-xs bg-white/90 hover:bg-[#b8860b] group-hover:bg-[#b8860b] text-neutral-800 group-hover:text-white hover:text-white border-neutral-300/80 group-hover:border-[#b8860b] shadow-xs'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Album</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer Credit */}
      <footer
        className={`w-full text-center font-sans shrink-0 z-10 ${
          isShortLandscape ? 'py-1 text-[10px]' : 'py-2.5 sm:py-3 text-[11px] sm:text-xs'
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
