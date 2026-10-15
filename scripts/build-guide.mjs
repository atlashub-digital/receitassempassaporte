import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');
const assembly=JSON.parse(read('content/v1/guides/7-jantares-do-mundo.assembly.json'));
const mainBody=(s)=>{
  const cut=s.indexOf('\n---\n',4);
  if(cut<0) throw new Error('Missing frontmatter terminator');
  return s.slice(cut+5).trim().replace(/^# .+?\n\n/,'').split('## Nota editorial e segurança')[0].trim().replace(/^## /gm,'### ');
};
const preamble=`---
schema: "rsp-source-v0.1"
id: "guia-gratuito-7-jantares-do-mundo"
project: "receitassempassaporte"
type: "guide"
status: "draft"
publication_access: "public"
locale: "pt-BR"
title: "7 Jantares do Mundo para Fazer em Casa"
subtitle: "Uma viagem de sabores com ingredientes possíveis"
version: "0.1.0"
authors: ["Receitas sem Passaporte"]
rights: "original_editorial_draft"
media_status: "pending"
kitchen_tested: false
---

# 7 Jantares do Mundo para Fazer em Casa

*Uma viagem de sabores com ingredientes possíveis. Edição gratuita para leitura digital.*

`;
let result=preamble+assembly.intro+'\n';
for(const c of assembly.chapters){
 const source=read('content/v1/recipes/'+c.recipe_ref+'.md');
 result+='\n## Dia '+c.day+' · '+c.destination+'\n\n*'+c.lead+'*\n\n'+c.story+'\n\n### Receita da viagem\n\n'+mainBody(source)+'\n\n### Uma adaptação possível\n\n'+c.variation+'\n\n### Um gesto para a próxima paragem\n\n'+c.prep+'\n\n---\n';
}
result+='\n'+assembly.ending+'\n';
const dest=path.join(root,'content/v1/guides/7-jantares-do-mundo.md');
if(process.argv.includes('--check')){
 const old=fs.readFileSync(dest,'utf8');
 if(old!==result){console.error('Guide drift detected: run node scripts/build-guide.mjs');process.exit(1);}
 console.log('PASS: derived guide matches recipe masters');
}else{fs.writeFileSync(dest,result);console.log('Guide regenerated');}
