# Gates de qualidade — lote editorial v1

**Todas as 30 peças estão DRAFT. Nenhuma tem aprovação de publicação, fotografia licenciada ou teste de cozinha concluído.**

## Gate 0 — estrutura (automatizável)

- [ ] 24 receitas, 5 artigos, 1 guia; ID/slug único; locale pt-BR.
- [ ] Metadados e títulos completos; todos os arquivos previstos existem.
- [ ] Ingredientes quantificados, passos sequenciais e rendimento por receita.
- [ ] Referências de capítulos no `assembly.json` resolvem às receitas-mestre.
- [ ] Conteúdo de Source Pack não confundido com manifest AMF.

## Gate 1 — editorial e culinária

- [ ] Copydesk em português do Brasil, tom de marca uniforme.
- [ ] Cada receita **testada fisicamente** em cozinha, com registo de tempo, rendimento, peso, fotografias e possíveis erros.
- [ ] Rever autenticidade e contextualização cultural; identificar adaptações.
- [ ] Duplicações, ortografia, coerência entre ingredientes e passos.
- [ ] Artigos factualizados e aprovados (incluindo fontes).

## Gate 2 — segurança e direitos

- [ ] Revisão de segurança para frango, peixe, ovos, arroz e sobras.
- [ ] Harmonizar temperaturas e redação com orientação sanitária aplicável no Brasil.
- [ ] Alergénios verificados em ingredientes, rótulos e possibilidades de contaminação.
- [ ] Fotografias/vídeos originais ou com licença comercial e proveniência documentada.
- [ ] Nunca usar as imagens e aulas do curso de sushi de terceiros sem licença explícita.

## Gate 3 — WebReader e media

- [ ] Adaptador AMF compatível com versão homologada no EspelhoMeu.
- [ ] Guide e Article passam schema/validator AMF, sem perda de listas/pesos.
- [ ] Media, captions e alts validáveis; navegação 7 capítulos.
- [ ] Testes mobile 390 px e desktop 1440 px conforme maquete.
- [ ] Screenshots e QA visual; acessibilidade; SEO de receitas quando aplicável.

## Gate 4 — release

- [ ] Revisão humana final de cada conteúdo.
- [ ] PR aprovado e evidências; merge/deploy só após decisão explícita.
- [ ] Reversão documentada e nenhum entitlement premium introduzido sem gate comercial separado.

## Fontes oficiais de referência de segurança

- Anvisa (manipulação, armazenamento): https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2022/vai-preparar-a-ceia-fique-de-olho-nessas-dicas
- Anvisa (não lavar carnes): https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2025/vai-preparar-a-ceia-se-liga-em-nossas-dicas-e-garanta-saude-no-prato
- FoodSafety.gov: https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures
