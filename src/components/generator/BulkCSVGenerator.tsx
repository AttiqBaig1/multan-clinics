import React, { useState, useMemo } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  MessageSquare, 
  Search, 
  Trash2, 
  Play, 
  Sparkles,
  AlertCircle,
  Building2,
  FileText
} from 'lucide-react';

export interface BulkClinicRow {
  id: string;
  businessName: string;
  doctorName: string;
  doctorTitle: string;
  niche: string;
  whatsApp: string;
  phone: string;
  city: string;
  address: string;
  tagline?: string;
  generatedUrl?: string;
  generatedPitch?: string;
  whatsappLink?: string;
}

const SAMPLE_CSV_DATA = `Business Name,Doctor Name,Specialty / Niche,WhatsApp,Phone,City,Address,Tagline
Multan Dental Arts,Dr. Usman Tariq,dental,923006340991,03006340991,Multan,Gulgasht Colony,Painless Root Canal & Dental Implants Specialist
Glow Aesthetics Multan,Dr. Ayesha Malik,skin,923217300000,03217300000,Multan,Nishtar Road,Hydrafacial MD & Laser Skin Aesthetics
Multan Laser Eye Center,Prof. Dr. Tariq Latif,eye,923008765432,03008765432,Multan,Zakariya Town,Blade-Free LASIK & Phaco Cataract Surgery
Multan Orthopedic & Spine Care,Dr. Kamran Qureshi,ortho,923336123456,03336123456,Multan,Bosan Road,Advanced Joint Replacement & Spine Clinic
South Punjab Heart Care,Dr. Faisal Shahzad,cardio,923019876543,03019876543,Multan,Abdali Road,Non-Invasive Cardiology & Echo Center
Pet Care & Surgery Center,Dr. Hamza Bilal,pet,923025554433,03025554433,Multan,Cantt Multan,24/7 Pet Hospital & Import Nutrition
Al-Rehman Dental Hospital,Dr. Zainab Farooq,dental,923041122334,03041122334,Multan,Bosan Road,State-of-the-art Dental Aligners & Surgery
DermaLuxe Skin Clinic,Dr. Rabia Khan,skin,923129988776,03129988776,Multan,Model Town,PRP Hair Restoration & Laser Rejuvenation`;

export const BulkCSVGenerator: React.FC = () => {
  const [csvText, setCsvText] = useState<string>('');
  const [parsedRows, setParsedRows] = useState<BulkClinicRow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedNicheFilter, setSelectedNicheFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'results'>('upload');

  // Base URL for generated live links
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://websitedemos.space';

  // Helper to generate pitch
  const generatePitch = (row: BulkClinicRow, demoUrl: string): string => {
    const niche = row.niche.toLowerCase();
    const docName = row.doctorName || 'Doctor';
    const biz = row.businessName || 'Clinic';
    const city = row.city || 'Multan';
    const addr = row.address || city;

    let points = `✅ Modern Patient Appointment System\n✅ Services & Package Details\n✅ Doctor Profile & Verified Badges`;
    if (niche.includes('dent')) {
      points = `✅ Painless Root Canal, Implants & Aligners charges check kar saktay hain\n✅ Direct WhatsApp priority OPD appointment book kar saktay hain\n✅ Modern sterilization & clinic tour dekh saktay hain`;
    } else if (niche.includes('skin') || niche.includes('derma')) {
      points = `✅ Hydrafacial MD, Laser Hair Removal & PRP charges check kar saktay hain\n✅ Private consultation Direct WhatsApp pe book kar saktay hain\n✅ Female aesthetic suite & consultant profile dekh saktay hain`;
    } else if (niche.includes('eye') || niche.includes('vision')) {
      points = `✅ Blade-Free LASIK, Phaco Cataract & Glaucoma treatments dekh saktay hain\n✅ Direct WhatsApp VIP eye appointment book kar saktay hain\n✅ Modern diagnostic laser facility tour dekh saktay hain`;
    } else if (niche.includes('ortho') || niche.includes('bone')) {
      points = `✅ Joint Replacement, Knee pain & spine surgery packages check kar saktay hain\n✅ Direct WhatsApp priority consultation book kar saktay hain\n✅ Digital X-Ray & UK trained specialist profile dekh saktay hain`;
    } else if (niche.includes('cardio') || niche.includes('heart')) {
      points = `✅ ECG, Color Doppler Echo & blood pressure consultation check kar saktay hain\n✅ Direct WhatsApp emergency appointment book kar saktay hain\n✅ Senior cardiologist & cardiac diagnostics dekh saktay hain`;
    } else if (niche.includes('pet') || niche.includes('vet')) {
      points = `✅ Pet vaccination, surgery & boarding packages dekh saktay hain\n✅ Imported Royal Canin & Reflex pet food rates inquire kar saktay hain\n✅ 24/7 Vet visit WhatsApp pe book kar saktay hain`;
    }

    return `Assalam-o-Alaikum ${docName}! 👋

Main ne ${biz} (${addr}) ke liye ek modern, high-converting website demo tayar kiya hai.

Is website ke zariye aap ke patients:
${points}

📌 Aap ka live website demo yahan se dekhein:
${demoUrl}

Agar aap ko yeh design pasand aye to hum is ko aap ke custom domain pe 1 hour ke andar live kar saktay hain!

Regards,
Lead & Digital Demo Consultant
WhatsApp: ${row.phone || row.whatsApp}`;
  };

  // Process rows and attach live demo URLs and WhatsApp links
  const processCSVRows = (rawText: string) => {
    setIsProcessing(true);
    try {
      const lines = rawText.split(/\r?\n/).filter(line => line.trim().length > 0);
      if (lines.length === 0) {
        alert('CSV is empty. Please provide CSV data.');
        setIsProcessing(false);
        return;
      }

      // Check header
      const headerLine = lines[0];
      const headers = headerLine.split(',').map(h => h.trim().toLowerCase().replace(/[\"\']/g, ''));
      
      const findIndex = (keywords: string[]) => {
        return headers.findIndex(h => keywords.some(k => h.includes(k)));
      };

      const bizIdx = findIndex(['business', 'clinic', 'name', 'company']);
      const docIdx = findIndex(['doctor', 'dr', 'owner', 'specialist']);
      const nicheIdx = findIndex(['niche', 'specialty', 'category', 'type']);
      const waIdx = findIndex(['whatsapp', 'wa', 'mobile', 'cell']);
      const phoneIdx = findIndex(['phone', 'tel', 'call', 'contact']);
      const cityIdx = findIndex(['city', 'town', 'location']);
      const addrIdx = findIndex(['address', 'area', 'street', 'road']);
      const tagIdx = findIndex(['tagline', 'headline', 'desc', 'bio']);

      const dataRows = lines.slice(1);
      const processed: BulkClinicRow[] = [];

      dataRows.forEach((rowStr, index) => {
        // Regex to handle comma separation with quotes
        const match = rowStr.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || rowStr.split(',');
        const cols = match.map(c => c.replace(/^"|"$/g, '').trim());

        if (cols.length < 2) return;

        const businessName = (bizIdx >= 0 && cols[bizIdx]) ? cols[bizIdx] : cols[0] || 'Clinic Name';
        const doctorName = (docIdx >= 0 && cols[docIdx]) ? cols[docIdx] : (cols[1] || 'Doctor');
        let niche = (nicheIdx >= 0 && cols[nicheIdx]) ? cols[nicheIdx].toLowerCase() : 'dental';
        if (niche.includes('skin') || niche.includes('derma') || niche.includes('aesthet')) niche = 'skin';
        else if (niche.includes('eye') || niche.includes('vision') || niche.includes('lasik')) niche = 'eye';
        else if (niche.includes('ortho') || niche.includes('bone') || niche.includes('joint')) niche = 'ortho';
        else if (niche.includes('cardio') || niche.includes('heart')) niche = 'cardio';
        else if (niche.includes('pet') || niche.includes('vet')) niche = 'pet';
        else niche = 'dental';

        let whatsApp = (waIdx >= 0 && cols[waIdx]) ? cols[waIdx] : (cols[3] || '923006340991');
        whatsApp = whatsApp.replace(/[^0-9]/g, '');
        if (whatsApp.startsWith('03')) whatsApp = '92' + whatsApp.substring(1);
        if (!whatsApp.startsWith('92') && whatsApp.length === 10) whatsApp = '92' + whatsApp;

        const phone = (phoneIdx >= 0 && cols[phoneIdx]) ? cols[phoneIdx] : (cols[4] || whatsApp);
        const city = (cityIdx >= 0 && cols[cityIdx]) ? cols[cityIdx] : (cols[5] || 'Multan');
        const address = (addrIdx >= 0 && cols[addrIdx]) ? cols[addrIdx] : (cols[6] || city);
        const tagline = (tagIdx >= 0 && cols[tagIdx]) ? cols[tagIdx] : (cols[7] || 'Specialist Healthcare & Surgery');

        // Construct Dynamic URL
        const params = new URLSearchParams();
        params.set('b', businessName);
        params.set('doc', doctorName);
        params.set('w', whatsApp);
        params.set('p', phone);
        params.set('city', city);
        params.set('a', address);
        params.set('n', niche);
        params.set('t', tagline);

        const liveUrl = `${baseUrl}/?${params.toString()}`;
        const rowObj: BulkClinicRow = {
          id: `row-${index}-${Date.now()}`,
          businessName,
          doctorName,
          doctorTitle: 'Consultant Specialist',
          niche,
          whatsApp,
          phone,
          city,
          address,
          tagline,
          generatedUrl: liveUrl
        };

        const pitch = generatePitch(rowObj, liveUrl);
        rowObj.generatedPitch = pitch;
        rowObj.whatsappLink = `https://wa.me/${whatsApp}?text=${encodeURIComponent(pitch)}`;

        processed.push(rowObj);
      });

      setParsedRows(processed);
      setActiveTab('results');
    } catch (err) {
      console.error(err);
      alert('Error parsing CSV. Please check formatting.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle CSV file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (text) {
        setCsvText(text);
        processCSVRows(text);
      }
    };
    reader.readAsText(file);
  };

  // Load Sample 8 Demo Clinics
  const handleLoadSample = () => {
    setCsvText(SAMPLE_CSV_DATA);
    processCSVRows(SAMPLE_CSV_DATA);
  };

  // Filtered rows for results table
  const filteredRows = useMemo(() => {
    return parsedRows.filter(row => {
      const matchesSearch = 
        row.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesNiche = selectedNicheFilter === 'all' || row.niche === selectedNicheFilter;
      return matchesSearch && matchesNiche;
    });
  }, [parsedRows, searchTerm, selectedNicheFilter]);

  // Export Enriched CSV
  const handleDownloadEnrichedCSV = () => {
    if (parsedRows.length === 0) return;

    const headers = [
      'Business_Name',
      'Doctor_Name',
      'Niche',
      'WhatsApp_Number',
      'Phone',
      'City',
      'Address',
      'Live_Demo_URL',
      'WhatsApp_Outreach_Link',
      'Roman_Urdu_Pitch_Script'
    ];

    const escapeCsv = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;

    const csvContent = [
      headers.join(','),
      ...parsedRows.map(r => [
        escapeCsv(r.businessName),
        escapeCsv(r.doctorName),
        escapeCsv(r.niche),
        escapeCsv(r.whatsApp),
        escapeCsv(r.phone),
        escapeCsv(r.city),
        escapeCsv(r.address),
        escapeCsv(r.generatedUrl || ''),
        escapeCsv(r.whatsappLink || ''),
        escapeCsv(r.generatedPitch || '')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Enriched_Outreach_Demos_${parsedRows.length}_Clinics.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy single pitch to clipboard
  const handleCopyPitch = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 border border-amber-500/30 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bulk 200+ Outreach Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Bulk CSV Website & Pitch Generator
            </h2>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl">
              Upload your CSV of 200–500 clinics or real estate agents. Instantly generate unique live preview URLs, tailored Roman Urdu WhatsApp pitches, and download the ready-to-blast spreadsheet.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {parsedRows.length > 0 && (
              <button
                onClick={handleDownloadEnrichedCSV}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Enriched CSV ({parsedRows.length})</span>
              </button>
            )}

            <button
              onClick={handleLoadSample}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Load 8 Sample Clinics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-5 py-3 text-xs font-bold flex items-center space-x-2 border-b-2 transition ${
            activeTab === 'upload'
              ? 'border-amber-400 text-amber-400 bg-amber-400/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload / Paste CSV</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`px-5 py-3 text-xs font-bold flex items-center space-x-2 border-b-2 transition ${
            activeTab === 'results'
              ? 'border-amber-400 text-amber-400 bg-amber-400/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Generated Results Table ({parsedRows.length})</span>
        </button>
      </div>

      {/* Tab 1: Upload & Paste */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drag & Drop Upload Zone */}
          <div className="bg-slate-900/80 border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition group">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Upload Your Leads CSV File</h3>
            <p className="text-slate-400 text-xs max-w-sm mb-6">
              Drop your .csv file here (with columns: Business Name, Doctor Name, WhatsApp, Phone, City, Niche).
            </p>
            <label className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl font-bold text-xs cursor-pointer shadow-lg shadow-amber-500/20 transition flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Choose CSV File from Computer</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Direct Raw Text Paste */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-slate-200 text-xs font-bold flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Or Paste CSV Text Directly</span>
                </label>
                <button
                  onClick={() => setCsvText(SAMPLE_CSV_DATA)}
                  className="text-[11px] text-amber-400 hover:underline"
                >
                  Insert Sample Headers
                </button>
              </div>
              <textarea
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder="Business Name,Doctor Name,Specialty / Niche,WhatsApp,Phone,City,Address,Tagline..."
                className="w-full h-44 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 font-mono text-xs focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setCsvText('')}
                className="text-xs text-slate-500 hover:text-slate-300 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>

              <button
                onClick={() => processCSVRows(csvText)}
                disabled={!csvText.trim() || isProcessing}
                className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Process & Generate All Demos</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Results Table */}
      {activeTab === 'results' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search by clinic or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
              {['all', 'dental', 'skin', 'eye', 'ortho', 'cardio', 'pet'].map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedNicheFilter(n)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                    selectedNicheFilter === n
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          {filteredRows.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No clinics found. Please upload or paste CSV data.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-3">#</th>
                    <th className="py-3 px-3">Clinic & Doctor</th>
                    <th className="py-3 px-3">Niche</th>
                    <th className="py-3 px-3">City / Area</th>
                    <th className="py-3 px-3">WhatsApp / Phone</th>
                    <th className="py-3 px-3 text-center">Live Preview</th>
                    <th className="py-3 px-3 text-right">Outreach Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredRows.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-3 text-slate-500 font-mono">{idx + 1}</td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white flex items-center space-x-1.5">
                          <Building2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>{row.businessName}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">{row.doctorName}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-amber-300 border border-slate-700 uppercase">
                          {row.niche}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="text-slate-300">{row.city}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{row.address}</div>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-300">
                        <div>+{row.whatsApp}</div>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <a
                          href={row.generatedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-300 px-2.5 py-1 rounded-lg text-[11px] font-bold transition"
                        >
                          <span>Test Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <button
                            onClick={() => handleCopyPitch(row.id, row.generatedPitch || '')}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center space-x-1 border border-slate-700 transition"
                            title="Copy Roman Urdu Pitch"
                          >
                            {copiedId === row.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Pitch</span>
                              </>
                            )}
                          </button>

                          <a
                            href={row.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 shadow transition"
                            title="Send WhatsApp Direct"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
