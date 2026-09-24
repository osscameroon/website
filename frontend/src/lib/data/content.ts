const asset = (path: string) => `/${path}`;

export type Community = {
  name: string;
  desc: string;
  focus: string;
  location: string;
  url?: string;
  img?: string;
  category: 'oss' | 'language' | 'cloud' | 'security' | 'data' | 'general';
};

export const COMMUNITIES: Community[] = [
  // OSS / Core
  { name: "OSS Cameroon", desc: "The Cameroonian open source community building tools, sharing knowledge, and contributing to the global OSS ecosystem.", focus: "Open source, software engineering", location: "National / Yaoundé", url: "https://osscameroon.com", category: "oss" },
  { name: "Ubuntu Cameroon", desc: "The official Ubuntu LoCo team promoting Ubuntu, Linux, and free/open-source software across Cameroon.", focus: "Ubuntu, Linux, FOSS", location: "National / Yaoundé / Douala", url: "https://discourse.ubuntu.com/c/community/circles/ubuntu-cameroon/191", category: "oss" },
  { name: "Python Cameroon", desc: "The Cameroon-based Python community organizing PyCon Cameroon and promoting Python and open source.", focus: "Python, OSS", location: "National / Yaoundé", url: "https://cm.pycon.org", img: asset("assets/communities/python.png"), category: "oss" },
  { name: "Wikimedians of Cameroon", desc: "Contributing to Wikipedia, Wikidata, and open knowledge initiatives across Cameroon.", focus: "Wikipedia, Wikidata, open knowledge", location: "National", category: "oss" },
  { name: "OpenStreetMap Cameroon", desc: "Mapping Cameroon on OpenStreetMap — open geographic data for everyone.", focus: "OpenStreetMap, open data, mapping", location: "National", category: "oss" },
  { name: "Open Source Laboratory Cameroon", desc: "Promoting Linux, open-source hardware, and FOSS education in Cameroon.", focus: "Linux, hardware, FOSS", location: "Cameroon", category: "oss" },
  { name: "Mozilla Cameroon", desc: "Advocating for the open web, Firefox, and Mozilla's mission in Cameroon.", focus: "Mozilla, Firefox, open web", location: "Cameroon", category: "oss" },
  { name: "Linux Friends Cameroon", desc: "A community of GNU/Linux and free software enthusiasts in Cameroon.", focus: "GNU/Linux, FOSS", location: "Cameroon", category: "oss" },

  // Language / Framework
  { name: "Laravel Cameroon", desc: "The community of PHP and Laravel developers in Cameroon sharing best practices and building together.", focus: "PHP / Laravel", location: "National", img: asset("assets/communities/laravel.png"), category: "language" },
  { name: "Flutter Cameroon", desc: "A community of Dart and Flutter developers from Cameroon building cross-platform apps.", focus: "Flutter / Dart", location: "National", img: asset("assets/communities/flutter.png"), category: "language" },
  { name: "Django Cameroon", desc: "Cameroonian developers building with Django and Python, sharing knowledge and open-source projects.", focus: "Django / Python", location: "National", category: "language" },

  // Cloud / DevOps / Infra
  { name: "cmNOG", desc: "Cameroon Network Operators Group — networking professionals discussing Internet infrastructure and Linux.", focus: "Networking, Internet infrastructure, Linux", location: "National", category: "cloud" },
  { name: "GDG Yaoundé", desc: "Google Developer Group Yaoundé — meetups on Web, Android, Cloud, AI, and more.", focus: "Software, Web, Android, Cloud, AI", location: "Yaoundé", url: "https://gdg.community.dev/gdg-yaounde/", category: "cloud" },
  { name: "GDG Douala", desc: "Google Developer Group Douala — bringing developers together around Google technologies.", focus: "Software, Web, Cloud, AI", location: "Douala", url: "https://gdgdouala.org", category: "cloud" },
  { name: "GDG Buea", desc: "Google Developer Group Buea — growing the developer ecosystem in the South-West region.", focus: "Software development", location: "Buea", url: "https://gdg.community.dev/gdg-buea/", category: "cloud" },
  { name: "GDG Dschang", desc: "Google Developer Group Dschang — tech talks, codelabs, and community building.", focus: "Software development", location: "Dschang", category: "cloud" },
  { name: "GDG Bambili", desc: "Google Developer Group Bambili — developer meetups in the North-West region.", focus: "Software development", location: "Bambili", category: "cloud" },
  { name: "AWS User Group Yaoundé", desc: "AWS cloud enthusiasts in Yaoundé sharing knowledge on cloud architecture and DevOps.", focus: "AWS, Cloud, DevOps", location: "Yaoundé", category: "cloud" },
  { name: "AWS User Group Douala", desc: "Douala's AWS community — cloud workshops, talks, and hands-on labs.", focus: "AWS, Cloud, DevOps", location: "Douala", category: "cloud" },
  { name: "AWS User Group Buea", desc: "Buea's AWS user group connecting cloud professionals and learners.", focus: "AWS, Cloud, DevOps", location: "Buea", category: "cloud" },
  { name: "Docker Buea", desc: "Container and DevOps community in Buea exploring Docker and cloud-native technologies.", focus: "Containers, Docker, DevOps", location: "Buea", category: "cloud" },

  // Security
  { name: "OWASP Yaoundé", desc: "The local OWASP chapter promoting application security awareness and best practices.", focus: "Application security / cybersecurity", location: "Yaoundé", category: "security" },
  { name: "Hack The Box Yaoundé", desc: "Cybersecurity enthusiasts in Yaoundé sharpening skills through CTF challenges and labs.", focus: "Cybersecurity", location: "Yaoundé", category: "security" },
  { name: "Hack The Box Douala", desc: "Douala's Hack The Box community — ethical hacking, CTFs, and security training.", focus: "Cybersecurity", location: "Douala", category: "security" },

  // Data
  { name: "R-Ladies Yaoundé", desc: "Promoting gender diversity in the R community through meetups, workshops, and mentoring.", focus: "R, data science", location: "Yaoundé", category: "data" },
  { name: "R Community Cameroon", desc: "The national R user group for data science, statistics, and open-source analytics.", focus: "R / data science", location: "National", category: "data" },

  // General
  { name: "Women Techmakers Cameroon", desc: "Empowering women in technology through visibility, community, and resources.", focus: "Women in technology", location: "Yaoundé / National", category: "general" },
  { name: "Techies Connect", desc: "Tech professionals, founders, and creatives networking across Cameroon's major cities.", focus: "Tech professionals, founders, networking", location: "Yaoundé, Douala, Ngaoundéré", url: "https://techiesconnect.net", category: "general" },
  { name: "Cameroon Developers", desc: "A national community of software developers sharing knowledge and building together.", focus: "General software development", location: "Maroua / National", category: "general" },
];
export const HERO_AVATAR_DEFAULTS = [
  asset("assets/avatars/a1.png"),
  asset("assets/avatars/a2.png"),
  asset("assets/avatars/a3.png"),
  asset("assets/avatars/a4.png"),
  asset("assets/avatars/a5.png"),
  asset("assets/avatars/a6.png"),
  asset("assets/avatars/a7.png"),
];
export const HERO_AVATAR_POSITIONS = [
  { left: "42%", top: "2%", size: 122, d: 0 },
  { left: "76%", top: "0%", size: 104, d: .4 },
  { left: "30%", top: "38%", size: 100, d: .8 },
  { left: "56%", top: "32%", size: 152, d: .2 },
  { left: "45%", top: "70%", size: 88, d: 1.1 },
  { left: "72%", top: "74%", size: 118, d: .6 },
  { left: "13%", top: "80%", size: 112, d: .9 },
];
export const TESTIMONIALS = [
  { name: "Brady Fomegne", role: "Software Engineer", img: "https://avatars.githubusercontent.com/u/45305909?v=4", text: "OSS Cameroon gave me the confidence to lead my own open-source project. The mentoring and code reviews from experienced developers made all the difference." },
  { name: "Boris Mbarga", role: "Software Engineer", img: "https://avatars.githubusercontent.com/u/5704817?v=4", text: "Being part of this community helped me grow from a solo coder to a real collaborator. The live coding sessions and knowledge sharing are invaluable." },
  { name: "Asam", role: "Software Developer", img: "https://avatars.githubusercontent.com/u/34966088?v=4", text: "I joined with basic skills and now I contribute to projects used by real people. The community pushes you to ship, not just learn in isolation." },
];
