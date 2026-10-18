# Receitas sem Passaporte — MVP Vercel 18/10/2026

## Rota de lançamento
- Portal público, listagem e detalhe de receitas em revisão editorial.
- Destinos / Brasil / Itália / Japão / Mundo.
- 5 artigos educativos (draft).
- WebReader experimental de 7 capítulos, com livro em spread no desktop e leitura acessível.
- Biblioteca multi-formato e Academia (UI de catálogo).
- Curso de sushi: 17 módulos propostos; **não reproduz vídeo sem gateway e direito de acesso verificados**.
- Landing de demonstração comercial, com pagamento explicitamente desativado.
- GET /api/health expõe estados reais; POST /api/media-token retorna 503.

## Princípios
1. Fonte editorial canónica em content/v1 da PR #1.
2. Texto do Reader vem de .md, nunca de imagens de maquetes.
3. Imagens externas atualmente ilustrativas; substituir por media originais/licenciadas e aprovadas.
4. Conteúdo ainda DRAFT, não anunciar culinária testada.
5. Sem produção comercial até login, checkout, webhook, entitlements e gateway HLS concluídos.
6. Não reutilizar bases de dados de LIA, EspelhoMeu ou AMF para compradores.

## Integração HLS fase seguinte
Consultar SPEC-PLATAFORMA-WEB.md da Helena (17/10/2026): origem na VPS, 114 transcodificações declaradas e catalog.json. O backend deverá importar o catálogo real preservando IDs F001..F114, usar identidade própria ou contas federadas com ID interno estável, validar entitlements pelo servidor e autorizar inclusive playlists, init.mp4 e segmentos. Não introduzir tokens de longa duração nas URLs. Proteger material sensível com sessão e renovação, TLS, CORS estrito e políticas de tráfego testadas.

## Gates ainda bloqueantes
- Os 114 vídeos e PDFs NÃO foram inspecionados nesta execução via VPS.
- Não existe acesso dedicado ao Supabase Receitas sem Passaporte.
- Gateway, login, transação e player privados não homologados.
- Imagens das receitas geradas anteriormente não constituem confirmação de apresentação exata do prato.
- PDF exportado anteriormente não é WebReader final.
