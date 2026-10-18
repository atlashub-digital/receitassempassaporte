import {NextResponse} from 'next/server';
export const dynamic='force-dynamic';
export function GET(){return NextResponse.json({service:'receitassempassaporte',site:'online',reader:'editorial-preview',payments:'disabled',premiumStreaming:'disabled',timestamp:new Date().toISOString()},{headers:{'Cache-Control':'no-store'}})}
