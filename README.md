# Receitas sem Passaporte — Editorial Foundation

**Estado:** Source Pack v0.1 em revisão. Não é um site publicado, não é uma biblioteca com licença comercial comprovada e não contém produtos pagos.

- **Repositório:** https://github.com/atlashub-digital/receitassempassaporte
- **Drive de trabalho:** https://drive.google.com/drive/folders/1zPPOFI6kKpUE1gqt1GloDm2LbzauFBEE
- **YouTube:** https://www.youtube.com/@ReceitasSemFronteira
- **Referência visual:** [maquete desktop/mobile aprovada com imagem embutida no Drive](https://docs.google.com/document/d/1Gw_s8bmst7pOFebpG11L2EYvpE-CCglQyDOMB24F7cA/edit), originalmente `RCP_Maquete_WebPage.png`. Implementação visual futura deve respeitá-la.

## Lote V1

- 24 receitas originais (6 Brasil, 6 Itália, 6 Japão, 6 outros destinos).
- 5 artigos práticos (organização, substituições, textura/cozimento, despensa e segurança).
- 1 guia gratuito completo de 7 capítulos, derivado de 7 receitas-mestre, para posterior entrega no WebReader.
- Nenhuma fotografia final ou vídeo foi importado; media precisam de produção/licenciamento e revisão.

## Organização

- `content/v1/recipes/*.md` — recipes originais, com ingredientes, quantidades, passos, dicas e metadados.
- `content/v1/articles/*.md` — artigos.
- `content/v1/guides/7-jantares-do-mundo.md` — composição legível do guia.
- `content/v1/guides/7-jantares-do-mundo.assembly.json` — referências às receitas-fonte e texto de transição.
- `content/v1/index.json` — índice neutro do Source Pack. **Não é o manifest canónico AMF**.
- `docs/AMF_ADAPTER.md` — requisitos de conversão para o contrato do EspelhoMeu.
- `docs/EDITORIAL_QA.md` — gates para revisão e publicação.
- `docs/REUSE_AUDIT.md` — política de material encontrado em bibliotecas PLR e cursos.
- `docs/DESIGN_HANDOFF.md` — a futura implementação da maquete.

## Verificação

```bash
node scripts/validate-source-pack.mjs
```

Este script faz verificações estruturais e de integridade **apenas**. Não substitui prova de cozinha, copydesk, direitos, validação de alergénios ou smoke tests visuais.

## Estado AMF

O formato `rsp-source-v0.1` é apenas um **Source Pack neutro**. Não publicar estes ficheiros diretamente como se já fossem `@atlashub-digital/amf-content-schema@0.2.0`. O adaptador de ingestão será decidido depois do ciclo de normalização/homologação EspelhoMeu, preservando Article, Guide/Publication, media e acesso. Não criar contratos AMF paralelos.

## Governança

Notion decide; Paperclip coordena; GitHub versiona; Drive mantém masters de produção audiovisual, direitos e suporte editorial. Nenhum checkout, produto premium, DNS, deploy ou alteração de produção está autorizado por este Source Pack.
