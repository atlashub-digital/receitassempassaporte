'use client';
import {useState,useEffect,useRef} from 'react';
import ReactMarkdown from 'react-markdown';
type Chapter={id:string;title:string;text:string};
const visual=[
 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1100&q=85',
 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1100&q=85',
 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1100&q=85',
 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1100&q=85',
 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1100&q=85',
 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1100&q=85',
 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=1100&q=85'
];
export function PageFlipReader({intro,chapters}:{intro:string;chapters:Chapter[]}){
 const [index,setIndex]=useState(0);const [simple,setSimple]=useState(false);const [turn,setTurn]=useState(false);const header=useRef<HTMLHeadingElement>(null);
 const total=chapters.length+1;
 function go(next:number){if(next<0||next>=total||next===index)return;setTurn(true);setIndex(next);setTimeout(()=>setTurn(false),450);header.current?.focus();}
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='ArrowRight')go(index+1);if(e.key==='ArrowLeft')go(index-1)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[index,total]);
 const chapter=index?chapters[index-1]:null;
 return <div className={'reader-app'+(simple?' simple':'')}>
 <div className="reader-toolbar"><span className="eyebrow">Receitas sem Passaporte · WebReader</span><div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}><button type="button" onClick={()=>setSimple(!simple)} className="filter" aria-pressed={simple}>{simple?'Ver livro':'Leitura acessível'}</button><span>{index+1} / {total}</span></div></div>
 <div className={'reader-spread'+(turn?' turning':'')}>
  <div className="reader-leaf reader-left">
    <div className="reader-leaf-header">EDIÇÃO DIGITAL · GUIA GRATUITO</div>
    {index===0?<><div className="reader-cover-photo"/><div className="reader-leaf-title"><span className="eyebrow">Sabores do mundo, na sua cozinha</span><h2 ref={header} tabIndex={-1}>7 Jantares do Mundo</h2><p>para Fazer em Casa</p></div></>:
    <><img className="reader-leaf-photo" src={visual[index-1]} alt={'Foto de referência gastronômica para '+chapter?.title+'; arte não verificada como o prato exato'}/><span className="eyebrow">Passaporte gastronômico</span><h2 ref={header} tabIndex={-1}>{chapter?.title}</h2><p className="muted" style={{fontSize:'.85rem'}}>Imagem ilustrativa · conteúdo editorial em revisão</p></>}
   <span className="reader-number">{index===0?'Capa':String(index*2).padStart(2,'0')}</span>
  </div>
  <div className="reader-leaf reader-right">
   <div className="reader-leaf-header">{chapter?'UM DESTINO · UMA NOVA HISTÓRIA':'PREPARE SUA VIAGEM'}</div>
   <div className="reader-leaf-body prose" aria-live="polite"><ReactMarkdown>{chapter?chapter.text:intro}</ReactMarkdown></div>
   <span className="reader-number">{String(index*2+1).padStart(2,'0')}</span>
  </div>
 </div>
 <div className="reader-controls"><button type="button" disabled={index===0} onClick={()=>go(index-1)}>← Página anterior</button><label className="reader-counter" htmlFor="chapter-select">Capítulo <select id="chapter-select" value={index} onChange={e=>go(Number(e.target.value))}><option value={0}>Introdução</option>{chapters.map((c,i)=><option value={i+1} key={c.id}>{c.title}</option>)}</select></label><button type="button" disabled={index===total-1} onClick={()=>go(index+1)}>Próxima página →</button></div>
 <p className="reader-disclaimer">Protótipo do WebReader: conteúdo íntegro do master editorial; paginação por capítulos e animação experimental. Paginação tipográfica final e direitos de media ainda aguardam homologação.</p>
 </div>;
}