import type { SVGProps } from 'react';

export function LogoMark({ footer = false, ...props }: SVGProps<SVGSVGElement> & { footer?: boolean }) {
  return (
    <svg viewBox="0 0 1921 1174" fill="none" aria-hidden="true" {...props}>
      <g transform="matrix(1,0,0,1,-52413,-16695)">
        <g transform="matrix(0.637873,0,0,0.425829,47573.4,16695.1)">
          <g transform="matrix(5.34061,0,0,7.99999,-251615,-135443)">
            <g transform="matrix(0.148909,0,0,0.148909,43146.2,14120.5)">
              <path d="M38169.6,19225.7C38496.4,19270.6 38748.4,19551.2 38748.4,19890.2C38748.4,20260.4 38447.8,20560.9 38077.6,20560.9C37739.8,20560.9 37459.9,20310.6 37413.6,19985.5L37547.2,19851.2C37546.2,19864.1 37545.8,19877.1 37545.8,19890.2C37545.8,20183.7 37784.1,20422 38077.6,20422C38371.2,20422 38609.5,20183.7 38609.5,19890.2C38609.5,19596.6 38371.2,19358.3 38077.6,19358.3C38063.6,19358.3 38049.7,19358.9 38036,19359.9L38169.6,19225.7ZM38061.2,19219.6L37888.9,19392.8C37746.2,19447.1 37632.8,19561 37579.3,19704L37407,19877.2C37413.8,19518.4 37702.9,19228.2 38061.2,19219.6Z" fill="#0090F0"/>
            </g>
            <g transform="matrix(0.141022,0,0,0.124684,43520.4,16057)">
              <path d="M38739.8,8583.83C38537.3,9037.18 38082.4,9351.38 37554.2,9351.38C37026,9351.38 36571.1,9038.18 36368.6,8584.83" fill="none" stroke={footer ? '#fff' : '#333'} strokeWidth="125" strokeMiterlimit="1.5"/>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
export function QuoteIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 34 26" fill="#1B3F8F" aria-hidden="true" {...props}><path d="M0 26V13C0 5.8 5.8 0 13 0v6a7 7 0 0 0-7 7h7v13H0zm20 0V13C20 5.8 25.8 0 33 0v6a7 7 0 0 0-7 7h7v13H20z" /></svg>; }
export function TwitterIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M22 5.9c-.8.4-1.6.6-2.5.7a4 4 0 0 0 1.7-2.2c-.8.5-1.7.9-2.7 1a4.1 4.1 0 0 0-7 3.8A11.6 11.6 0 0 1 3 4.9a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5a4.1 4.1 0 0 0 3.3 4.1c-.6.2-1.3.2-1.9.1a4.1 4.1 0 0 0 3.8 2.9A11.6 11.6 0 0 1 2 19.3 16.4 16.4 0 0 0 20.1 8.2c.8-.6 1.4-1.4 1.9-2.3z"/></svg>; }
export function GitHubIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>; }
export function TelegramIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M21.5 4.3 2.9 11.5c-.9.3-.9 1.5 0 1.8l4.6 1.5 1.8 5.5c.3.8 1.3.9 1.8.3l2.4-2.7 4.5 3.3c.7.5 1.6.1 1.8-.7l3-15c.2-.9-.6-1.5-1.3-1.2zM9.6 14.4l8.2-5.8-6.6 7.1-.3 3.2-1.3-4.5z"/></svg>; }
export function LinkedInIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.4 8h4.2v15H.4V8Zm7.4 0h4v2.1h.1c.6-1.1 2-2.4 4.1-2.4 4.4 0 5.2 2.9 5.2 6.7V23H17v-7.6c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V23H7.8V8Z" transform="scale(.95) translate(1 0)"/></svg>; }
