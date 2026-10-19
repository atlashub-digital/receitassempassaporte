'use client';

import { useState } from 'react';

export default function AcessoAula({ video }: { video: string }) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  async function solicitarAcesso() {
    setPending(true);
    setMessage('');
    try {
      const response = await fetch('/api/media-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video }),
      });
      if (!response.ok) {
        setMessage('acesso em preparação');
        return;
      }
      setMessage('O player está em integração. O acesso estará disponível em breve.');
    } catch {
      setMessage('acesso em preparação');
    } finally {
      setPending(false);
    }
  }

  return <div>
    <button className="button" type="button" disabled={pending} onClick={solicitarAcesso}>
      {pending ? 'A verificar acesso…' : 'Verificar acesso à aula'}
    </button>
    <p role="status" aria-live="polite" style={{ marginTop: 16 }}>{message}</p>
  </div>;
}
