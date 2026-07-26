export interface ClinicTemplateData {
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
  services: { title: string; desc: string; icon: string; price?: string }[];
  badges: string[];
  testimonials: { name: string; role: string; comment: string; rating: number }[];
  faqs: { q: string; a: string }[];
}

export const PAKISTANI_IMAGES = {
  facilities: [
    {
      id: 'fac-dental',
      name: 'Modern Dental Suite & 3D Scan Lounge',
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'fac-skin',
      name: 'Hydrafacial MD & Aesthetic Laser Suite',
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'fac-eye',
      name: 'LASIK & Phaco Cataract Laser Theatre',
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'fac-ortho',
      name: 'Orthopedic Joint & Spine Center',
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'fac-cardio',
      name: 'Cardiology ECG & Echo Diagnostic Suite',
      url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'fac-peds',
      name: 'Pediatric Child Care & OPD Lounge',
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'fac-gynae',
      name: 'Mother & Maternity Care Suite',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'fac-pet',
      name: 'Veterinary Hospital & Pet Care Center',
      url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1600'
    }
  ],
  doctors: [
    {
      id: 'doc-dental',
      name: 'Dr. Muhammad Farooq (Dental Specialist)',
      url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'doc-skin',
      name: 'Dr. Sara Khan (Aesthetic Consultant)',
      url: 'https://images.unsplash.com/photo-1594824813566-82823d5afe4a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'doc-eye',
      name: 'Prof. Dr. Rashid Mahmood (Senior Eye Surgeon)',
      url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'doc-ortho',
      name: 'Dr. Usman Ghani (Orthopedic & Spine Surgeon)',
      url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'doc-cardio',
      name: 'Dr. Imran Shah (Cardiologist)',
      url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'doc-peds',
      name: 'Dr. Ayesha Malik (Child Specialist)',
      url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'doc-gynae',
      name: 'Dr. Salma Parveen (Gynae Specialist)',
      url: 'https://images.unsplash.com/photo-1594824813566-82823d5afe4a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'doc-pet',
      name: 'Dr. Usman Ali (Senior Vet Doctor)',
      url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800'
    }
  ],
  clinics: {
    dental: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600',
    skin: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1600',
    eye: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600',
    ortho: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600',
    cardio: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1600',
    peds: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1600',
    gynae: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600',
    physio: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600',
    general: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600',
    pet: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1600'
  }
};

export const MULTAN_PRESETS: ClinicTemplateData[] = [
  {
    niche: 'dental',
    nicheTitle: 'Dental Clinic & Implant Center',
    businessName: 'Al-Shafi Dental & Implant Studio',
    tagline: 'Multan\'s Premier Painless Dental Care, Braces & Smile Design',
    doctorName: 'Dr. Muhammad Farooq',
    doctorTitle: 'BDS, RDS (Gold Medalist), Dental Implant Surgeon',
    doctorExperience: '14+ Years Clinical Experience in Painless Dentistry',
    phone: '03007312345',
    whatsApp: '923007312345',
    address: '14-A, Nishtar Road, Near Nishtar Hospital Gate 2',
    city: 'Multan',
    timings: '04:00 PM - 09:30 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,000 (Free for WhatsApp Bookings)',
    heroImage: PAKISTANI_IMAGES.clinics.dental,
    doctorImage: PAKISTANI_IMAGES.doctors[0].url,
    services: [
      { title: 'German Titanium Implants', desc: 'Permanent lifetime tooth replacement with imported German titanium implants.', icon: 'Sparkles', price: 'Rs. 45,000' },
      { title: 'Laser Teeth Whitening & Scaling', desc: 'Advanced laser scaling and whitening for a bright celebrity smile in 30 mins.', icon: 'Smile', price: 'Rs. 4,500' },
      { title: 'Computerized Painless RCT', desc: '100% Painless single-sitting computerized root canal therapy.', icon: 'ShieldCheck', price: 'Rs. 6,000' },
      { title: 'Invisalign & Metal Braces', desc: 'Invisible alignment braces for teenagers and adults with easy installment plans.', icon: 'Award', price: 'Rs. 80,000' }
    ],
    badges: [
      'PMDC Registered Specialist',
      '100% German Sterilization Protocol',
      'Painless Anesthesia Technology',
      'Direct WhatsApp Appointment'
    ],
    testimonials: [
      { name: 'Chaudhry Tariq (Gulgasht)', role: 'Verified Patient', comment: 'Painless RCT completed in just one sitting! Dr. Farooq is extremely professional.', rating: 5 },
      { name: 'Dr. Ayesha Malik (Cantt)', role: 'Verified Patient', comment: 'Best dental clinic in Multan. Clean environment and state of the art lasers.', rating: 5 }
    ],
    faqs: [
      { q: 'Is dental implant surgery painful?', a: 'Not at all. We use computerized painless local anesthesia and German titanium implants.' },
      { q: 'How can I book a priority appointment?', a: 'Click the WhatsApp button below to message our clinic receptionist directly.' }
    ]
  },
  {
    niche: 'skin',
    nicheTitle: 'Skin Aesthetics & Laser Clinic',
    businessName: 'Glow Aesthetics Skin & Hair Center',
    tagline: 'Multan\'s Advanced Dermatology, Hydrafacial & Laser Hair Removal',
    doctorName: 'Dr. Sara Khan',
    doctorTitle: 'MBBS, FCPS Dermatology, Cosmetology Consultant',
    doctorExperience: '12+ Years Aesthetic Specialist',
    phone: '03018899776',
    whatsApp: '923018899776',
    address: 'Plaza 45, Bosan Road, Opposite Gulgasht Mall',
    city: 'Multan',
    timings: '03:00 PM - 09:00 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,500',
    heroImage: PAKISTANI_IMAGES.clinics.skin,
    doctorImage: PAKISTANI_IMAGES.doctors[1].url,
    services: [
      { title: 'Hydrafacial MD Gold', desc: 'Deep pore cleansing, exfoliation & antioxidant hydration for glowing skin.', icon: 'Sparkles', price: 'Rs. 8,500' },
      { title: 'Triple Wavelength Laser Hair Removal', desc: 'Painless permanent hair reduction for full body with cooling tip technology.', icon: 'Zap', price: 'Rs. 12,000' },
      { title: 'Acne Scar Microneedling & PRP', desc: 'Vampire PRP collagen stimulation for smooth, poreless glass skin.', icon: 'Activity', price: 'Rs. 9,000' },
      { title: 'Botox & Dermal Fillers', desc: 'Wrinkle reduction, lip augmentation & jawline contouring by certified FCPS skin doctor.', icon: 'Sun', price: 'Rs. 25,000' }
    ],
    badges: [
      'FCPS Consultant Dermatologist',
      'FDA Approved Laser Machinery',
      'Private Female Aesthetic Suite',
      '100% Organic Dermatological Sera'
    ],
    testimonials: [
      { name: 'Zahra Fatima (Model Colony)', role: 'Hydrafacial Patient', comment: 'My skin was glowing instantly after 1 session! Highly recommended for brides in Multan.', rating: 5 },
      { name: 'Saima Usman (Bosan Rd)', role: 'Laser Patient', comment: 'Painless laser hair removal! Dr. Sara is very gentle and soft spoken.', rating: 5 }
    ],
    faqs: [
      { q: 'Is laser hair removal safe for sensitive Pakistani skin tones?', a: 'Yes! Our diode laser is customized specifically for South Asian skin types.' },
      { q: 'Is there a private waiting room for female patients?', a: 'Yes, we have dedicated private treatment rooms with female technicians.' }
    ]
  },
  {
    niche: 'eye',
    nicheTitle: 'Eye Specialist & Laser Center',
    businessName: 'Vision Care Eye Hospital & Laser Center',
    tagline: 'Modern No-Stitch Cataract Surgery & Computer Eye Care in Multan',
    doctorName: 'Prof. Dr. Rashid Mahmood',
    doctorTitle: 'MBBS, FCPS Ophthalmology, Vitreo-Retinal Surgeon',
    doctorExperience: '20+ Years Senior Eye Surgeon',
    phone: '03034441122',
    whatsApp: '923034441122',
    address: 'Near Ghanta Ghar, Main Tariq Road',
    city: 'Multan',
    timings: '03:30 PM - 08:30 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,200',
    heroImage: PAKISTANI_IMAGES.clinics.eye,
    doctorImage: PAKISTANI_IMAGES.doctors[2].url,
    services: [
      { title: 'Phaco Cataract Surgery', desc: '10-minute painless, no-injection, no-stitch cataract operation with foldable lens.', icon: 'Eye', price: 'Rs. 35,000' },
      { title: 'LASIK Glasses Removal Laser', desc: 'Get rid of distance & reading glasses permanently with Swiss laser tech.', icon: 'Zap', price: 'Rs. 75,000' },
      { title: 'Glaucoma & Diabetic Retina Care', desc: 'Early screening, OCT scan & retina laser injections for diabetic patients.', icon: 'Activity', price: 'Rs. 2,500' }
    ],
    badges: [
      'FCPS Senior Eye Specialist',
      'Swiss Laser Technology',
      'Painless No-Stitch Cataract Surgery',
      'Computerized Vision Testing'
    ],
    testimonials: [
      { name: 'Haji Abdul Malik', role: 'Cataract Patient', comment: 'Phaco surgery was completed in 10 minutes. My sight is 100% clear now. Shukriya Dr. Sahib!', rating: 5 }
    ],
    faqs: [
      { q: 'Is cataract surgery done under total anesthesia?', a: 'No, we use topical drops only. No injections in the eye, zero pain.' }
    ]
  },
  {
    niche: 'ortho',
    nicheTitle: 'Orthopedic & Joint Replacement Center',
    businessName: 'Multan Orthopedic & Joint Center',
    tagline: 'Advanced Knee Replacement, Spine Surgery & Fracture Treatment in Multan',
    doctorName: 'Dr. Usman Ghani',
    doctorTitle: 'MBBS, FCPS Orthopedic Surgery, Fellowship Joint Replacement (UK)',
    doctorExperience: '16+ Years Senior Orthopedic Surgeon',
    phone: '03006398877',
    whatsApp: '923006398877',
    address: 'Nishtar Road Commercial Area, Opposite Emergency Gate',
    city: 'Multan',
    timings: '05:00 PM - 09:30 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,500',
    heroImage: PAKISTANI_IMAGES.clinics.ortho,
    doctorImage: PAKISTANI_IMAGES.doctors[3].url,
    services: [
      { title: 'Computerized Knee Replacement', desc: 'Minimally invasive total knee joint replacement with rapid 2-day recovery protocol.', icon: 'ShieldCheck', price: 'Package Quote' },
      { title: 'Spine & Disc Pain Management', desc: 'Non-surgical spinal decompression, sciatica relief & epidural pain therapy.', icon: 'Activity', price: 'Rs. 2,000' },
      { title: 'Arthroscopic Ligament Repair (ACL)', desc: 'Keyhole arthroscopy for sports injury, knee cartilage repair and ligament reconstruction.', icon: 'Sparkles', price: 'Specialist Quote' },
      { title: 'Complex Fracture & Trauma Surgery', desc: 'Digital X-Ray guided titanium plate fixing for acute trauma and bone fractures.', icon: 'Crosshair', price: 'Urgent Care' }
    ],
    badges: [
      'FCPS Senior Orthopedic Specialist',
      'UK Trained Joint Replacement Fellow',
      'Digital X-Ray & C-Arm OT Facility',
      'Painless Post-Op Rehabilitation'
    ],
    testimonials: [
      { name: 'Malik Mohammad Aslam (Shamsabad)', role: 'Knee Patient', comment: 'My mother had knee replacement surgery with Dr. Usman Ghani. She is walking comfortably now without pain!', rating: 5 }
    ],
    faqs: [
      { q: 'How long does recovery take after knee joint surgery?', a: 'With our UK protocol, patients start walking with support within 24-48 hours.' }
    ]
  },
  {
    niche: 'cardio',
    nicheTitle: 'Cardiology & Heart Care Institute',
    businessName: 'South Punjab Heart & Vascular Institute',
    tagline: 'Comprehensive Cardiac Care, ECG, Echo & Hypertension Treatment in Multan',
    doctorName: 'Dr. Imran Shah',
    doctorTitle: 'MBBS, FCPS Cardiology, Diplomate Interventional Cardiology',
    doctorExperience: '18+ Years Senior Cardiologist',
    phone: '03027788990',
    whatsApp: '923027788990',
    address: 'Abid Medical Complex, Nishtar Road',
    city: 'Multan',
    timings: '04:00 PM - 08:30 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,500',
    heroImage: PAKISTANI_IMAGES.clinics.cardio,
    doctorImage: PAKISTANI_IMAGES.doctors[4].url,
    services: [
      { title: 'Digital ECG & Color Doppler Echo', desc: 'Instant high-resolution cardiac echo diagnostic test & blood flow analysis.', icon: 'Activity', price: 'Rs. 3,500' },
      { title: 'Hypertension & Angina Management', desc: 'Specialized blood pressure regulation, cholesterol control & chest pain protocol.', icon: 'ShieldCheck', price: 'Rs. 1,500' },
      { title: 'Post-Angiography & Stent Care', desc: 'Long-term cardiac medication review & preventive heart care counseling.', icon: 'Heart', price: 'Rs. 1,500' }
    ],
    badges: [
      'FCPS Interventional Cardiologist',
      'In-House Color Doppler Echocardiography',
      'Emergency ECG & BP Monitoring Desk',
      'Dedicated Heart Health Checkup'
    ],
    testimonials: [
      { name: 'Haji Nawaz Sharif (Cantt)', role: 'Cardiac Patient', comment: 'Dr. Imran Shah diagnosed my heart condition quickly and stabilized my BP. Best cardiologist in Multan.', rating: 5 }
    ],
    faqs: [
      { q: 'Do I need an appointment for Echocardiography?', a: 'Prior booking via WhatsApp ensures zero wait time at our diagnostic suite.' }
    ]
  },
  {
    niche: 'peds',
    nicheTitle: 'Pediatric Child Care & Vaccination Hospital',
    businessName: 'Little Angels Pediatric Hospital',
    tagline: 'Specialized Child Healthcare, Growth Monitoring & Newborn ICU in Multan',
    doctorName: 'Dr. Ayesha Malik',
    doctorTitle: 'MBBS, FCPS Pediatrics, Diploma in Child Health (DCH)',
    doctorExperience: '14+ Years Senior Child Specialist',
    phone: '03014455667',
    whatsApp: '923014455667',
    address: 'Near Old Bhawan, Officers Colony, Bosan Road',
    city: 'Multan',
    timings: '03:00 PM - 09:00 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,000',
    heroImage: PAKISTANI_IMAGES.clinics.peds,
    doctorImage: PAKISTANI_IMAGES.doctors[5].url,
    services: [
      { title: 'Child Vaccination & Immunization', desc: 'Complete EPI & imported optional vaccines with child immunization record card.', icon: 'ShieldCheck', price: 'Official Rates' },
      { title: 'Newborn Care & Jaundice Therapy', desc: 'Phototherapy, weight monitoring & nutrition guidance for infants.', icon: 'Heart', price: 'Rs. 1,000' },
      { title: 'Pediatric Asthma & Allergy OPD', desc: 'Nebulization, chest physiotherapy & chronic cough treatment for kids.', icon: 'Sparkles', price: 'Rs. 1,000' }
    ],
    badges: [
      'FCPS Child Specialist & Neonatologist',
      'Imported Cold-Chain Vaccines Only',
      'Kid-Friendly Playful Waiting Area',
      '24/7 Emergency Pediatric On Call'
    ],
    testimonials: [
      { name: 'Mrs. Saad Farooq (Gulgasht)', role: 'Mother', comment: 'Dr. Ayesha is so kind with children! My baby didn\'t even cry during vaccination.', rating: 5 }
    ],
    faqs: [
      { q: 'Are your vaccines stored in temperature-controlled refrigerators?', a: 'Yes! We maintain strict international cold-chain standards with backup power.' }
    ]
  },
  {
    niche: 'gynae',
    nicheTitle: 'Gynae, Maternity & Fertility Center',
    businessName: 'Mother Care Gynae & Infertility Clinic',
    tagline: 'Compassionate Women\'s Health, Antenatal Ultrasound & Infertility Care',
    doctorName: 'Dr. Salma Parveen',
    doctorTitle: 'MBBS, FCPS Gynaecology & Obstetrics, Fellowship Infertility',
    doctorExperience: '17+ Years Senior Gynaecologist',
    phone: '03039988776',
    whatsApp: '923039988776',
    address: 'Near Chowk Shaheedan, Khanewal Road',
    city: 'Multan',
    timings: '04:00 PM - 08:30 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,200',
    heroImage: PAKISTANI_IMAGES.clinics.gynae,
    doctorImage: PAKISTANI_IMAGES.doctors[6].url,
    services: [
      { title: 'Antenatal Pregnancy Care & Ultrasound', desc: 'Routine pregnancy checkups, high-risk pregnancy monitoring & 4D ultrasound.', icon: 'Heart', price: 'Rs. 1,200' },
      { title: 'PCOS & Hormonal Imbalance Clinic', desc: 'Specialized treatment for irregular cycles, weight control & acne management.', icon: 'Sparkles', price: 'Rs. 1,200' },
      { title: 'Infertility Evaluation & Treatment', desc: 'Ovulation induction, follicular tracking & comprehensive fertility consultation.', icon: 'ShieldCheck', price: 'Rs. 2,000' }
    ],
    badges: [
      'FCPS Consultant Gynaecologist',
      '100% Private Female Waiting Suite',
      'In-House 4D Ultrasound Suite',
      'Pain-Free Maternity OPD'
    ],
    testimonials: [
      { name: 'Bushra Imran (Mumtazabad)', role: 'Patient', comment: 'Dr. Salma Parveen gives proper time to every patient. Her guidance during my pregnancy was invaluable.', rating: 5 }
    ],
    faqs: [
      { q: 'Is there a female ultrasound doctor available?', a: 'Yes, all ultrasound scans and examinations are performed personally by female specialist.' }
    ]
  },
  {
    niche: 'physio',
    nicheTitle: 'Physiotherapy & Spine Rehabilitation',
    businessName: 'Multan Spine & Physio Rehab Center',
    tagline: 'Advanced Spine Decompression, Sciatica Relief & Post-Op Physical Therapy',
    doctorName: 'Dr. Bilal Ahmad (DPT)',
    doctorTitle: 'Doctor of Physical Therapy (DPT), Certified Spinal Manual Therapist',
    doctorExperience: '11+ Years Spine & Rehab Specialist',
    phone: '03041122334',
    whatsApp: '923041122334',
    address: 'Plaza 12, Northern Bypass Road, Near MDA Chowk',
    city: 'Multan',
    timings: '03:00 PM - 09:00 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,000',
    heroImage: PAKISTANI_IMAGES.clinics.physio,
    doctorImage: PAKISTANI_IMAGES.doctors[3].url,
    services: [
      { title: 'Computerized Spinal Decompression', desc: 'Painless traction therapy for herniated disc, neck pain, and sciatica relief.', icon: 'Activity', price: 'Rs. 1,500' },
      { title: 'Post-Stroke & Paralysis Rehab', desc: 'Targeted neuromuscular re-education and limb movement training.', icon: 'ShieldCheck', price: 'Rs. 1,800' },
      { title: 'Knee & Joint Manual Therapy', desc: 'Non-surgical joint mobilization for osteoarthritis and frozen shoulder.', icon: 'Sparkles', price: 'Rs. 1,200' }
    ],
    badges: [
      'Doctor of Physical Therapy (DPT)',
      'Imported Electrotherapy Machinery',
      'Private Exercise Rehabilitation Gym',
      'Targeted Back & Knee Protocols'
    ],
    testimonials: [
      { name: 'Umer Farooq (Bosan Rd)', role: 'Sciatica Patient', comment: 'My back pain vanished after 5 sessions of spinal decompression. Dr. Bilal is brilliant!', rating: 5 }
    ],
    faqs: [
      { q: 'Is physiotherapy effective for disc slip without surgery?', a: 'Yes, computerized spinal decompression relieves nerve compression naturally.' }
    ]
  },
  {
    niche: 'general',
    nicheTitle: 'General Physician & Diabetes Clinic',
    businessName: 'City Care Medical & Diabetes Center',
    tagline: 'Comprehensive General Medicine, Diabetes Management & Hypertension Clinic',
    doctorName: 'Dr. Tariq Mahmood',
    doctorTitle: 'MBBS, FCPS Medicine, Diabetologist',
    doctorExperience: '15+ Years Senior Physician',
    phone: '03058877665',
    whatsApp: '923058877665',
    address: 'Opposite Government Civil Hospital, Abdali Road',
    city: 'Multan',
    timings: '05:00 PM - 10:00 PM (Mon - Sat)',
    consultationFee: 'Rs. 1,000',
    heroImage: PAKISTANI_IMAGES.clinics.general,
    doctorImage: PAKISTANI_IMAGES.doctors[4].url,
    services: [
      { title: 'Complete Diabetes Care & HbA1c', desc: 'Blood sugar regulation, insulin adjustment & diabetic foot screening.', icon: 'ShieldCheck', price: 'Rs. 1,000' },
      { title: 'Blood Pressure & Cholesterol OPD', desc: 'Cardiovascular risk evaluation and long-term hypertension management.', icon: 'Activity', price: 'Rs. 1,000' },
      { title: 'Executive Health Screening', desc: 'Complete liver, kidney, blood panel analysis & preventive medical advice.', icon: 'Sparkles', price: 'Rs. 3,000' }
    ],
    badges: [
      'FCPS Senior Physician & Diabetologist',
      'In-House Rapid Sugar & Lab Testing',
      'Diabetic Foot Care Protocol',
      'Zero Wait Reception Queue'
    ],
    testimonials: [
      { name: 'Chaudhry Rashid (Shah Rukn-e-Alam)', role: 'Diabetes Patient', comment: 'Dr. Tariq Mahmood controlled my sugar levels within 2 weeks. Highly experienced doctor.', rating: 5 }
    ],
    faqs: [
      { q: 'Do you offer instant blood sugar testing at clinic?', a: 'Yes, glucometer and lab HbA1c testing are available immediately.' }
    ]
  },
  {
    niche: 'pet',
    nicheTitle: 'Pet Care & Veterinary Hospital',
    businessName: 'Multan Paws & Claws Veterinary Care',
    tagline: 'Compassionate Pet Healthcare, Surgery, Grooming & Pet Shop in Multan',
    doctorName: 'Dr. Usman Ali',
    doctorTitle: 'DVM, M.Phil Veterinary Surgery & Medicine',
    doctorExperience: '10+ Years Dedicated Pet Specialist',
    phone: '03025554321',
    whatsApp: '923025554321',
    address: 'Shop 12, Commercial Area, Multan Cantt',
    city: 'Multan',
    timings: '11:00 AM - 10:00 PM (Open 7 Days)',
    consultationFee: 'Rs. 800',
    heroImage: PAKISTANI_IMAGES.clinics.pet,
    doctorImage: PAKISTANI_IMAGES.doctors[7].url,
    services: [
      { title: 'Vaccination & Deworming', desc: 'Rabies, FVRCP, and 7-in-1 core puppy & kitten vaccinations with official booklet.', icon: 'ShieldCheck', price: 'Rs. 2,000' },
      { title: 'Pet Grooming & Medicated Bath', desc: 'Full hair clipping, nail trimming, ear cleaning, and anti-tick medicated bath.', icon: 'Heart', price: 'Rs. 3,500' },
      { title: 'Advanced Pet Surgery', desc: 'Neutering, spaying, fracture orthopedic fix, and soft tissue surgeries.', icon: 'Crosshair', price: 'Rs. 10,000' },
      { title: 'Imported Pet Food & Accessories', desc: 'Royal Canin, Reflex, Happy Cat, cages, toys & treats in stock.', icon: 'Package', price: 'Best Market Rates' }
    ],
    badges: [
      'PVMC Registered Vet Doctor',
      'In-House Digital X-Ray & Ultrasound',
      '24/7 Emergency Vet On Call',
      'Air-Conditioned Pet Boarding Facilities'
    ],
    testimonials: [
      { name: 'Hamza Shah (Cantt)', role: 'Cat Owner', comment: 'Dr. Usman saved my Persian cat when it was severely sick. Best vet in Multan!', rating: 5 },
      { name: 'Bilal Raza (Shamsabad)', role: 'German Shepherd Owner', comment: 'Great grooming service and fresh dog food stock always available.', rating: 5 }
    ],
    faqs: [
      { q: 'Do you offer emergency vet home visits in Multan?', a: 'Yes, we provide emergency call-outs for severe pet conditions in Cantt & Gulgasht.' },
      { q: 'What pet food brands do you carry?', a: 'We stock Royal Canin, Reflex, Josera, Diamond, and local premium pet feeds.' }
    ]
  }
];
