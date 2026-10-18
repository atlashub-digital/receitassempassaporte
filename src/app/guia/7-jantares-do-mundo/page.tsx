import Link from 'next/link';
import {guide} from '@/lib/content';
import {PageFlipReader} from '@/components/page-flip-reader';
import '../../reader.css';
export const metadata={title:'7 Jantares do Mundo — WebReader'};
export default function GuidePage(){const g=guide();return <><div className="page-hero" style={{padding:'30px 0'}}><div className="container"><Link href="/biblioteca" className="eyebrow">← Biblioteca digital</Link><h1 style={{fontSize:'2.4rem'}}>7 Jantares do Mundo</h1><p>Um guia digital gratuito para descobrir novos sabores em casa. Leitura em páginas duplas, índice e modo acessível.</p></div></div><PageFlipReader intro={g.intro} chapters={g.chapters}/></>}