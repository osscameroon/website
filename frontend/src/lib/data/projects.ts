import { apiFetch, type ApiResponse, type ApiSearchResponse } from '../api';
import { PER_PAGE } from './developers';

export type Project = {
  id: number;
  name: string;
  full_name: string;
  desc: string;
  tags: string[];
  lang: string;
  stars: number;
  forks: number;
  open_issues: number;
  watchers: number;
  topics: string[];
  license: string;
  owner_login: string;
  owner_avatar: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  img: string;
  contributors: string[];
};

/* ── API types ── */
type ApiProject = {
  name: string;
  full_name?: string;
  description?: string;
  language?: string;
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  watchers_count?: number;
  topics?: string[];
  license?: { name?: string } | null;
  html_url?: string;
  created_at?: string;
  updated_at?: string;
  owner?: { login?: string; avatar_url?: string };
  [key: string]: unknown;
};

/* ── Format star count for display ── */
function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}

/* ── Map API project → frontend Project ── */
function mapProject(p: ApiProject, index: number): Project {
  const lang = p.language || '';
  const stars = p.stargazers_count ?? 0;
  const forks = p.forks_count ?? 0;
  const open_issues = p.open_issues_count ?? 0;
  const tags: string[] = [];
  if (lang) tags.push(lang);
  if (stars > 0) tags.push(`★ ${formatStars(stars)}`);
  if (forks > 0) tags.push(`Forks ${formatStars(forks)}`);

  return {
    id: index,
    name: p.name,
    full_name: p.full_name || p.name,
    desc: p.description || '',
    tags,
    lang,
    stars,
    forks,
    open_issues,
    watchers: p.watchers_count ?? 0,
    topics: p.topics ?? [],
    license: p.license?.name || '',
    owner_login: p.owner?.login || '',
    owner_avatar: p.owner?.avatar_url || '/assets/avatars/a1.png',
    html_url: p.html_url || '',
    created_at: p.created_at || '',
    updated_at: p.updated_at || '',
    img: p.owner?.avatar_url || '/assets/projects/miniyotas.png',
    contributors: p.owner?.avatar_url ? [p.owner.avatar_url] : ['/assets/avatars/a1.png'],
  };
}

/* ── Placeholder data (used for home page & fallback) ── */
const asset = (path: string) => `/${path}`;
const PROJ_IMGS = ["assets/projects/miniyotas.png","assets/projects/aesthetic.png","assets/projects/jobsika.png"];
const PLACEHOLDER_EXTRA = { full_name: '', forks: 0, open_issues: 0, watchers: 0, topics: [], license: '', owner_login: '', owner_avatar: '', html_url: '#', created_at: '', updated_at: '' };
const BASE_PROJECTS_RAW = [
  { name: "Jobsika", desc: "A community-driven platform for company reviews and salary transparency in Cameroon.", tags: ["Python"], lang: "Python", stars: 320, img: PROJ_IMGS[2], contributors: ["assets/avatars/a7.png","assets/avatars/a4.png"], ...PLACEHOLDER_EXTRA, html_url: "https://github.com/osscameroon/jobsika" },
  { name: "Lewa", desc: "A modern and lightweight URL shortener service built by the community.", tags: ["Go"], lang: "Go", stars: 45, img: PROJ_IMGS[1], contributors: ["assets/avatars/a1.png","assets/avatars/a3.png"], ...PLACEHOLDER_EXTRA, html_url: "https://github.com/osscameroon/lewa" },
  { name: "Place", desc: "Mapping and location-based services — an open-source alternative for discovering places in Cameroon.", tags: ["Typescript"], lang: "Typescript", stars: 30, img: PROJ_IMGS[0], contributors: ["assets/avatars/a5.png"], ...PLACEHOLDER_EXTRA, html_url: "https://github.com/osscameroon/place" },
  { name: "CamerApps", desc: "A curated directory of applications and digital communities made in Cameroon.", tags: ["Typescript"], lang: "Typescript", stars: 55, img: PROJ_IMGS[2], contributors: ["assets/avatars/a2.png","assets/avatars/a6.png"], ...PLACEHOLDER_EXTRA, html_url: "https://github.com/osscameroon/camerapps" },
  { name: "MiniYotas", desc: "Internal gamification system — contribute to OSS Cameroon projects and earn Yotas as recognition.", tags: ["Blade"], lang: "Blade", stars: 12, img: PROJ_IMGS[0], contributors: ["assets/avatars/a4.png"], ...PLACEHOLDER_EXTRA },
  { name: "osscameroon-website", desc: "The OSS Cameroon website — also a sandbox for newcomers learning Git workflows and open-source collaboration.", tags: ["Typescript"], lang: "Typescript", stars: 80, img: PROJ_IMGS[1], contributors: ["assets/avatars/a7.png","assets/avatars/a1.png"], ...PLACEHOLDER_EXTRA, html_url: "https://github.com/osscameroon/osscameroon-website" },
  { name: "project-ideas", desc: "The community think tank — brainstorming tech solutions for transport, health, and education in Cameroon.", tags: ["Docs"], lang: "", stars: 25, img: PROJ_IMGS[2], contributors: ["assets/avatars/a3.png","assets/avatars/a5.png"], ...PLACEHOLDER_EXTRA, html_url: "https://github.com/osscameroon/project-ideas" },
];
export const BASE_PROJECTS: Project[] = BASE_PROJECTS_RAW.map((p, id) => ({ ...p, id, img: asset(p.img), contributors: p.contributors.map(asset) }));

export const LANGS = ["Typescript","Python","Go","Kotlin","Blade"];

export type ProjectQuery = { q?: string; stars?: string; sort?: string; page?: number; lang?: string[] };

/* ── Fetch languages from API ── */
export async function getLanguages(): Promise<string[]> {
  try {
    const data = await apiFetch<ApiResponse<string[]>>('/github/languages');
    if (!data.result) return LANGS;
    return data.result;
  } catch {
    return LANGS;
  }
}

/* ── Fetch projects from API with search/filter/pagination ── */
export async function queryProjects(query: ProjectQuery) {
  try {
    const page = query.page ?? 1;
    const sort = query.sort;
    const defaultSort = !sort || sort === 'Most stars';

    // For "Most stars" (default), use the API's popularity sort
    const body: Record<string, unknown> = {
      query: query.q ?? '',
      page,
      count: PER_PAGE,
      sort_type: defaultSort ? 'popularity' : (sort === 'Name A–Z' ? 'alphabetic' : 'most_recent'),
    };

    const langs = query.lang ?? [];
    if (langs.length) {
      body.languages = langs;
    }

    const data = await apiFetch<ApiSearchResponse<ApiProject>>('/github/projects/search', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (!data.result) {
      return { items: [], total: 0, page, pages: 1, start: 0, end: 0 };
    }

    const hits = data.result.hits ?? [];
    let items = hits.map(mapProject);
    const total = data.result.estimatedTotalHits ?? data.result.nbHits ?? items.length;
    const pages = Math.max(1, Math.ceil(total / PER_PAGE));

    // Apply star filter client-side
    if (query.stars === '1k+ stars') items = items.filter(p => p.stars >= 1000);
    if (query.stars === '100+ stars') items = items.filter(p => p.stars >= 100);

    return {
      items,
      total,
      page,
      pages,
      start: total ? (page - 1) * PER_PAGE + 1 : 0,
      end: Math.min(total, page * PER_PAGE),
    };
  } catch (e) {
    console.error('Failed to fetch projects from API, using placeholders:', e);
    return queryProjectsFallback(query);
  }
}

export async function getProjects() {
  try {
    const data = await apiFetch<ApiResponse<ApiProject[]>>('/github/projects?count=20');
    if (!data.result) return BASE_PROJECTS;
    return data.result.map(mapProject);
  } catch {
    return BASE_PROJECTS;
  }
}

/* ── Fallback: in-memory filtering ── */
function makeFallbackProjects(): Project[] {
  const projects: Project[] = [];
  for (let i = 0; i < 27; i++) {
    const b = BASE_PROJECTS[i % BASE_PROJECTS.length];
    projects.push(Object.assign({}, b, { id: i, name: i < 9 ? b.name : b.name + " " + (Math.floor(i / 9) + 1) }));
  }
  return projects;
}
const FALLBACK_PROJECTS = makeFallbackProjects();

function queryProjectsFallback(query: ProjectQuery) {
  const q = (query.q ?? '').trim().toLowerCase();
  const langs = query.lang ?? [];
  let out = FALLBACK_PROJECTS.filter((p) => {
    if (langs.length && !langs.includes(p.lang)) return false;
    if (query.stars === '1k+ stars' && p.stars < 1000) return false;
    if (query.stars === '100+ stars' && p.stars < 100) return false;
    if (!q) return true;
    return (p.name + ' ' + p.desc + ' ' + p.lang).toLowerCase().includes(q);
  });
  if (!query.sort || query.sort === 'Most stars') out = out.slice().sort((a, b) => b.stars - a.stars);
  else if (query.sort === 'Name A–Z') out = out.slice().sort((a, b) => a.name.localeCompare(b.name));
  const total = out.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const page = Math.min(Math.max(query.page ?? 1, 1), pages);
  const start = (page - 1) * PER_PAGE;
  return { items: out.slice(start, start + PER_PAGE), total, page, pages, start: total ? start + 1 : 0, end: Math.min(total, start + PER_PAGE) };
}
