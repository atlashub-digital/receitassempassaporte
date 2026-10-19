import Link from 'next/link';
import AulaPlayer from '@/components/academia/aula-player';
import catalogJson from '@/data/catalog-sushi.json';
import type { CatalogCurso } from '@/data/catalog';

const catalog: CatalogCurso = catalogJson;
export const metadata = { title: 'Academia — Catálogo do curso de sushi' };

export default function Sushi() {
  return <>
    <section className="page-hero"><div className="container">
      <Link className="eyebrow" href="/academia">← Academia</Link>
      <h1>{catalog.curso}</h1>
      <p>Por {catalog.autor} · {catalog.modulos.length} módulos · {catalog.total_videos} aulas</p>
      <p>Explore o programa do curso e abra os previews das aulas.</p>
    </div></section>
    <div className="container section">
      <div className="store-grid">
        {catalog.modulos.map((modulo) => <section className="module" key={modulo.ordem}>
          <span className="eyebrow">Módulo {modulo.ordem}</span>
          <h2 style={{ fontSize: '1.5rem' }}>{modulo.nome}</h2>
          <p className="muted">{modulo.num_videos} aulas</p>
          <ol style={{ paddingLeft: 22 }}>
            {modulo.aulas.map((aula) => <li key={aula.video} value={Number.parseInt(aula.parte, 10)} style={{ marginBottom: 16 }}>
              <p>{aula.titulo}</p>
              <Link className="button small outline" href={`/academia/sushi/${aula.video}`} aria-label={`Assistir: ${aula.titulo}`}>Assistir</Link>
              <AulaPlayer aula={aula.video} title={aula.titulo} preview />
            </li>)}
          </ol>
        </section>)}
      </div>
    </div>
  </>;
}
