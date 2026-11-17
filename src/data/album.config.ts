/**
 * Luxury Wedding Digital Album Configuration
 * 
 * Defines the complete physical and visual structure of the album:
 * - Cover and Back Cover
 * - Interior Single Pages & Continuous Two-Page Panoramic Spreads (3:1)
 * - Configurable Photographer / Studio Credit Page
 * - Physical album dimensions (Standard 18x12" closed / 36x12" open, Extended, Large)
 * - Slideshow autoplay settings
 * - Synthesized tactile audio settings
 */

import tphLogo from '@/assets/tph.png';
import mindtrixLogo from '@/assets/watermark.png';
import { AlbumData, albums } from './albums';

export interface AlbumDimensions {
  closedWidthInches: number;
  closedHeightInches: number;
  openWidthInches: number;
  openHeightInches: number;
  singlePageAspectRatio: number; // e.g. 1.5 (3:2)
  openSpreadAspectRatio: number;   // e.g. 3.0 (3:1)
}

export interface PhotographerCreditInfo {
  photographerName: string;
  studioName: string;
  role: string;
  websiteUrl: string;
  socialHandle?: string;
  location?: string;
  quote?: string;
  logoSrc?: string;
  showAlbumMeta?: boolean; // when false, album date/location lines are hidden
}

export type AlbumPageType = 'cover' | 'single' | 'spread' | 'credit' | 'cover-back';

export interface AlbumItemConfig {
  id: string;
  type: AlbumPageType;
  src?: string;
  fallbackSrc?: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  // For continuous panoramic spreads
  layout?: 'two-page-continuous' | 'single-page';
  aspectRatio?: string; // "3:1"
  splitAt?: number;      // 0.5 for center fold
  preserveOriginalImage?: boolean;
  // For photographer credit page
  creditInfo?: PhotographerCreditInfo;
  isLeft?: boolean;
}

export interface AlbumConfig {
  id?: string;
  title: string;
  coupleNames: string;
  weddingDate: string;
  weddingLocation: string;
  defaultSize: 'standard' | 'extended' | 'large';
  dimensions: {
    standard: AlbumDimensions;
    extended: AlbumDimensions;
    large: AlbumDimensions;
  };
  autoplay: {
    enabled: boolean;
    defaultIntervalSeconds: number;
    intervalOptionsSeconds: number[];
  };
  soundEffects: {
    enabled: boolean;
    defaultVolume: number;
  };
  photographer: PhotographerCreditInfo;
  items: AlbumItemConfig[];
}

export function buildAlbumConfig(album: AlbumData): AlbumConfig {
  const interiorPages: AlbumItemConfig[] = album.pages.map((pageSrc, idx) => ({
    id: `page-${String(idx + 1).padStart(2, '0')}`,
    type: 'single' as const,
    src: pageSrc,
    title: `Page ${String(idx + 1).padStart(2, '0')}`,
  }));

  return {
    id: album.id,
    title: `Dev & Suchismita · ${album.title}`,
    coupleNames: 'Dev & Suchismita',
    weddingDate: album.date,
    weddingLocation: 'Kolkata',
    defaultSize: 'standard',
    dimensions: {
      // Standard format: Closed 18" wide x 12" tall (3:2) | Open 36" wide x 12" tall (3:1)
      standard: {
        closedWidthInches: 18,
        closedHeightInches: 12,
        openWidthInches: 36,
        openHeightInches: 12,
        singlePageAspectRatio: 1.5,
        openSpreadAspectRatio: 3.0,
      },
      extended: {
        closedWidthInches: 20,
        closedHeightInches: 13,
        openWidthInches: 40,
        openHeightInches: 13,
        singlePageAspectRatio: 20 / 13,
        openSpreadAspectRatio: 40 / 13,
      },
      large: {
        closedWidthInches: 20,
        closedHeightInches: 14,
        openWidthInches: 40,
        openHeightInches: 14,
        singlePageAspectRatio: 20 / 14,
        openSpreadAspectRatio: 40 / 14,
      },
    },
    autoplay: {
      enabled: false,
      defaultIntervalSeconds: 5,
      intervalOptionsSeconds: [3, 5, 8, 10],
    },
    soundEffects: {
      enabled: true,
      defaultVolume: 0.4,
    },
    photographer: {
      photographerName: 'Vikramaditya Rathore',
      studioName: 'Royal Vows Fine Art Studios',
      role: 'Principal Destination Wedding Photographer',
      websiteUrl: 'https://royalvows.studio',
      socialHandle: '@royalvows.fineart',
      location: 'Kolkata',
      quote: 'Every glance, every tear, every blessing preserved in timeless print.',
      logoSrc: tphLogo,
    },
    items: [
      // Front cover
      {
        id: 'cover-front',
        type: 'cover',
        src: album.coverImage,
        title: 'Dev & Suchismita',
      },
      // Interior pages
      ...interiorPages,
      // Back cover
      {
        id: 'cover-back',
        type: 'cover-back',
        src: album.backCoverImage,
        title: 'Dev & Suchismita',
      },
      // Credit / details page (first left side — TPH logo)
      {
        id: 'credit-tph',
        type: 'credit',
        isLeft: true,
        creditInfo: {
          photographerName: '',
          studioName: 'The Photographer House',
          role: '',
          websiteUrl: 'https://www.thephotographerhouse.com',
          quote: 'Where Every Click Tells a Story',
          logoSrc: tphLogo,
        },
      },
      // Credit / details page (last right side — Mindtrix Media logo)
      {
        id: 'credit-mindtrix',
        type: 'credit',
        creditInfo: {
          photographerName: '',
          studioName: 'Mindtrix Media',
          role: 'Digital Album Production',
          websiteUrl: 'https://www.mindtrixmedia.com',
          logoSrc: mindtrixLogo,
          quote: 'This album is made with Mindtrix Media',
          showAlbumMeta: false,
        },
      },
    ],
  };
}

// Default export for backwards compatibility
export const albumConfig: AlbumConfig = buildAlbumConfig(albums[1] || albums[0]);
