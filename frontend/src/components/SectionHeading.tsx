export function Rule({ centered = false }: { centered?: boolean }) {
  return <div className={`flex gap-1 my-5 ${centered ? 'justify-center' : ''}`}><span className="h-[5px] w-[52px] rounded bg-blue-deep"/><span className="h-[5px] w-[52px] rounded bg-blue"/></div>;
}
export function SectionHeading({ children, centered = false, className = '' }: { children: React.ReactNode; centered?: boolean; className?: string }) {
  return <div className={centered ? 'text-center' : ''}><h2 className={`m-0 text-[clamp(30px,3.6vw,42px)] font-extrabold leading-[1.14] tracking-[-.03em] ${className}`}>{children}</h2><Rule centered={centered}/></div>;
}
