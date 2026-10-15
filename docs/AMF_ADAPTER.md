# AMF Handoff — Receitas sem Passaporte

Referência técnica: `atlashub-digital/espelhomeu/docs/CONTENT_PUBLISHING_PIPELINE.md`, `CONTENT_READY_RUNBOOK.md` e `AMF_UPSTREAM_REQUIREMENTS.md`, consultados em 2026-10-14.

## Não duplicar contratos

A AMF já tem Article e Guide/Publication; o EspelhoMeu documenta `@atlashub-digital/amf-content-schema@0.2.0` e `@atlashub-digital/amf-experience-core@0.2.1`. Estes números são referências do piloto, **não a autorização de upgrade**. Confirmar a versão canónica ao iniciar implementação.

## Modelo de ingestão proposto

| Fonte neutra | Saída AMF candidata | Notas |
|---|---|---|
| Recipe (.md) | Article / Publication com adaptador de apresentação culinária | Preserve `ingredients`, `steps`, `minutes`, `servings`, `allergens` como fonte de dados; não introduzir `recipe` como novo tipo no schema sem validação upstream |
| Article (.md) | Article | Transformar markdown em body blocks com mapeamento determinístico, sem duplicar texto em React |
| Guide 7 Jantares (.md) | Guide / Publication, capítulos ordenados | O guia compilado reutiliza texto das receitas; `assembly.json` rastreia proveniência. Validar drift e capítulo a capítulo |
| Fotos e vídeo | MediaAsset com origem/licença | Sem placeholders finais inventados; media pendente |
| Biblioteca pública | Collection canónica | Só após contrato AMF validado |

## Público e paid futuro

Todo lote V1 é gratuito e `draft`. A arquitetura futura separará CONTENT / COMMERCE / PAYMENT / ENTITLEMENT; guardar apenas no servidor os masters premium, verificar entitlement antes de entregar conteúdo, nunca incorporar livros pagos no frontend público.

## Fluxo de publicação

Fonte editorial original → copydesk + testes culinários → media + licença → adapter validado com AMF → preview com WebReader → smoke desktop/mobile → revisão humana → PR aprovado → release explícita.

Sem merge automático, sem deploy deliberado, sem checkout nesta missão. O site futuro deverá ser implementado conforme `RCP_Maquete_WebPage.png`.

## Critérios mínimos do adaptador

- IDs e slugs estáveis, locale pt-BR, descrições/SEO, categorias e etiquetas.
- Todos os ingredientes/métodos visíveis no Reader; sem perda de quantidades e listas.
- Navegação por capítulos, capa, índice e links funcionais; preview para todos os tamanhos.
- `public` e `paid` separados, autorização servidor para premium.
- Logs de transformação, fingerprints SHA-256, diff entre fonte e saída e testes.
