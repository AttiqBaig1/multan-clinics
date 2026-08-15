import { ClinicTemplateData, MULTAN_PRESETS } from './multanTemplates';

// Pre-registered Multan Clients baked directly into code
export const INITIAL_REGISTERED_CLIENTS: Record<string, ClinicTemplateData> = {
  'al-attiq-dental-implant-studio': {
    niche: 'dental',
    nicheTitle: 'Dental Clinic & Implant Center',
    businessName: 'Al-Attiq Dental & Implant Studio',
    tagline: "Multan's #1 Dental and Smile Design",
    doctorName: 'Dr. Muhammad Attiq',
    doctorTitle: 'BDS, RDS (Gold Medalist), Dental Implant Surgeon',
    doctorExperience: '14+ Years Clinical Experience in Painless Dentistry',
    phone: '03053993409',
    whatsApp: '923053993409',
    address: 'Zakariya Town chungi no 6',
    city: 'Multan',
    timings: '04:00 PM - 09:30 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,000 (Free for WhatsApp Booking)',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600',
    doctorImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
    services: [
      { title: 'German Titanium Implants', desc: 'Permanent lifetime tooth replacement with imported German titanium implant systems.', icon: 'Sparkles', price: 'Rs. 35,000' },
      { title: 'Laser Teeth Whitening & Scaling', desc: 'Advanced ultrasonic scaling and whitening for a bright celebrity smile in 20 mins.', icon: 'Smile', price: 'Rs. 4,500' },
      { title: 'Computerized Painless RCT', desc: 'Microscopic single-sitting computerized root canal therapy.', icon: 'Shield', price: 'Rs. 6,000' },
      { title: 'Invisalign & Metal Braces', desc: 'Invisible alignment braces for teens and adults with easy installment plans.', icon: 'Award', price: 'Book' }
    ],
    badges: ['PMDC Registered Specialist', '100% German Sterilization Protocol', 'Painless Anesthesia Technology', 'Direct WhatsApp Appointment'],
    testimonials: [
      { name: 'Malik Tariq (Nishtar Road)', role: 'Dental Implant Patient', comment: 'Dr. Muhammad Attiq sahab is the most professional dental surgeon in Multan. Implant procedure was 100% painless!', rating: 5 },
      { name: 'Dr. Areeba Zahid (Bosan Road)', role: 'Smile Design Patient', comment: 'Got my laser whitening and alignment done. Extremely satisfied with the sterilization standards at Al-Attiq Dental.', rating: 5 },
      { name: 'Muhammad Usman (Cantt Multan)', role: 'Root Canal Patient', comment: 'Single sitting painless root canal done in 25 minutes. Best clinic in Zakariya Town!', rating: 5 }
    ],
    faqs: [
      { q: 'What are the clinic timings at Zakariya Town?', a: 'We are open Monday to Saturday from 04:00 PM to 09:30 PM.' },
      { q: 'Is dental implant procedure painful?', a: 'Not at all. We use German computerized painless local anesthesia.' },
      { q: 'How can I book a VIP appointment?', a: 'Simply click the green WhatsApp button or Call 03053993409 to get your VIP token.' }
    ]
  },
  'al-ashfaq-dental-clinic': {
    niche: 'dental',
    nicheTitle: 'Dental Clinic & Implant Center',
    businessName: 'Al-Ashfaq Dental Clinic',
    tagline: "Multan's Premier Painless Dental Care & Smile Design",
    doctorName: 'Dr. Ashfaq Ahmad',
    doctorTitle: 'BDS, RDS (Gold Medalist), Dental Implant Surgeon',
    doctorExperience: '15+ Years Clinical Experience in Painless Dentistry',
    phone: '03007300000',
    whatsApp: '923007300000',
    address: 'Bosan Road, Near Gulgasht Colony',
    city: 'Multan',
    timings: '04:30 PM - 09:30 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,000 (Free for WhatsApp Booking)',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600',
    doctorImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
    services: [
      { title: 'German Titanium Implants', desc: 'Permanent lifetime tooth replacement with imported German titanium implant systems.', icon: 'Sparkles', price: 'Rs. 35,000' },
      { title: 'Laser Teeth Whitening & Scaling', desc: 'Advanced ultrasonic scaling and whitening for a bright celebrity smile in 20 mins.', icon: 'Smile', price: 'Rs. 4,500' },
      { title: 'Computerized Painless RCT', desc: 'Microscopic single-sitting computerized root canal therapy.', icon: 'Shield', price: 'Rs. 6,000' },
      { title: 'Invisalign & Metal Braces', desc: 'Invisible alignment braces for teens and adults with easy installment plans.', icon: 'Award', price: 'Book' }
    ],
    badges: ['PMDC Registered Specialist', '100% German Sterilization Protocol', 'Painless Anesthesia Technology', 'Direct WhatsApp Appointment'],
    testimonials: [
      { name: 'Dr. Yasir (Bosan Road)', role: 'Dental Patient', comment: 'Outstanding hygiene and professional care by Dr. Ashfaq.', rating: 5 }
    ],
    faqs: [
      { q: 'How to book consultation?', a: 'Click the WhatsApp booking button for instant confirmation.' }
    ]
  }
};
