import Link from 'next/link';
import { notFound } from 'next/navigation';
import catalogJson from '@/data/catalog-sushi.json';
import type { CatalogCurso } from '@/data/catalog';
import AulaPlayer from '@/components/academia/aula-player';

const catalog: CatalogCurso = catalogJson;

export function generateStaticParams() {
  return catalog.modulos.flatMap((modulo) => modulo.aulas.map((aula) => ({ aula: aula.video })));
}

export default async function AulaPage({ params }: { params: Promise<{ aula: string }> }) {
  const { aula: id } = await params;
  const modulo = catalog.modulos.find((modulo) => modulo.aulas.some((aula) => aula.video === id));
  const aula = modulo?.aulas.find((aula) => aula.video === id);
  if (!modulo || !aula) notFound();

  return <>
    <section className="page-hero"><div className="container">
      <Link className="eyebrow" href="/academia/sushi">← Catálogo de sushi</Link>
      <h1>{aula.titulo}</h1>
      <p>{catalog.curso} · {catalog.autor}</p>
    </div></section>
    <div className="container section course-grid">
      <div>
        <AulaPlayer aula={aula.video} title={aula.titulo} />
      </div>
      <aside className="sidebar" aria-label="Metadados da aula">
        <h2 style={{ fontSize: '1.5rem' }}>Sobre esta aula</h2>
        <dl>
          <dt>Módulo {modulo.ordem}</dt><dd>{modulo.nome}</dd>
          <dt>Parte</dt><dd>{aula.parte}</dd>
          <dt>Identificador</dt><dd>{aula.video}</dd>
          <dt>Ficheiro</dt><dd>{aula.ficheiro}</dd>
          <dt>Tamanho</dt><dd>{aula.tamanho_MB} MB</dd>
        </dl>
      </aside>
    </div>
  </>;
}
