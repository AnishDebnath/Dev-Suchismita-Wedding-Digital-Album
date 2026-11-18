// ponytail: ImageKit cloud endpoint loaded strictly from .env (no default, won't show without .env)
const IMAGEKIT_URL_ENDPOINT = (
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_IMAGEKIT_URL_ENDPOINT) || ''
).trim().replace(/\/+$/, '');

// ponytail: direct ImageKit URL builder (strictly requires VITE_IMAGEKIT_URL_ENDPOINT in .env)
export const getImageKitUrl = (path: string) => {
  if (!IMAGEKIT_URL_ENDPOINT) return '';
  const cleanPath = path.replace(/^\/+/, '');
  return `${IMAGEKIT_URL_ENDPOINT}/${cleanPath}`;
};

const ROOT_FOLDER = 'Dev-Suchismita-Wedding-Digital-Album';

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

// 1. Pre-Wedding: 40 pages (1..40), Front Cover & Back cover
const preWeddingPages: string[] = [];
for (let i = 1; i <= 40; i++) {
  preWeddingPages.push(
    getImageKitUrl(`${ROOT_FOLDER}/Pre%20wedding%2024%20july%202025/dev-suchismita-prewedding%20(${i}).jpg`)
  );
}

// 2. Wedding Ceremony: 70 pages (1..70), Front Cover & Back cover
const weddingPages: string[] = [];
for (let i = 1; i <= 70; i++) {
  weddingPages.push(
    getImageKitUrl(`${ROOT_FOLDER}/Wedding%203%20Aug%202025/dev-suchismita-wedding%20(${i}).jpg`)
  );
}

// 3. Wedding Reception: 68 pages (1..68), Front Cover & Back cover
const receptionPages: string[] = [];
for (let i = 1; i <= 68; i++) {
  receptionPages.push(
    getImageKitUrl(`${ROOT_FOLDER}/Reception%206%20Aug%202025/dev-suchismita-reception%20(${i}).jpg`)
  );
}

export const albums: AlbumData[] = [
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding',
    subtitle: 'Moments of Anticipation & Love',
    date: '24 July 2025',
    folderName: 'Pre wedding 24 july 2025',
    coverImage: getImageKitUrl(`${ROOT_FOLDER}/Pre%20wedding%2024%20july%202025/dev-suchismita-prewedding-front-cover.jpg`),
    backCoverImage: getImageKitUrl(`${ROOT_FOLDER}/Pre%20wedding%2024%20july%202025/dev-suchismita-prewedding-back-cover.jpg`),
    pages: preWeddingPages,
  },
  {
    id: 'wedding',
    title: 'Wedding Ceremony',
    subtitle: 'The Sacred Union & Eternal Vows',
    date: '3 August 2025',
    folderName: 'Wedding 3 Aug 2025',
    coverImage: getImageKitUrl(`${ROOT_FOLDER}/Wedding%203%20Aug%202025/dev-suchismita-wedding-front-cover.jpg`),
    backCoverImage: getImageKitUrl(`${ROOT_FOLDER}/Wedding%203%20Aug%202025/dev-suchismita-wedding-back-cover.jpg`),
    pages: weddingPages,
  },
  {
    id: 'reception',
    title: 'Wedding Reception',
    subtitle: 'Celebration, Feasts & Joy',
    date: '6 August 2025',
    folderName: 'Reception 6 Aug 2025',
    coverImage: getImageKitUrl(`${ROOT_FOLDER}/Reception%206%20Aug%202025/dev-suchismita-reception-front-cover.jpg`),
    backCoverImage: getImageKitUrl(`${ROOT_FOLDER}/Reception%206%20Aug%202025/dev-suchismita-reception-back-cover.jpg`),
    pages: receptionPages,
  },
];
