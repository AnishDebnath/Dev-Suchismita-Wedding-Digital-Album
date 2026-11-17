// ponytail: eager glob of album images — zero overhead, no manual array lists
const preWeddingGlob = import.meta.glob<string>(
  '/src/assets/images/Pre wedding 24 july 2025/*.jpg',
  { eager: true, import: 'default' }
);
const weddingGlob = import.meta.glob<string>(
  '/src/assets/images/Wedding 3 Aug 2025/*.jpg',
  { eager: true, import: 'default' }
);
const receptionGlob = import.meta.glob<string>(
  '/src/assets/images/Reception 6 Aug 2025/*.jpg',
  { eager: true, import: 'default' }
);

export interface AlbumData {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  coverImage: string;
  backCoverImage: string;
  pages: string[];
}

function parseGlob(globRecord: Record<string, string>): {
  coverImage: string;
  backCoverImage: string;
  pages: string[];
} {
  let coverImage = '';
  let backCoverImage = '';
  const pageEntries: { num: number; url: string }[] = [];

  for (const [path, url] of Object.entries(globRecord)) {
    const filename = path.split('/').pop() || '';
    if (/front\s*cover/i.test(filename)) {
      coverImage = url;
    } else if (/back\s*cover/i.test(filename)) {
      backCoverImage = url;
    } else {
      const match = filename.match(/^(\d+)\.jpg$/i);
      if (match) {
        pageEntries.push({ num: parseInt(match[1], 10), url });
      }
    }
  }

  // Sort pages numerically (0.jpg, 1.jpg, 2.jpg, ...)
  pageEntries.sort((a, b) => a.num - b.num);
  const pages = pageEntries.map(e => e.url);

  return {
    coverImage: coverImage || pages[0] || '',
    backCoverImage: backCoverImage || pages[pages.length - 1] || '',
    pages,
  };
}

const preWeddingParsed = parseGlob(preWeddingGlob);
const weddingParsed = parseGlob(weddingGlob);
const receptionParsed = parseGlob(receptionGlob);

export const albums: AlbumData[] = [
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding',
    subtitle: 'Moments of Anticipation & Love',
    date: '24 July 2025',
    ...preWeddingParsed,
  },
  {
    id: 'wedding',
    title: 'Wedding Ceremony',
    subtitle: 'The Sacred Union & Eternal Vows',
    date: '3 August 2025',
    ...weddingParsed,
  },
  {
    id: 'reception',
    title: 'Wedding Reception',
    subtitle: 'Celebration, Feasts & Joy',
    date: '6 August 2025',
    ...receptionParsed,
  },
];
