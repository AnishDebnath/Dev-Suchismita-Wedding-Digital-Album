// ponytail: All album images loaded exclusively from Cloudinary via VITE_CLOUDINARY_BASE_URL in .env
const CLOUDINARY_BASE_URL = (
  import.meta.env.VITE_CLOUDINARY_BASE_URL || ''
).trim().replace(/\/+$/, '');

export interface AlbumData {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  folderName: string;
  coverImage: string;
  backCoverImage: string;
  pages: string[];
}

// 1. Pre-Wedding: 40 pages (0..39), Front Cover & Back cover
const preWeddingPages: string[] = [];
for (let i = 0; i <= 39; i++) {
  preWeddingPages.push(`${CLOUDINARY_BASE_URL}/v1794879494/${i}.jpg`);
}

// 2. Wedding Ceremony: 70 pages (1..70), Front Cover & Back cover
const weddingPages: string[] = [];
for (let i = 1; i <= 70; i++) {
  weddingPages.push(`${CLOUDINARY_BASE_URL}/v1794880867/dev-suchismita-wedding_${i}.jpg`);
}

// 3. Wedding Reception: 68 pages (1..68), Front Cover & Back cover
const receptionPages: string[] = [];
for (let i = 1; i <= 68; i++) {
  receptionPages.push(`${CLOUDINARY_BASE_URL}/v1794880110/dev-suchismita-reception_${i}.jpg`);
}

export const albums: AlbumData[] = [
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding',
    subtitle: 'Moments of Anticipation & Love',
    date: '24 July 2025',
    folderName: 'Pre wedding 24 july 2025',
    coverImage: `${CLOUDINARY_BASE_URL}/v1794879494/Front_Cover.jpg`,
    backCoverImage: `${CLOUDINARY_BASE_URL}/v1794879494/Back_cover.jpg`,
    pages: preWeddingPages,
  },
  {
    id: 'wedding',
    title: 'Wedding Ceremony',
    subtitle: 'The Sacred Union & Eternal Vows',
    date: '3 August 2025',
    folderName: 'Wedding 3 Aug 2025',
    coverImage: `${CLOUDINARY_BASE_URL}/v1794880867/dev-suchismita-wedding-front-cover.jpg`,
    backCoverImage: `${CLOUDINARY_BASE_URL}/v1794880867/dev-suchismita-wedding-back-cover.jpg`,
    pages: weddingPages,
  },
  {
    id: 'reception',
    title: 'Wedding Reception',
    subtitle: 'Celebration, Feasts & Joy',
    date: '6 August 2025',
    folderName: 'Reception 6 Aug 2025',
    coverImage: `${CLOUDINARY_BASE_URL}/v1794880110/dev-suchismita-reception-front-cover.jpg`,
    backCoverImage: `${CLOUDINARY_BASE_URL}/v1794880110/dev-suchismita-reception-back-cover.jpg`,
    pages: receptionPages,
  },
];
