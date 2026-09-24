import { apiFetch, type ApiResponse, type ApiSearchResponse } from '../api';

export type Developer = {
  id: number;
  login: string;
  name: string;
  company: string;
  role: string;
  location: string;
  img: string;
  avatar: string;
  open: boolean;
  stack: string[];
  bio: string;
  github_url: string;
  blog: string;
  email: string;
  twitter: string;
  followers: number;
  public_repos: number;
};

/* ── API types ── */
type ApiUser = {
  login: string;
  name?: string;
  avatar_url?: string;
  company?: string;
  bio?: string;
  location?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  html_url?: string;
  hireable?: boolean;
  blog?: string;
  email?: string;
  twitter_username?: string;
  [key: string]: unknown;
};

/* ── Extract tech keywords from bio text ── */
const KNOWN_TECHS: Record<string, string> = {
  'javascript': 'JavaScript', 'typescript': 'TypeScript', 'python': 'Python',
  'java': 'Java', 'kotlin': 'Kotlin', 'swift': 'Swift', 'rust': 'Rust',
  'go': 'Go', 'golang': 'Go', 'ruby': 'Ruby', 'php': 'PHP', 'c#': 'C#',
  'c++': 'C++', 'dart': 'Dart', 'scala': 'Scala', 'elixir': 'Elixir',
  'react': 'React', 'react-native': 'React Native', 'reactnative': 'React Native',
  'angular': 'Angular', 'vue': 'Vue.js', 'vuejs': 'Vue.js', 'vue.js': 'Vue.js',
  'svelte': 'Svelte', 'nextjs': 'Next.js', 'next.js': 'Next.js',
  'nodejs': 'Node.js', 'node.js': 'Node.js', 'node': 'Node.js', 'deno': 'Deno',
  'express': 'Express', 'nestjs': 'NestJS', 'fastapi': 'FastAPI',
  'django': 'Django', 'flask': 'Flask', 'laravel': 'Laravel', 'spring': 'Spring',
  'rails': 'Rails', 'flutter': 'Flutter',
  'docker': 'Docker', 'kubernetes': 'Kubernetes', 'k8s': 'Kubernetes',
  'aws': 'AWS', 'gcp': 'GCP', 'azure': 'Azure', 'firebase': 'Firebase',
  'terraform': 'Terraform', 'ci/cd': 'CI/CD',
  'mongodb': 'MongoDB', 'postgresql': 'PostgreSQL', 'postgres': 'PostgreSQL',
  'mysql': 'MySQL', 'redis': 'Redis', 'graphql': 'GraphQL',
  'machine learning': 'Machine Learning', 'ml': 'ML', 'ai': 'AI',
  'deep learning': 'Deep Learning', 'data science': 'Data Science',
  'devops': 'DevOps', 'android': 'Android', 'ios': 'iOS',
  'linux': 'Linux', 'git': 'Git', 'blockchain': 'Blockchain',
  'web3': 'Web3', 'solidity': 'Solidity',
};

function extractTechFromBio(bio: string): string[] {
  if (!bio) return [];
  const lower = bio.toLowerCase();
  const found = new Set<string>();
  for (const [keyword, label] of Object.entries(KNOWN_TECHS)) {
    // Match whole word boundaries to avoid false positives
    const re = new RegExp(`(?:^|[\\s,;/|()\\[\\]#.])${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:$|[\\s,;/|()\\[\\].!?])`, 'i');
    if (re.test(lower)) found.add(label);
  }
  return Array.from(found);
}

/* ── Map API user → frontend Developer ── */
function mapUser(u: ApiUser, index: number): Developer {
  const stack = extractTechFromBio(u.bio ?? '');
  return {
    id: index,
    login: u.login,
    name: u.name || u.login,
    company: u.company || '',
    role: 'Software Engineer',
    location: u.location || '',
    img: u.avatar_url || '/assets/avatars/a1.png',
    avatar: u.avatar_url || '/assets/avatars/a1.png',
    open: u.hireable === true,
    stack,
    bio: u.bio || '',
    github_url: u.html_url || `https://github.com/${u.login}`,
    blog: u.blog || '',
    email: u.email || '',
    twitter: u.twitter_username || '',
    followers: u.followers ?? 0,
    public_repos: u.public_repos ?? 0,
  };
}

/* ── Placeholder data (used for home page & fallback) ── */
const asset = (path: string) => `/${path}`;

const BASE_DEVS_RAW = [
  { name: "Eric Cabrel TIOGO", login: "tericcabrel", company: "OVRSEA", role: "Software Engineer", location: "Paris, France", img: "assets/members/eric.png", avatar: "assets/avatars/modal.png", open: true,
    stack: ["Node.js","Java","Typescript","GraphQL","Microservice","AWS","Docker","Git","MySQL","MongoDB","Bash","React"],
    bio: "Backend engineer passionate about scalable APIs, microservices, and developer tooling. Active OSS contributor and technical writer.", github_url: "#", blog: "", email: "", twitter: "", followers: 0, public_repos: 0 },
  { name: "Guy Landry", login: "guylandry", company: "GreenSoft", role: "GreenSoft Engineering", location: "Yaoundé, Cameroon", img: "assets/members/guy.png", avatar: "assets/avatars/a4.png", open: true,
    stack: ["PHP","Laravel","Vue.js","MySQL","Docker","Git"],
    bio: "Full stack developer building web applications with Laravel and Vue.js. Focused on clean architecture and mentoring junior developers.", github_url: "#", blog: "", email: "", twitter: "", followers: 0, public_repos: 0 },
  { name: "Benjamin Cooper", login: "benjamincooper", company: "Y-note", role: "Software Engineer", location: "Douala, Cameroon", img: "assets/members/benjamin.png", avatar: "assets/avatars/a2.png", open: false,
    stack: ["Python","Django","PostgreSQL","Redis","Git","Linux"],
    bio: "Python developer specializing in backend systems and data pipelines. Believer in open source as a way to democratize technology.", github_url: "#", blog: "", email: "", twitter: "", followers: 0, public_repos: 0 },
  { name: "Jesse Ikolo B.", login: "jesseikolo", company: "IUC, Douala.", role: "Programactor", location: "Douala, Cameroon", img: "assets/members/jesse.png", avatar: "assets/avatars/a3.png", open: true,
    stack: ["Dart","Flutter","Firebase","Kotlin","Git"],
    bio: "Mobile developer crafting cross-platform apps with Flutter and Kotlin. Passionate about building tools that improve everyday life in Cameroon.", github_url: "#", blog: "", email: "", twitter: "", followers: 0, public_repos: 0 },
  { name: "Franck L.", login: "franckl", company: "Jangolo", role: "Data analyst", location: "Yaoundé, Cameroon", img: "assets/members/franck.png", avatar: "assets/avatars/a1.png", open: false,
    stack: ["Python","Pandas","SQL","Airflow","Docker"],
    bio: "Data analyst turning raw data into actionable insights. Building open-source data pipelines and sharing knowledge with the community.", github_url: "#", blog: "", email: "", twitter: "", followers: 0, public_repos: 0 },
  { name: "Jerry M.", login: "jerrym", company: "Kamtar", role: "Full stack developer Jr.", location: "Bafoussam, Cameroon", img: "assets/members/jerry.png", avatar: "assets/avatars/a5.png", open: true,
    stack: ["Typescript","React","Node.js","MongoDB","Git"],
    bio: "Junior full stack developer learning by building. OSS Cameroon helped me go from tutorials to real-world contributions.", github_url: "#", blog: "", email: "", twitter: "", followers: 0, public_repos: 0 },
  { name: "Patrick Zocli", login: "patrickzocli", company: "DevStyle", role: "Mobile Engineer", location: "Lomé, Togo", img: "assets/members/patrick.png", avatar: "assets/avatars/a7.png", open: false,
    stack: ["Kotlin","Java","Android","Firebase","Git"],
    bio: "Android developer focused on performant mobile experiences. Advocate for collaborative development and code reviews.", github_url: "#", blog: "", email: "", twitter: "", followers: 0, public_repos: 0 },
  { name: "Brandon K.", login: "brandonk", company: "Sanam", role: "Software engineer", location: "Buea, Cameroon", img: "assets/members/brandon.png", avatar: "assets/avatars/a6.png", open: true,
    stack: ["Go","Docker","Kubernetes","PostgreSQL","Git","AWS"],
    bio: "Infrastructure engineer building cloud-native systems with Go and Kubernetes. Contributing to open-source DevOps tooling.", github_url: "#", blog: "", email: "", twitter: "", followers: 0, public_repos: 0 },
];

export const BASE_DEVS: Developer[] = BASE_DEVS_RAW.map((d, id) => ({ ...d, id, img: asset(d.img), avatar: asset(d.avatar) }));

export const TECHS = ["Typescript","Python","Java","Go","Flutter","PHP","React","Docker"];
export const EXPERTISES = ["Titre", "Software Engineer", "Data analyst", "Mobile Engineer", "Programactor"];
export const DEVELOPER_EXPERTISES = ["Expertise", ...EXPERTISES.slice(1)];
export const PER_PAGE = 20;

export type DeveloperQuery = { q?: string; expertise?: string; sort?: string; page?: number; open?: boolean; tech?: string[] };

/* ── Sort mapping: frontend label → API sort_type ── */
function mapSortType(sort?: string): string {
  if (sort === 'Name A–Z') return 'alphabetic';
  if (sort === 'Most recent') return 'most_recent';
  return 'popularity';
}

/* ── Fetch developers from API with search/filter/pagination ── */
export async function queryDevelopers(query: DeveloperQuery) {
  try {
    const page = query.page ?? 1;

    const data = await apiFetch<ApiSearchResponse<ApiUser>>('/github/users/search', {
      method: 'POST',
      body: JSON.stringify({
        query: query.q ?? '',
        page,
        count: PER_PAGE,
        sort_type: mapSortType(query.sort),
      }),
    });

    if (!data.result) {
      return { items: [], total: 0, page, pages: 1, start: 0, end: 0 };
    }

    const hits = data.result.hits ?? [];
    const items = hits.map(mapUser);
    const total = data.result.estimatedTotalHits ?? data.result.nbHits ?? items.length;
    const pages = Math.max(1, Math.ceil(total / PER_PAGE));

    return {
      items,
      total,
      page,
      pages,
      start: total ? (page - 1) * PER_PAGE + 1 : 0,
      end: Math.min(total, page * PER_PAGE),
    };
  } catch (e) {
    console.error('Failed to fetch developers from API, using placeholders:', e);
    return queryDevelopersFallback(query);
  }
}

export async function getDevelopers() {
  try {
    const data = await apiFetch<ApiResponse<ApiUser[]>>('/github/users?count=20');
    if (!data.result) return BASE_DEVS;
    return data.result.map(mapUser);
  } catch {
    return BASE_DEVS;
  }
}

/* ── Fetch a single developer by login (for modal) ── */
export async function getDeveloper(login: string): Promise<Developer | null> {
  // Check placeholders first (for home page links)
  const placeholder = BASE_DEVS.find((d) => d.login === login);
  if (placeholder) return placeholder;

  try {
    // Use search endpoint since the single-user endpoint requires Datastore
    const data = await apiFetch<ApiSearchResponse<ApiUser>>('/github/users/search', {
      method: 'POST',
      body: JSON.stringify({ query: login, page: 1, count: 5 }),
    });
    if (!data.result) return null;
    const match = data.result.hits.find((u) => u.login === login);
    if (!match) return null;
    return mapUser(match, 0);
  } catch {
    return null;
  }
}

/* ── Fallback: in-memory filtering (same as before) ── */
const COMPANIES = ["OVRSEA","GreenSoft","Y-note","IUC, Douala.","Jangolo","Kamtar","DevStyle","Sanam","Wecashup","Orange CM","Diool","Nkwa"];
function makeFallbackDevs(): Developer[] {
  const devs: Developer[] = [];
  for (let i = 0; i < 40; i++) {
    const b = BASE_DEVS[i % BASE_DEVS.length];
    devs.push(Object.assign({}, b, {
      id: i,
      company: i < 8 ? b.company : COMPANIES[(i * 5) % COMPANIES.length],
      open: i < 8 ? b.open : (i % 3 === 0),
    }));
  }
  return devs;
}
const FALLBACK_DEVS = makeFallbackDevs();

function queryDevelopersFallback(query: DeveloperQuery) {
  const q = (query.q ?? '').trim().toLowerCase();
  const expertise = query.expertise ?? 'Expertise';
  const techs = query.tech ?? [];
  let out = FALLBACK_DEVS.filter((d) => {
    if (query.open && !d.open) return false;
    if (techs.length && !techs.some((t) => d.stack.some((s) => s.toLowerCase().includes(t.toLowerCase())))) return false;
    if (expertise !== 'Expertise' && !d.role.toLowerCase().includes(expertise.split(' ')[0].toLowerCase())) return false;
    if (!q) return true;
    return (d.name + ' ' + d.company + ' ' + d.role + ' ' + d.stack.join(' ')).toLowerCase().includes(q);
  });
  if (!query.sort || query.sort === 'Most followers') out = out.slice().sort((a, b) => b.followers - a.followers);
  else if (query.sort === 'Name A–Z') out = out.slice().sort((a, b) => a.name.localeCompare(b.name));
  else if (query.sort === 'Most recent') out = out.slice();
  const total = out.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const page = Math.min(Math.max(query.page ?? 1, 1), pages);
  const start = (page - 1) * PER_PAGE;
  return { items: out.slice(start, start + PER_PAGE), total, page, pages, start: total ? start + 1 : 0, end: Math.min(total, start + PER_PAGE) };
}

/* ── Fetch top contributors as full Developer objects (by followers + project stars) ── */
export async function getTopContributors(): Promise<Developer[]> {
  try {
    // Fetch top users and top projects in parallel via GET, skip cache for large responses
    const [usersRes, projectsRes] = await Promise.all([
      apiFetch<ApiSearchResponse<ApiUser>>('/github/users/search?query=&count=1500&page=1', { noCache: true }),
      apiFetch<ApiSearchResponse<{ owner?: { login?: string }; stargazers_count?: number }>>('/github/projects/search?query=&count=1000&page=1', { noCache: true }),
    ]);

    if (!usersRes.result) return [];

    // Sum up stars per user from their projects
    const starsByLogin = new Map<string, number>();
    if (projectsRes.result) {
      for (const p of projectsRes.result.hits) {
        const login = p.owner?.login;
        if (login) {
          starsByLogin.set(login, (starsByLogin.get(login) ?? 0) + (p.stargazers_count ?? 0));
        }
      }
    }

    // Score each user: whichever is higher — followers or total stars
    const scored = usersRes.result.hits
      .filter((u) => u.avatar_url)
      .map((u) => ({
        user: u,
        score: Math.max(u.followers ?? 0, starsByLogin.get(u.login) ?? 0),
      }))
      .sort((a, b) => b.score - a.score);

    // Return top 50 as full Developer objects
    return scored.slice(0, 50).map((s, i) => mapUser(s.user, i));
  } catch {
    return [];
  }
}
