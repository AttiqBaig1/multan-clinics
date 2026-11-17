import React, { useState } from 'react';
import { ClinicTemplateData } from '../../data/multanTemplates';

export type D = ClinicTemplateData;
export const DESIGN_NAMES: Record<number, string> = {
  1: 'Classic Pro', 2: 'Clean Light', 3: 'Premium Gold', 4: 'Warm Family', 5: 'Bold Modern',
};

export const waNumber = (d: D) => {
  const c = (d.whatsApp || d.phone || '').replace(/[^0-9]/g, '');
  return c.startsWith('92') ? c : `92${c.replace(/^0/, '')}`;
};
export const waUrl = (d: D, extra = '') =>
  `https://wa.me/${waNumber(d)}?text=${encodeURIComponent(`Assalam-o-Alaikum ${d.doctorName || 'Doctor Sahib'}! Main ${d.businessName} par appointment lena chahta/chahti hoon. ${extra}`.trim())}`;
export const telUrl = (d: D) => `tel:+${waNumber(d)}`;
export const mapUrl = (d: D) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.businessName} ${d.address} ${d.city}`)}`;
export const fallbackImg = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200';
export const onImgErr = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; };
export const initials = (n: string) => n.replace(/^dr\.?\s*/i, '').split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();

export const Faq: React.FC<{ d: D; cls: { wrap: string; q: string; a: string } }> = ({ d, cls }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cls.wrap}>
      {d.faqs.map((f, i) => (
        <div key={i}>
          <button type="button" className={cls.q} onClick={() => setOpen(open === i ? null : i)}>
            <span>{f.q}</span><span>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p className={cls.a}>{f.a}</p>}
        </div>
      ))}
    </div>
  );
};

export const Stars: React.FC<{ n: number }> = ({ n }) => <span aria-label={`${n} stars`}>{'★'.repeat(Math.round(n))}</span>;
