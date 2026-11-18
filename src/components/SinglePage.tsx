import React from 'react';
import { AlbumItemConfig } from '@/data/album.config';

interface SinglePageProps {
  item: AlbumItemConfig;
  isLeft: boolean;
  pageNumber?: number;
}

export const SinglePage: React.FC<SinglePageProps> = ({
  item,
  isLeft,
  pageNumber,
}) => {
  const imageSrc = item.src || '';

  return (
    <div 
      className="relative w-full h-full bg-[#faf8f5] overflow-hidden select-none"
      data-density="soft"
    >
      {/* Warm Archival Photo Paper Base & Loading Shimmer (prevents black flash) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fcfbf9] via-[#f7f4ec] to-[#eee8dc] flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-2 border-[#b8860b]/20 border-t-[#b8860b]/70 animate-spin" />
      </div>

      {/* Full Bleed Edge-to-Edge Photograph in 3:2 ratio */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
        <img
          src={imageSrc}
          alt={item.title || (pageNumber ? `Album page ${pageNumber} — Dev & Suchismita Wedding` : 'Album photograph')}
          className="w-full h-full object-cover select-none pointer-events-none brightness-[0.98] contrast-[1.02] relative z-1"
          style={{ aspectRatio: '3 / 2' }}
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* Central Spine Curvature & Shadow */}
      {isLeft ? (
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 spine-shadow-left pointer-events-none z-10" />
      ) : (
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 spine-shadow-right pointer-events-none z-10" />
      )}

      {/* Outer Page Edge Bevel */}
      {isLeft ? (
        <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/25 to-transparent pointer-events-none z-10" />
      ) : (
        <div className="absolute top-0 bottom-0 right-0 w-2.5 bg-gradient-to-l from-black/25 to-transparent pointer-events-none z-10" />
      )}
    </div>
  );
};
