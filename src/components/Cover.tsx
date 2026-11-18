import React from 'react';
import { AlbumConfig } from '@/data/album.config';

interface CoverProps {
  config: AlbumConfig;
}

export const Cover: React.FC<CoverProps> = ({ config }) => {
  const frontCoverItem = config.items.find(i => i.type === 'cover');
  const coverImage = frontCoverItem?.src || '';

  return (
    <div
      className="relative w-full h-full text-[#ede8de] overflow-hidden select-none cursor-pointer group"
      data-density="hard"
    >
      {/* 1. Underlying Back Cover Board Base (Behind part) */}
      <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#2d0402] rounded-br-sm z-0">
        <div className="absolute right-0 bottom-0 w-3 h-3 bg-gradient-to-br from-white/10 to-transparent rounded-br-sm pointer-events-none" />
      </div>

      {/* 2. Continuous Physical Page Block (Archival Paper Pages Stack - White line) */}
      <div className="absolute left-6 sm:left-7 right-0.5 top-2 bottom-0.5 z-10 overflow-hidden rounded-br-xs pointer-events-none bg-[#f6f3eb] shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]">
        {/* Continuous horizontal page striations across the bottom and corner */}
        <div className="absolute inset-0 opacity-75 bg-[repeating-linear-gradient(to_bottom,#ffffff_0px,#ffffff_1px,#eee9df_2px,#ded8cc_3px)]" />

        {/* Vertical page striations on the right fore-edge blending into the corner */}
        <div className="absolute top-0 right-0 bottom-0 w-3 opacity-60 bg-[repeating-linear-gradient(to_right,#ffffff_0px,#ffffff_1px,#eee9df_2px,#ded8cc_3px)]" />
      </div>

      {/* 
        3. Main Front Hardcover Board
        Pure, clean, unfiltered image with no text, no darkening overlays, and no filters!
      */}
      <div className="absolute left-0 right-2 sm:right-2.5 top-0 bottom-2.5 sm:bottom-3 z-20 overflow-hidden rounded-tr-xs rounded-br-sm shadow-[2px_4px_10px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.4)]">
        {/* Outer Spine Wrap on Left (The rounded physical spine overlay) */}
        <div className="absolute left-0 top-0 bottom-0 w-5 sm:w-6 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-40 pointer-events-none shadow-[inset_-1px_0_3px_rgba(0,0,0,0.5)]">
          {/* Subtle curved spine highlight sheen */}
          <div className="absolute left-1.5 top-0 bottom-0 w-1 bg-white/20 blur-[0.5px]" />
        </div>

        {/* Debossed Hinge Joint / French Groove (The physical crease channel) */}
        <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-2 sm:w-2.5 z-40 pointer-events-none bg-gradient-to-r from-black/35 via-black/15 to-transparent shadow-[inset_1px_0_2px_rgba(0,0,0,0.7),inset_-1px_0_1px_rgba(255,255,255,0.15)]">
          {/* Deep crease centerline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-black/50" />
        </div>

        {/* Raised Front Board Bevel Line adjacent to the groove */}
        <div className="absolute left-[27px] sm:left-[33px] top-0 bottom-0 w-0.5 z-40 pointer-events-none bg-white/20" />

        {/* Pure, Clean, Unfiltered Cover Image — Perfectly centered and balanced across the entire cover */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <img
            src={coverImage}
            alt="Front cover — Dev & Suchismita Wedding Digital Album"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
