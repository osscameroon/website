const asset = (path: string) => `/${path}`;
export const TWEETS = [
  { name: "DevStyle", handle: "@_devstyle", img: asset("assets/avatars/a7.png"), rt: 0, likes: 5, text: "Hey #TT237 et si on faisait des mini coding puzzles rapid. say your head knock small so 🤳 Genre… https://t.co/Bd5xibZ3Ls" },
  { name: "Patrick Zocli", handle: "@_devstyle", img: asset("assets/avatars/a3.png"), rt: 2, likes: 2, text: "Je devais apprendre Angular, mais je me suis retrouvé à apprendre AngularJS. Au début, le 'JS' à la fin me… https://t.co/Bd5xibZ3Ls" },
  { name: "Martial Ahadji", handle: "@_devstyle", img: asset("assets/avatars/a1.png"), rt: 5, likes: 7, text: "Thank you @MongoDB for the new aggregation pipeline editor in #Compass . Really useful !! #DevOps #CaParleDev #databa…" },
  { name: "Martial Ahadji", handle: "@_devstyle", img: asset("assets/avatars/a5.png"), rt: 5, likes: 7, text: "Thank you @MongoDB for the new aggregation pipeline editor in #Compass . Really useful !! #DevOps #CaParleDev #databa…" },
  { name: "DevStyle", handle: "@_devstyle", img: asset("assets/avatars/a6.png"), rt: 0, likes: 5, text: "Hey #TT237 et si on faisait des mini coding puzzles rapid. say your head knock small so 🤳 Genre… https://t.co/Bd5xibZ3Ls" },
  { name: "Patrick Zocli", handle: "@_devstyle", img: asset("assets/avatars/a2.png"), rt: 2, likes: 4, text: "Je devais apprendre Angular, mais je me suis retrouvé à apprendre AngularJS. Au début, le 'JS' à la fin me… https://t.co/Bd5xibZ3Ls" },
];
export const COMMUNITIES = [
  { name: "Python Cameroun", desc: "The cameroon based python community organization.", img: asset("assets/communities/python.png") },
  { name: "Laravel Cameroun", desc: "Bienvenue sur le site de la communauté des développeurs PHP et Laravel du Cameroun.", img: asset("assets/communities/laravel.png") },
  { name: "Flutter Cameroun", desc: "#Flutter Cameroon is a community of #Dart and Flutter developers from #Cameroon.", img: asset("assets/communities/flutter.png") },
];
export const HERO_AVATARS = [
  { src: asset("assets/avatars/a1.png"), left: "42%", top: "2%", size: 122, d: 0 },
  { src: asset("assets/avatars/a2.png"), left: "76%", top: "0%", size: 104, d: .4 },
  { src: asset("assets/avatars/a3.png"), left: "30%", top: "38%", size: 100, d: .8 },
  { src: asset("assets/avatars/a4.png"), left: "56%", top: "32%", size: 152, d: .2 },
  { src: asset("assets/avatars/a5.png"), left: "45%", top: "70%", size: 88, d: 1.1 },
  { src: asset("assets/avatars/a6.png"), left: "72%", top: "74%", size: 118, d: .6 },
  { src: asset("assets/avatars/a7.png"), left: "13%", top: "80%", size: 112, d: .9 },
];
export const TESTIMONIALS = [
  { name: "Brandon K.", role: "Software engineer", img: asset("assets/testimonials/brandon.png"), text: "Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis. Nulla porta risus id neque tempor, in efficitur justo imperdiet." },
  { name: "Franck L.", role: "Data analyst", img: asset("assets/testimonials/patrick.png"), text: "Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis. Nulla porta risus id neque tempor, in efficitur justo imperdiet." },
  { name: "Jerry M.", role: "full stack developer Jr.", img: asset("assets/testimonials/jerry.png"), text: "Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis. Nulla porta risus id neque tempor, in efficitur justo imperdiet." },
];
