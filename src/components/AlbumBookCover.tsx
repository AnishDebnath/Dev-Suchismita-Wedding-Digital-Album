// ponytail: realistic 3D photobook cover matching Cover.tsx physical architecture
import React from 'react';

interface AlbumBookCoverProps {
  coverImage: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}

export const AlbumBookCover: React.FC<AlbumBookCoverProps> = ({
  coverImage,
  width,
  height,
  alt,
  className = '',
}) => {
  // Proportional spine and groove widths based on book scale
  const spineW = Math.max(10, Math.min(22, Math.round(width * 0.055)));
  const grooveW = Math.max(5, Math.min(10, Math.round(width * 0.022)));
  const bevelOffset = spineW + grooveW;

  return (
    <div
      className={`relative select-none transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02] ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {/* 0. Multi-stage ambient shadow */}
      <div className="absolute -inset-2 bg-black/20 rounded-md blur-lg transition-all duration-500 group-hover:bg-black/35 group-hover:blur-xl group-hover:translate-y-3 pointer-events-none" />

      {/* 1. Underlying Back Cover Board Base (rich deep mahogany board) */}
      <div className="absolute inset-0 bg-[#2d0402] rounded-r-xs rounded-l-sm z-0">
        <div className="absolute right-0 bottom-0 w-3 h-3 bg-gradient-to-br from-white/10 to-transparent rounded-br-sm pointer-events-none" />
      </div>

      {/* 2. Continuous Physical Archival Page Block (Fore-edge & bottom edge) */}
      <div
        className="absolute top-1.5 bottom-0.5 right-0.5 z-10 overflow-hidden rounded-br-xs pointer-events-none bg-[#f6f3eb] shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]"
        style={{ left: `${spineW + 6}px` }}
      >
        {/* Horizontal page striations */}
        <div className="absolute inset-0 opacity-75 bg-[repeating-linear-gradient(to_bottom,#ffffff_0px,#ffffff_1px,#eee9df_2px,#ded8cc_3px)]" />
        {/* Vertical fore-edge striations on right */}
        <div className="absolute top-0 right-0 bottom-0 w-2.5 opacity-60 bg-[repeating-linear-gradient(to_right,#ffffff_0px,#ffffff_1px,#eee9df_2px,#ded8cc_3px)]" />
        {/* Binding depth shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#2d0402]/70 via-[#2d0402]/25 to-transparent" />
        {/* Corner shading */}
        <div className="absolute right-0 bottom-0 w-3 h-3 bg-gradient-to-tl from-[#2d0402]/40 to-transparent" />
      </div>

      {/* 3. Main Front Hardcover Board */}
      <div
        className="absolute top-0 bottom-2 left-0 z-20 overflow-hidden rounded-tr-xs rounded-br-sm shadow-[2px_4px_12px_rgba(0,0,0,0.45),0_1px_3px_rgba(0,0,0,0.35)]"
        style={{ right: '5px' }}
      >
        {/* Outer Spine Wrap on Left */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#1a0201] via-[#2d0402] to-[#220301] z-40 pointer-events-none shadow-[inset_-2px_0_4px_rgba(0,0,0,0.6)]"
          style={{ width: `${spineW}px` }}
        >
          {/* Spine specular sheen */}
          <div className="absolute left-1 top-0 bottom-0 w-1 bg-white/15 blur-[0.5px]" />
        </div>

        {/* Debossed Hinge Joint / French Groove */}
        <div
          className="absolute top-0 bottom-0 z-40 pointer-events-none bg-gradient-to-r from-[#2d0402]/90 via-[#2d0402]/55 to-[#2d0402]/20 shadow-[inset_1px_0_2px_rgba(0,0,0,0.85),inset_-1px_0_1px_rgba(255,255,255,0.1)]"
          style={{
            left: `${spineW}px`,
            width: `${grooveW}px`,
          }}
        >
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#2d0402]" />
        </div>

        {/* Raised Front Board Bevel Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 z-40 pointer-events-none bg-white/15"
          style={{ left: `${bevelOffset}px` }}
        />

        {/* Front Cover Photograph */}
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-neutral-900">
          <img
            src={coverImage}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Subtle silk gloss highlight sweep */}
        <div className="absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Cast Shadow from front cover overhang down onto page block */}
      <div
        className="absolute bottom-2 h-1.5 bg-gradient-to-b from-[#2d0402]/70 to-transparent z-25 pointer-events-none"
        style={{ left: `${spineW + 6}px`, right: '5px' }}
      />
    </div>
  );
};
