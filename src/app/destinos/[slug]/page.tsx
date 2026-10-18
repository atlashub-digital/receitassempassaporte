import {notFound} from 'next/navigation';
import Link from 'next/link';
import {recipes} from '@/lib/content';
import {RecipeCard} from '@/components/recipe-card';
const mapping:Record<string,string>={brasil:'Brasil',italia:'Itália',japao:'Japão',mundo:'Sabores do Mundo'};
export function generateStaticParams(){return Object.keys(mapping).map(slug=>({slug}))}
export default async function Destination({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const name=mapping[slug];if(!name)notFound();const data=recipes().filter(x=>slug==='mundo'? !['Brasil','Itália','Japão'].includes(x.country):x.country===name);return <><section className="page-hero"><div className="container"><Link href="/destinos" className="eyebrow">← Destinos</Link><h1>{name}</h1><p>Uma seleção de receitas inspiradas nos sabores deste destino.</p></div></section><div className="container section"><div className="listing">{data.map(item=><RecipeCard key={item.id} item={item}/>)}</div></div></>}