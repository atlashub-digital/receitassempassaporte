export interface Aula {
  video: string;
  ficheiro: string;
  titulo: string;
  parte: string;
  tamanho_MB: number;
}

export interface Modulo {
  ordem: number;
  nome: string;
  num_videos: number;
  pdf: string | null;
  aulas: Aula[];
}

export interface CatalogCurso {
  curso: string;
  autor: string;
  fonte_local: string;
  hls_base: string;
  total_videos: number;
  modulos: Modulo[];
}
