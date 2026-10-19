import { createHmac } from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const headers = { 'Cache-Control': 'no-store' };

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400, headers });
  }
  const aula = body && typeof body === 'object' && 'aula' in body ? body.aula : undefined;
  if (typeof aula !== 'string' || !/^F\d{3}$/.test(aula)) {
    return NextResponse.json({ error: 'Identificador de aula inválido.' }, { status: 400, headers });
  }

  const secret = process.env.MEDIA_JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Vídeo temporariamente indisponível.' }, { status: 503, headers });
  }

  // Placeholder demo: auth real por Telegram/entitlements vem no próximo incremento.
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: 'demo', curso: 'sushi', exp: Math.floor(Date.now() / 1000) + 4 * 60 * 60,
  })).toString('base64url');
  const signature = createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url');
  const token = `${header}.${payload}.${signature}`;
  return NextResponse.json({
    url: `https://receitassempassaport.novidades.store/media/${aula}/index.m3u8?t=${token}`,
  }, { headers });
}
