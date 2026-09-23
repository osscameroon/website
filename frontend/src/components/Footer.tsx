import Link from 'next/link';
import { GitHubIcon, LogoMark, TelegramIcon, TwitterIcon } from './icons';

export function Footer() {
  return <footer className="bg-navy text-white">
    <div className="mx-auto max-w-container px-[clamp(16px,4vw,24px)] py-[clamp(48px,7vw,78px)]">
      <div className="mb-8 flex items-center gap-3"><LogoMark footer className="h-10 w-10"/><span className="text-[25px] font-bold tracking-[-.02em]">OSS Cameroon</span></div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-[clamp(28px,4vw,48px)]">
        <p className="m-0 max-w-[52ch] text-[14.5px] leading-[1.7] text-muted-light-3 md:col-span-2">Our goal as a community is to improve the lives of individual members of the society. We hope to accomplish this by reinforcing Cameroonian developers to take up the habit of contributing to open source projects and technologies; especially projects with the potential to enhance the quality of life for our local communities. By promoting mentorship, collaboration and knowledge sharing, we ensure to provide a joyful environment for developers to put their best skill in the service of the society.</p>
        <FooterCol title="Activities"><Link href="/projects">Projects</Link><Link href="/developers">Developers</Link></FooterCol>
        <FooterCol title="Liens utiles"><Link href="#">Shop</Link><Link href="#">Blog</Link></FooterCol>
        <div><h4 className="mb-1 text-base font-bold">Nous contacter</h4><div className="mb-[22px] h-[3px] w-[26px] bg-blue"/><a href="mailto:contact@osscameroon.com" className="text-[14.5px] text-muted-light-3">contact@osscameroon.com</a><div className="mt-[22px] flex gap-3"><Social label="Twitter"><TwitterIcon className="h-[19px] w-[19px]"/></Social><Social label="GitHub"><GitHubIcon className="h-[19px] w-[19px]"/></Social><Social label="Telegram"><TelegramIcon className="h-[19px] w-[19px]"/></Social></div></div>
      </div>
      <div className="my-[clamp(32px,5vw,52px)] h-px bg-white/15"/>
      <div className="flex flex-wrap items-center justify-between gap-5"><div className="flex flex-wrap items-center gap-6 text-sm text-muted-light-3"><span>© 2023 OSS Cameroon, All rights reserved.</span><span className="text-muted-light-1">•</span><Link href="#">Privacy policy</Link><Link href="#">Terms of use</Link></div><select aria-label="Language" className="rounded-pill border border-white/20 bg-transparent px-5 py-3 text-[14.5px] text-white outline-none"><option>English</option><option>Français</option></select></div>
    </div>
  </footer>;
}
function FooterCol({ title, children }: { title: string; children: React.ReactNode }) { return <div><h4 className="mb-1 text-base font-bold">{title}</h4><div className="mb-[22px] h-[3px] w-[26px] bg-blue"/><div className="flex flex-col gap-3.5 text-[14.5px] text-muted-light-3">{children}</div></div>; }
function Social({ label, children }: { label: string; children: React.ReactNode }) { return <a href="#" aria-label={label} className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white text-navy">{children}</a>; }
