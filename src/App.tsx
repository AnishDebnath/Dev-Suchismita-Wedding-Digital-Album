/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { AlbumViewer } from './components/AlbumViewer';
import { AlbumShowcase } from './components/AlbumShowcase';
import { albums } from './data/albums';
import { buildAlbumConfig } from './data/album.config';
import { backgroundMusic } from './utils/backgroundMusic';

export default function App() {
  // Read hash on initial mount (e.g. #pre-wedding, #wedding, #reception)
  const getInitialAlbumId = (): string | null => {
    if (typeof window === 'undefined') return null;
    const hash = window.location.hash.replace(/^#/, '');
    if (albums.some(a => a.id === hash)) {
      return hash;
    }
    return null;
  };

  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(getInitialAlbumId);

  // Stop background music whenever user is on the 3-album home page
  useEffect(() => {
    if (!selectedAlbumId) {
      backgroundMusic.stop();
    }
  }, [selectedAlbumId]);

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (albums.some(a => a.id === hash)) {
        setSelectedAlbumId(hash);
      } else if (!hash) {
        setSelectedAlbumId(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectAlbum = (id: string) => {
    setSelectedAlbumId(id);
    window.location.hash = id;
  };

  const handleBackToAlbums = () => {
    setSelectedAlbumId(null);
    history.pushState(null, '', window.location.pathname + window.location.search);
  };

  const activeAlbum = useMemo(() => {
    return albums.find(a => a.id === selectedAlbumId);
  }, [selectedAlbumId]);

  const activeConfig = useMemo(() => {
    return activeAlbum ? buildAlbumConfig(activeAlbum) : null;
  }, [activeAlbum]);

  return (
    <main className="w-full h-screen bg-[#f5f4ef] overflow-hidden">
      <h1 className="sr-only">Dev &amp; Suchismita Wedding Digital Album</h1>
      {activeConfig ? (
        <AlbumViewer
          key={activeConfig.id}
          config={activeConfig}
          onBackToAlbums={handleBackToAlbums}
        />
      ) : (
        <AlbumShowcase
          albums={albums}
          onSelectAlbum={handleSelectAlbum}
        />
      )}
    </main>
  );
}
