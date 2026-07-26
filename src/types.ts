export interface ClinicService {
  title: string;
  desc: string;
  icon: string;
  price?: string;
}

export interface ClinicTestimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
}

export interface ClinicFAQ {
  q: string;
  a: string;
}

export interface ClinicData {
  niche: 'dental' | 'skin' | 'eye' | 'ortho' | 'cardio' | 'peds' | 'gynae' | 'pet' | 'general' | 'physio';
  nicheTitle: string;
  businessName: string;
  tagline: string;
  doctorName: string;
  doctorTitle: string;
  doctorExperience: string;
  phone: string;
  whatsApp: string;
  address: string;
  city: string;
  timings: string;
  consultationFee: string;
  heroImage: string;
  doctorImage: string;
  services: ClinicService[];
  badges: string[];
  testimonials: ClinicTestimonial[];
  faqs: ClinicFAQ[];
}
