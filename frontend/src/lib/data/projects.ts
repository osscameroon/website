import { PER_PAGE } from './developers';

export type Project = { id: number; name: string; desc: string; tags: string[]; lang: string; stars: number; img: string; contributors: string[] };
const asset = (path: string) => `/${path}`;
const PROJ_IMGS = ["assets/projects/miniyotas.png","assets/projects/aesthetic.png","assets/projects/jobsika.png"];
const BASE_PROJECTS_RAW = [
  { name: "MiniYotas", desc: "Make a contribution to any of OSS Cameroon GitHub project and earn some Yotas.", tags: ["Blade"], lang: "Blade", stars: 12, img: PROJ_IMGS[0], contributors: ["assets/avatars/a4.png"] },
  { name: "AestheticDialogs", desc: "An Android Library for fluid, beautiful, custom Dialogs.", tags: ["Docs","Issues 619","★ 46k"], lang: "Kotlin", stars: 46000, img: PROJ_IMGS[1], contributors: ["assets/avatars/a1.png","assets/avatars/a3.png"] },
  { name: "Jobsika", desc: "Company ratings and salaries in Cameroon", tags: ["Python","Issues 3"], lang: "Python", stars: 320, img: PROJ_IMGS[2], contributors: ["assets/avatars/a7.png"] },
  { name: "Kamtar API", desc: "Logistics API connecting truck drivers and shippers across Cameroon.", tags: ["Typescript","Issues 41"], lang: "Typescript", stars: 870, img: PROJ_IMGS[1], contributors: ["assets/avatars/a5.png","assets/avatars/a6.png"] },
  { name: "Nkwa Docs", desc: "Documentation platform for the local payments ecosystem.", tags: ["Docs","Issues 12"], lang: "Typescript", stars: 210, img: PROJ_IMGS[0], contributors: ["assets/avatars/a2.png"] },
  { name: "MoovSMS", desc: "Send and receive SMS through local operators from a single client.", tags: ["Go","Issues 7"], lang: "Go", stars: 1400, img: PROJ_IMGS[2], contributors: ["assets/avatars/a4.png","assets/avatars/a1.png"] },
  { name: "Ekang UI", desc: "A component library with patterns drawn from Cameroonian textiles.", tags: ["React","Issues 88"], lang: "Typescript", stars: 5600, img: PROJ_IMGS[1], contributors: ["assets/avatars/a3.png"] },
  { name: "Solar Monitor", desc: "Track solar inverter output and battery health from the browser.", tags: ["Python","Issues 19"], lang: "Python", stars: 640, img: PROJ_IMGS[0], contributors: ["assets/avatars/a6.png","assets/avatars/a7.png"] },
  { name: "Tontine", desc: "Open source savings-group ledger for informal community funds.", tags: ["Blade","Issues 5"], lang: "Blade", stars: 95, img: PROJ_IMGS[2], contributors: ["assets/avatars/a5.png"] },
];
export const BASE_PROJECTS: Project[] = BASE_PROJECTS_RAW.map((p, id) => ({ ...p, id, img: asset(p.img), contributors: p.contributors.map(asset) }));
export const PROJECTS: Project[] = [];
for (let i = 0; i < 27; i++) {
  const b = BASE_PROJECTS[i % BASE_PROJECTS.length];
  PROJECTS.push(Object.assign({}, b, { id: i, name: i < 9 ? b.name : b.name + " " + (Math.floor(i / 9) + 1) }));
}
export const LANGS = ["Typescript","Python","Go","Kotlin","Blade"];
export type ProjectQuery = { q?: string; stars?: string; sort?: string; page?: number; lang?: string[] };
export async function getProjects() { return PROJECTS; }
export async function queryProjects(query: ProjectQuery) {
  const q = (query.q ?? '').trim().toLowerCase();
  const langs = query.lang ?? [];
  let out = (await getProjects()).filter((p) => {
    if (langs.length && !langs.includes(p.lang)) return false;
    if (query.stars === '1k+ stars' && p.stars < 1000) return false;
    if (query.stars === '100+ stars' && p.stars < 100) return false;
    if (!q) return true;
    return (p.name + ' ' + p.desc + ' ' + p.lang).toLowerCase().includes(q);
  });
  if (query.sort === 'Most stars') out = out.slice().sort((a, b) => b.stars - a.stars);
  if (query.sort === 'Name A–Z') out = out.slice().sort((a, b) => a.name.localeCompare(b.name));
  const total = out.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const page = Math.min(Math.max(query.page ?? 1, 1), pages);
  const start = (page - 1) * PER_PAGE;
  return { items: out.slice(start, start + PER_PAGE), total, page, pages, start: total ? start + 1 : 0, end: Math.min(total, start + PER_PAGE) };
}
