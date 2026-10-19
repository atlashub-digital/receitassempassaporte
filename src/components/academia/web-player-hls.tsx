'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function WebPlayerHLS({ url, title }: { url: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setLoading(true);
    setError(false);
    let hls: Hls | undefined;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else if (Hls.isSupported()) {
      const source = new URL(url);
      hls = new Hls({
        xhrSetup(xhr, requestUrl) {
          const target = new URL(requestUrl, url);
          // Nested playlists also require the token; media segments do not.
          if (target.origin === source.origin && target.pathname.endsWith('.m3u8')) {
            target.searchParams.set('t', source.searchParams.get('t') ?? '');
            xhr.open('GET', target.toString(), true);
          }
        },
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setError(true);
          setLoading(false);
          hls?.destroy();
        }
      });
      hls.loadSource(url);
      hls.attachMedia(video);
    } else {
      setError(true);
      setLoading(false);
    }

    return () => {
      hls?.destroy();
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [url]);

  return <div>
    <video
      ref={videoRef}
      controls
      playsInline
      autoPlay={false}
      preload="metadata"
      aria-label={title}
      style={{ width: '100%', aspectRatio: '16 / 9', display: 'block', background: '#1a2b22', borderRadius: 13 }}
      onLoadedData={() => setLoading(false)}
      onCanPlay={() => setLoading(false)}
      onPlaying={() => setLoading(false)}
      onWaiting={() => setLoading(true)}
      onError={() => { setError(true); setLoading(false); }}
    />
    {error ? <p role="alert">Não foi possível carregar o vídeo. Feche e volte a abrir o player para tentar novamente.</p>
      : loading ? <p role="status">A carregar vídeo…</p> : null}
  </div>;
}
