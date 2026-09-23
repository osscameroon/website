export type Developer = {
  id: number;
  name: string;
  company: string;
  role: string;
  location: string;
  img: string;
  avatar: string;
  open: boolean;
  stack: string[];
  bio: string;
};

const asset = (path: string) => `/${path}`;

const BASE_DEVS_RAW = [
  { name: "Eric Cabrel TIOGO", company: "OVRSEA", role: "Software Engineer", location: "Paris, France", img: "assets/members/eric.png", avatar: "assets/avatars/modal.png", open: true,
    stack: ["Node.js","Java","Typescript","GraphQL","Microservice","AWS","Docker","Git","MySQL","MongoDB","Bash","React"],
    bio: "Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus." },
  { name: "Guy Landry", company: "GreenSoft", role: "GreenSoft Engineering", location: "Yaoundé, Cameroon", img: "assets/members/guy.png", avatar: "assets/avatars/a4.png", open: true,
    stack: ["PHP","Laravel","Vue.js","MySQL","Docker","Git"],
    bio: "Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel." },
  { name: "Benjamin Cooper", company: "Y-note", role: "Software Engineer", location: "Douala, Cameroon", img: "assets/members/benjamin.png", avatar: "assets/avatars/a2.png", open: false,
    stack: ["Python","Django","PostgreSQL","Redis","Git","Linux"],
    bio: "Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus." },
  { name: "Jesse Ikolo B.", company: "IUC, Douala.", role: "Programactor", location: "Douala, Cameroon", img: "assets/members/jesse.png", avatar: "assets/avatars/a3.png", open: true,
    stack: ["Dart","Flutter","Firebase","Kotlin","Git"],
    bio: "Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Nulla ultrices facilisis justo, non varius nisl semper vel." },
  { name: "Franck L.", company: "Jangolo", role: "Data analyst", location: "Yaoundé, Cameroon", img: "assets/members/franck.png", avatar: "assets/avatars/a1.png", open: false,
    stack: ["Python","Pandas","SQL","Airflow","Docker"],
    bio: "Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus." },
  { name: "Jerry M.", company: "Kamtar", role: "Full stack developer Jr.", location: "Bafoussam, Cameroon", img: "assets/members/jerry.png", avatar: "assets/avatars/a5.png", open: true,
    stack: ["Typescript","React","Node.js","MongoDB","Git"],
    bio: "Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere." },
  { name: "Patrick Zocli", company: "DevStyle", role: "Mobile Engineer", location: "Lomé, Togo", img: "assets/members/patrick.png", avatar: "assets/avatars/a7.png", open: false,
    stack: ["Kotlin","Java","Android","Firebase","Git"],
    bio: "Praesent sollicitudin felis vel mi facilisis posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus." },
  { name: "Brandon K.", company: "Sanam", role: "Software engineer", location: "Buea, Cameroon", img: "assets/members/brandon.png", avatar: "assets/avatars/a6.png", open: true,
    stack: ["Go","Docker","Kubernetes","PostgreSQL","Git","AWS"],
    bio: "Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Nulla ultrices facilisis justo, non varius nisl semper vel." },
];

export const BASE_DEVS: Developer[] = BASE_DEVS_RAW.map((d, id) => ({ ...d, id, img: asset(d.img), avatar: asset(d.avatar) }));

const COMPANIES = ["OVRSEA","GreenSoft","Y-note","IUC, Douala.","Jangolo","Kamtar","DevStyle","Sanam","Wecashup","Orange CM","Diool","Nkwa"];
export const DEVS: Developer[] = [];
for (let i = 0; i < 40; i++) {
  const b = BASE_DEVS[i % BASE_DEVS.length];
  DEVS.push(Object.assign({}, b, {
    id: i,
    company: i < 8 ? b.company : COMPANIES[(i * 5) % COMPANIES.length],
    open: i < 8 ? b.open : (i % 3 === 0),
  }));
}

export const TECHS = ["Typescript","Python","Java","Go","Flutter","PHP","React","Docker"];
export const EXPERTISES = ["Titre", "Software Engineer", "Data analyst", "Mobile Engineer", "Programactor"];
export const DEVELOPER_EXPERTISES = ["Expertise", ...EXPERTISES.slice(1)];
export const PER_PAGE = 20;

export type DeveloperQuery = { q?: string; expertise?: string; sort?: string; page?: number; open?: boolean; tech?: string[] };

export async function getDevelopers() { return DEVS; }
export async function getDeveloper(id: number) { return DEVS.find((d) => d.id === id) ?? null; }

export async function queryDevelopers(query: DeveloperQuery) {
  const q = (query.q ?? '').trim().toLowerCase();
  const expertise = query.expertise ?? 'Expertise';
  const techs = query.tech ?? [];
  let out = (await getDevelopers()).filter((d) => {
    if (query.open && !d.open) return false;
    if (techs.length && !techs.some((t) => d.stack.some((s) => s.toLowerCase().includes(t.toLowerCase())))) return false;
    if (expertise !== 'Expertise' && !d.role.toLowerCase().includes(expertise.split(' ')[0].toLowerCase())) return false;
    if (!q) return true;
    return (d.name + ' ' + d.company + ' ' + d.role + ' ' + d.stack.join(' ')).toLowerCase().includes(q);
  });
  if (query.sort === 'Name A–Z') out = out.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (query.sort === 'Company') out = out.slice().sort((a, b) => a.company.localeCompare(b.company));
  if (query.sort === 'Open for opportunities') out = out.slice().sort((a, b) => Number(b.open) - Number(a.open));
  const total = out.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const page = Math.min(Math.max(query.page ?? 1, 1), pages);
  const start = (page - 1) * PER_PAGE;
  return { items: out.slice(start, start + PER_PAGE), total, page, pages, start: total ? start + 1 : 0, end: Math.min(total, start + PER_PAGE) };
}
