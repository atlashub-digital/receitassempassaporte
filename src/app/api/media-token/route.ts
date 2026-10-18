import {NextResponse} from 'next/server';
export const dynamic='force-dynamic';
export async function POST(){return NextResponse.json({error:'A autenticação e os direitos de acesso HLS não estão ligados. Nenhuma URL privada será emitida.'},{status:503,headers:{'Cache-Control':'no-store'}})}
