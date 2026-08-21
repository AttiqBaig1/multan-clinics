import { ClinicTemplateData, MULTAN_PRESETS, PAKISTANI_IMAGES } from './multanTemplates';

// Pre-registered Multan Clients baked directly into code
export const INITIAL_REGISTERED_CLIENTS: Record<string, ClinicTemplateData> = {
  // Attiq Vision Care Eye Hospital
  'attiq-vision-care-eye-hospital': {
    niche: 'eye',
    nicheTitle: 'Eye Hospital & Laser Vision Center',
    businessName: 'Attiq Vision Care Eye Hospital',
    tagline: '#1 Computer Eye Care in Multan',
    doctorName: 'Prof. Dr. Attiq',
    doctorTitle: 'MBBS, FCPS Ophthalmology, Vitreo-Retinal Surgeon',
    doctorExperience: '16+ Years Experience in Advanced Eye Care & Phaco Surgery',
    phone: '03006340991',
    whatsApp: '923006340991',
    address: 'Zakariya Town st #38',
    city: 'Multan',
    timings: '03:30 PM - 08:30 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,200 (Free for WhatsApp Booking)',
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600',
    doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    services: [
      { title: 'Blade-Free Customized LASIK', desc: 'Permanent freedom from glasses and contact lenses with FDA approved German laser.', icon: 'Eye', price: 'Rs. 50,000' },
      { title: 'Micro-Incision Phaco Cataract', desc: '10-minute painless sutureless cataract surgery with premium foldable lenses.', icon: 'Shield', price: 'Rs. 30,000' },
      { title: 'Diabetic Retinopathy & Laser', desc: 'Advanced retinal angiography and laser photocoagulation for diabetic eye patients.', icon: 'Sparkles', price: 'Rs. 12,000' },
      { title: 'Computerized Glaucoma Testing', desc: 'Early detection of ocular pressure (Kala Motia) with computerized visual field analysis.', icon: 'Award', price: 'Book' }
    ],
    badges: ['FCPS Vitreo-Retinal Specialist', 'German Carl Zeiss Laser Technology', '100% Painless Phaco Cataract', 'Priority WhatsApp Token'],
    testimonials: [
      { name: 'Chaudhry Nadeem (Zakariya Town)', role: 'LASIK Patient', comment: 'Prof. Dr. Attiq performed my LASIK surgery. 6/6 vision restored in 24 hours without any pain!', rating: 5 },
      { name: 'Haji Abdul Ghaffar (Bosan Road)', role: 'Cataract Patient', comment: 'Got my father cataract phaco surgery done at Attiq Vision Care. Outstanding cleanliness and care.', rating: 5 },
      { name: 'Dr. Maria Bilal (Cantt Multan)', role: 'Glaucoma Patient', comment: 'Best eye hospital in Multan with state-of-the-art diagnostic equipment.', rating: 5 }
    ],
    faqs: [
      { q: 'What are the clinic timings at Zakariya Town st #38?', a: 'We are open Monday to Saturday from 03:30 PM to 08:30 PM.' },
      { q: 'Is LASIK eye surgery permanent and safe?', a: 'Yes, blade-free customized LASIK is 100% FDA approved, permanent and takes only 10 minutes.' },
      { q: 'How can I book a VIP appointment with Prof. Dr. Attiq?', a: 'Click the green WhatsApp button or Call 03006340991 for instant token confirmation.' }
    ]
  },
  'attiq-vision-care': {
    niche: 'eye',
    nicheTitle: 'Eye Hospital & Laser Vision Center',
    businessName: 'Attiq Vision Care Eye Hospital',
    tagline: '#1 Computer Eye Care in Multan',
    doctorName: 'Prof. Dr. Attiq',
    doctorTitle: 'MBBS, FCPS Ophthalmology, Vitreo-Retinal Surgeon',
    doctorExperience: '16+ Years Experience in Advanced Eye Care & Phaco Surgery',
    phone: '03006340991',
    whatsApp: '923006340991',
    address: 'Zakariya Town st #38',
    city: 'Multan',
    timings: '03:30 PM - 08:30 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,200 (Free for WhatsApp Booking)',
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600',
    doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    services: [
      { title: 'Blade-Free Customized LASIK', desc: 'Permanent freedom from glasses and contact lenses with FDA approved German laser.', icon: 'Eye', price: 'Rs. 50,000' },
      { title: 'Micro-Incision Phaco Cataract', desc: '10-minute painless sutureless cataract surgery with premium foldable lenses.', icon: 'Shield', price: 'Rs. 30,000' },
      { title: 'Diabetic Retinopathy & Laser', desc: 'Advanced retinal angiography and laser photocoagulation for diabetic eye patients.', icon: 'Sparkles', price: 'Rs. 12,000' },
      { title: 'Computerized Glaucoma Testing', desc: 'Early detection of ocular pressure (Kala Motia) with computerized visual field analysis.', icon: 'Award', price: 'Book' }
    ],
    badges: ['FCPS Vitreo-Retinal Specialist', 'German Carl Zeiss Laser Technology', '100% Painless Phaco Cataract', 'Priority WhatsApp Token'],
    testimonials: [
      { name: 'Chaudhry Nadeem (Zakariya Town)', role: 'LASIK Patient', comment: 'Prof. Dr. Attiq performed my LASIK surgery. 6/6 vision restored in 24 hours without any pain!', rating: 5 }
    ],
    faqs: [
      { q: 'What are the clinic timings at Zakariya Town st #38?', a: 'We are open Monday to Saturday from 03:30 PM to 08:30 PM.' }
    ]
  },
  'vision-care-eye-hospital': {
    niche: 'eye',
    nicheTitle: 'Eye Hospital & Laser Vision Center',
    businessName: 'Attiq Vision Care Eye Hospital',
    tagline: '#1 Computer Eye Care in Multan',
    doctorName: 'Prof. Dr. Attiq',
    doctorTitle: 'MBBS, FCPS Ophthalmology, Vitreo-Retinal Surgeon',
    doctorExperience: '16+ Years Experience in Advanced Eye Care & Phaco Surgery',
    phone: '03006340991',
    whatsApp: '923006340991',
    address: 'Zakariya Town st #38',
    city: 'Multan',
    timings: '03:30 PM - 08:30 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,200 (Free for WhatsApp Booking)',
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600',
    doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    services: [
      { title: 'Blade-Free Customized LASIK', desc: 'Permanent freedom from glasses and contact lenses with FDA approved German laser.', icon: 'Eye', price: 'Rs. 50,000' },
      { title: 'Micro-Incision Phaco Cataract', desc: '10-minute painless sutureless cataract surgery with premium foldable lenses.', icon: 'Shield', price: 'Rs. 30,000' },
      { title: 'Diabetic Retinopathy & Laser', desc: 'Advanced retinal angiography and laser photocoagulation for diabetic eye patients.', icon: 'Sparkles', price: 'Rs. 12,000' },
      { title: 'Computerized Glaucoma Testing', desc: 'Early detection of ocular pressure (Kala Motia) with computerized visual field analysis.', icon: 'Award', price: 'Book' }
    ],
    badges: ['FCPS Vitreo-Retinal Specialist', 'German Carl Zeiss Laser Technology', '100% Painless Phaco Cataract', 'Priority WhatsApp Token'],
    testimonials: [
      { name: 'Chaudhry Nadeem (Zakariya Town)', role: 'LASIK Patient', comment: 'Prof. Dr. Attiq performed my LASIK surgery. 6/6 vision restored in 24 hours without any pain!', rating: 5 }
    ],
    faqs: [
      { q: 'What are the clinic timings at Zakariya Town st #38?', a: 'We are open Monday to Saturday from 03:30 PM to 08:30 PM.' }
    ]
  },
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
  'al-attiq-dental': {
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
      { name: 'Malik Tariq (Nishtar Road)', role: 'Dental Implant Patient', comment: 'Dr. Muhammad Attiq sahab is the most professional dental surgeon in Multan. Implant procedure was 100% painless!', rating: 5 }
    ],
    faqs: [
      { q: 'What are the clinic timings at Zakariya Town?', a: 'We are open Monday to Saturday from 04:00 PM to 09:30 PM.' }
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
  },
  'al-ashfaq-dental': {
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
  },
  'al-shafi-dental-implant-studio': MULTAN_PRESETS[0],
  'al-shafi-dental': MULTAN_PRESETS[0],
  'glow-aesthetics-skin-hair-center': MULTAN_PRESETS[1],
  'glow-aesthetics-skin': MULTAN_PRESETS[1],
  'glow-aesthetics': MULTAN_PRESETS[1],
  'vision-care-eye-hospital-laser-center': MULTAN_PRESETS[2],
  'vision-care-eye': MULTAN_PRESETS[2],
  'multan-orthopedic-joint-center': MULTAN_PRESETS[3],
  'multan-orthopedic': MULTAN_PRESETS[3],
  'punjab-cardiology-heart-institute': MULTAN_PRESETS[4],
  'punjab-cardiology': MULTAN_PRESETS[4],
  'multan-cardiology': MULTAN_PRESETS[4],
  'al-shifa-child-care-clinic': MULTAN_PRESETS[5],
  'al-shifa-child-care': MULTAN_PRESETS[5],
  'multan-mother-care-maternity-clinic': MULTAN_PRESETS[6],
  'multan-maternity-care': MULTAN_PRESETS[6],
  'multan-physio-rehab-spine-clinic': MULTAN_PRESETS[7],
  'multan-physio-rehab': MULTAN_PRESETS[7],
  'multan-physio': MULTAN_PRESETS[7],
  'al-rehman-family-medical-center': MULTAN_PRESETS[8],
  'al-rehman-medical': MULTAN_PRESETS[8],
  'multan-pet-hospital-vet-clinic': MULTAN_PRESETS[9],
  'multan-pet-hospital': MULTAN_PRESETS[9]
};
