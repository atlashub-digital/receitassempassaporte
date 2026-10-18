import fs from 'node:fs';
import path from 'node:path';
const base=path.join(process.cwd(),'content','v1');
export type Entry={id:string;slug:string;title:string;country:string;minutes:number;servings:number;difficulty:string;tags:string[];body:string;type:string;status:string;};
function parse(dir:string,file:string):Entry{
 const raw=fs.readFileSync(path.join(base,dir,file),'utf8');
 const end=raw.indexOf('\n---\n',4);
 if(!raw.startsWith('---\n')||end<0)throw new Error('Invalid master '+file);
 const attrs:Record<string,unknown>={};
 for(const line of raw.slice(4,end).split('\n')){
  const i=line.indexOf(':');if(i<0)continue;
  const name=line.slice(0,i).trim(),val=line.slice(i+1).trim();
  try{attrs[name]=JSON.parse(val)}catch{attrs[name]=val}
 }
 return {id:String(attrs.id),slug:file.slice(0,-3),title:String(attrs.title),country:String(attrs.country||''),minutes:Number(attrs.minutes||0),servings:Number(attrs.servings||0),difficulty:String(attrs.difficulty||''),tags:Array.isArray(attrs.tags)?attrs.tags as string[]:[],body:raw.slice(end+5).trim(),type:String(attrs.type),status:String(attrs.status)};
}
function group(name:string){return fs.readdirSync(path.join(base,name)).filter(x=>x.endsWith('.md')).map(x=>parse(name,x))}
export function recipes(){return group('recipes')}
export function articles(){return group('articles')}
export function recipe(slug:string){return recipes().find(x=>x.slug===slug)}
export function article(slug:string){return articles().find(x=>x.slug===slug)}
export function guide(){
 const text=fs.readFileSync(path.join(base,'guides','7-jantares-do-mundo.md'),'utf8');
 const e=text.indexOf('\n---\n',4);const body=text.slice(e+5);
 const parts=body.split(/(?=^## Dia \d+ · )/m);
 return {intro:parts[0],chapters:parts.slice(1).map((part,i)=>({id:'day-'+(i+1),title:(part.match(/^## (.*)$/m)||[])[1]||'Dia '+(i+1),text:part.replace(/^## .*\n/,'').trim()}))};
}
const photos:Record<string,string>={
 'it-pasta-ao-pomodoro':'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1000&q=80',
 'jp-ramen-frango-cogumelos':'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000&q=80',
 'br-moqueca-de-peixe':'https://images.unsplash.com/photo-1547592180-85f173990554?w=1000&q=80',
 'wd-tajine-frango-limao':'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&q=80',
 'wd-tacos-feijao-milho':'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1000&q=80',
 'wd-dhal-lentilhas':'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1000&q=80',
 'wd-shakshuka':'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=1000&q=80'
};
export function photo(slug:string){
 return photos[slug]||photos[slug.startsWith('it')?'it-pasta-ao-pomodoro':slug.startsWith('jp')?'jp-ramen-frango-cogumelos':slug.startsWith('br')?'br-moqueca-de-peixe':'wd-tacos-feijao-milho'];
}
