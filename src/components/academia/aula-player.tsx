'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const WebPlayerHLS = dynamic(() => import('./web-player-hls'), {
  ssr: false,
  loading: () => <p role="status">A preparar o player…</p>,
});

export default function AulaPlayer({ aula, title, preview = false }: {
  aula: string; title: string; preview?: boolean;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  async function open() {
    if (controllerRef.current) return;
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('/api/media-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aula }),
        cache: 'no-store',
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Token unavailable');
      const data = await response.json();
      if (typeof data.url !== 'string') throw new Error('Invalid response');
      setUrl(data.url);
    } catch {
      if (!controller.signal.aborted) setError(true);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  }

  return <div style={{ marginTop: preview ? 12 : 0, minWidth: 0 }}>
    {url ? <>
      <WebPlayerHLS url={url} title={title} />
      <button type="button" className="button small outline" onClick={() => setUrl(null)} style={{ marginTop: 8 }}>
        {preview ? 'Fechar preview' : 'Fechar player'}
      </button>
    </> : <>
      <button type="button" className="button small outline" disabled={loading} onClick={open}
        aria-label={`${preview ? 'Preview' : 'Abrir vídeo'}: ${title}`}>
        {loading ? 'A preparar…' : error ? 'Tentar novamente' : preview ? 'Preview' : 'Abrir vídeo'}
      </button>
      {loading ? <p role="status">A preparar o vídeo…</p> : null}
      {error ? <p role="alert">Não foi possível preparar o vídeo. Tente novamente dentro de instantes.</p> : null}
    </>}
  </div>;
}
