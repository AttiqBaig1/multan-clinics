import React from 'react';
import { D, DESIGN_NAMES } from './shared';

const NOTES: Record<number, string> = {
  1: 'Full-featured: calculator, booking form, gallery',
  2: 'Dark teal hero, 3-step visit, photo treatment cards, map',
  3: 'Premium dark, photo hero with booking panel',
  4: 'Light and airy, popular-treatments card, icon tiles',
  5: 'Full-colour gradient hero, swipeable treatment cards, review slider',
  6: 'Photo hero with doctor card, service cards, about block, booking banner',
};

/** Options page: the clinic sees all 6 designs with its own details and picks one. */
export const DesignOptions: React.FC<{ d: D; slug: string }> = ({ d, slug }) => (
  <div className="min-h-screen bg-slate-50 px-4 py-10" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
    <div className="max-w-6xl mx-auto">
      <p className="text-xs font-bold tracking-widest text-slate-500">WEBSITE DESIGN OPTIONS</p>
      <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mt-1">{d.businessName}</h1>
      <p className="text-slate-600 mt-2">Neeche 6 design hain, sab aap ke apne naam, doctor aur phone number ke saath. Jo pasand aaye us par click karein.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(n => {
          const href = `/${slug}${n === 1 ? '' : `?v=${n}`}`;
          return (
            <a key={n} href={href} className="group bg-white text-slate-900 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-400 transition block">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <iframe title={DESIGN_NAMES[n]} src={href} loading="lazy" tabIndex={-1}
                  style={{ width: 1280, height: 1024, transform: 'scale(0.29)', transformOrigin: '0 0', border: 0, pointerEvents: 'none' }} />
                <style>{`.group iframe{max-width:none}`}</style>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between"><b>Design {n}: {DESIGN_NAMES[n]}</b><span className="text-sm text-slate-500 group-hover:text-slate-900">Dekhein →</span></div>
                <p className="text-sm text-slate-500 mt-1">{NOTES[n]}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  </div>
);
