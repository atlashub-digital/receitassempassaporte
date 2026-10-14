import fs from 'node:fs';
import path from 'node:path';
const base=process.cwd();
const manifest=JSON.parse(fs.readFileSync(path.join(base,'content/v1/index.json'),'utf8'));
const errors=[];
if(manifest.items.length!==30) errors.push('Expected 30 items; got '+manifest.items.length);
const counts={recipe:0,article:0,guide:0};
const ids=new Set();
for(const item of manifest.items){
  counts[item.type]=(counts[item.type]||0)+1;
  if(ids.has(item.id)) errors.push('duplicate id '+item.id);
  ids.add(item.id);
  const p=path.join(base,item.path);
  if(!fs.existsSync(p)){errors.push('missing '+item.path);continue;}
  const s=fs.readFileSync(p,'utf8');
  if(!s.startsWith('---\n')) errors.push('missing frontmatter '+item.id);
  if(!s.includes('id: '+JSON.stringify(item.id))) errors.push('id mismatch '+item.id);
  if(!s.includes('status: '+JSON.stringify('draft'))) errors.push('status mismatch '+item.id);
  if(item.type==='recipe'){
    if(!s.includes('## Ingredientes')||!s.includes('## Modo de preparo')) errors.push('incomplete recipe '+item.id);
    if(!s.includes('kitchen_tested: false')) errors.push('recipe test status missing '+item.id);
  }
}
for(const [kind,num] of Object.entries(manifest.totals)){
  const k=kind==='recipes'?'recipe':kind==='articles'?'article':'guide';
  if(counts[k]!==num)errors.push(k+' count mismatch '+counts[k]+' vs '+num);
}
const a=JSON.parse(fs.readFileSync(path.join(base,'content/v1/guides/7-jantares-do-mundo.assembly.json'),'utf8'));
if(a.chapters.length!==7) errors.push('guide not 7 chapters');
for(const c of a.chapters){
 if(!ids.has(c.recipe_ref))errors.push('guide missing recipe ref '+c.recipe_ref);
 const p=path.join(base,'content/v1/recipes/'+c.recipe_ref+'.md');
 if(!fs.existsSync(p))errors.push('guide recipe file missing '+c.recipe_ref);
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log('PASS: '+counts.recipe+' recipes, '+counts.article+' articles, '+counts.guide+' guide; 7 guide refs; source-level structure only');
