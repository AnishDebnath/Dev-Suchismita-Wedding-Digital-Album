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
  // Read clean path URL on initial mount (e.g. /pre-wedding, /wedding, /reception)
  const getAlbumFromUrl = (): string | null => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const found = albums.find(a => a.id === path);
    if (found) return found.id;
    // Fallback support for query param or legacy hash
    const params = new URLSearchParams(window.location.search);
    const paramAlbum = params.get('album');
    if (paramAlbum && albums.some(a => a.id === paramAlbum)) return paramAlbum;
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && albums.some(a => a.id === hash)) return hash;
    return null;
  };

  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(getAlbumFromUrl);

  // Stop background music whenever user is on the 3-album home page
  useEffect(() => {
    if (!selectedAlbumId) {
      backgroundMusic.stop();
    }
  }, [selectedAlbumId]);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setSelectedAlbumId(getAlbumFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectAlbum = (id: string) => {
    setSelectedAlbumId(id);
    window.history.pushState(null, '', `/${id}`);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbumId(null);
    window.history.pushState(null, '', '/');
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
