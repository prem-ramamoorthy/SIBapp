import React, { useRef, useState, useEffect } from 'react';
import { X, Download, Phone, Calendar, MapPin, Mail, Globe } from 'lucide-react';

const IdCardModal = ({ isOpen, onClose, profileData }) => {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [libLoaded, setLibLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // robustly handle whether profileData is the direct object or an array
  const data = Array.isArray(profileData) ? profileData[0] : (profileData || {});

  // --- HTML2Canvas Loader ---
  useEffect(() => {
    if (typeof window !== 'undefined' && window.html2canvas) {
      setLibLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script.async = true;
    script.onload = () => setLibLoaded(true);
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  // Reset image error state when data changes
  useEffect(() => {
    setImgError(false);
  }, [data?._id]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!cardRef.current || !window.html2canvas) return;
    setDownloading(true);

    try {
      // Wait for images to render
      const images = cardRef.current.getElementsByTagName('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve; 
        });
      }));

      const canvas = await window.html2canvas(cardRef.current, {
        useCORS: true,       
        allowTaint: false,   
        scale: 3, 
        backgroundColor: '#f3f4f6', // Safe HEX color
        logging: true,
      });

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${data?.display_name || data?.user?.username || 'Member'}_ID_Card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download ID card:", err);
      alert("Download failed. See console for details.");
    } finally {
      setDownloading(false);
    }
  };

  // --- Data Mapping ---
  const displayName = data?.display_name || data?.user?.username || "Member Name";
  const memberId = data?.membership?.idno || "SIB-MEM";
  
  // Image Logic with CACHE BUSTER
  let avatarUrl = "https://via.placeholder.com/200?text=No+Image";
  if (data?.profile_image_url) {
    let rawUrl = "";
    if (data.profile_image_url.startsWith("http")) {
      rawUrl = data.profile_image_url;
    } else {
      rawUrl = `${import.meta.env.VITE_BACKEND_SERVER}${data.profile_image_url}`;
    }
    const separator = rawUrl.includes('?') ? '&' : '?';
    avatarUrl = `${rawUrl}${separator}t=${new Date().getTime()}`;
  }

  // Details
  const phone = data?.company_phone || "N/A";
  const email = data?.company_email || data?.user?.email || "N/A";
  const address = data?.company_address || data?.personal_address || "Address not provided";
  const companyName = data?.company_name || "Company Name";
  const bloodGroup = data?.blood_group || "";
  const dob = data?.dob ? new Date(data.dob).toLocaleDateString() : "N/A";
  const weddingDate = data?.wedding_date ? new Date(data.wedding_date).toLocaleDateString() : "N/A";
  const vagaiyara = data?.vagai_category || "N/A";
  const kuladeivam = data?.kuladeivam || "N/A";

  let vertical = "General";
  if (data?.vertical_names && data.vertical_names.length > 0) {
    vertical = data.vertical_names.join(", ");
  }

  const chapterName = data?.chaptername || "SIB Chapter";
  const chapterCode = chapterName.split(' ').map(word => word.charAt(0)).join('').toUpperCase();

  // --- SAFE STYLES (No OKLCH) ---
  // We use inline styles for colors to prevent html2canvas crashing on modern Tailwind variables
  const cardDimensions = "w-[320px] h-[520px]";
  const bodyPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col my-auto">

        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">Member ID Preview</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-8 bg-gray-100 flex justify-center items-start overflow-auto">
          
          <div 
            ref={cardRef}
            className="flex flex-wrap justify-center gap-8 bg-gray-100 p-4" 
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            
            {/* ================= CARD FRONT ================= */}
            <div 
              className={`${cardDimensions} relative flex flex-col shadow-2xl overflow-hidden rounded-xl border border-gray-200 shrink-0`}
              style={{ backgroundColor: '#ffffff' }} // SAFE HEX
            >
              
              {/* Header */}
              <div 
                className="h-[40%] relative flex flex-col items-center overflow-hidden"
                style={{ backgroundColor: '#171717' }} // SAFE HEX (neutral-900)
              >
                 {/* Decorative background elements (Replaced gradients with standard syntax) */}
                 <div 
                    className="absolute top-0 right-0 w-48 h-48 rounded-full blur-2xl transform translate-x-10 -translate-y-10"
                    style={{ background: 'linear-gradient(to bottom right, rgba(234, 179, 8, 0.2), transparent)' }}
                 ></div>
                 <div 
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ background: 'radial-gradient(ellipse at top, #262626, #171717)' }}
                 ></div>
                 
                 <h1 className="relative z-10 font-black text-[10px] tracking-[0.3em] uppercase mt-3" style={{ color: 'rgba(255,255,255,0.9)' }}>
                   Sengunthar In Business
                 </h1>

                 <div className="mb-60 relative z-10 w-18 h-18 flex items-center justify-center">
                    <img src='../logo.webp' alt="SIB Logo" className="w-full h-full object-contain drop-shadow-2xl" />
                 </div>
                 
                 {/* Gold accent line */}
                 <div 
                    className="absolute bottom-0 w-full h-1.5"
                    style={{ background: 'linear-gradient(to right, #ca8a04, #facc15, #ca8a04)' }}
                 ></div>
              </div>

              {/* Profile Image Area */}
              <div className="relative -mt-14 flex justify-center z-20">
                 <div className="relative group">
                   <div className="w-32 h-32 rounded-xl border-[4px] border-white shadow-2xl overflow-hidden relative" style={{ backgroundColor: '#e5e7eb' }}>
                      <img 
                        src={avatarUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                        crossOrigin="anonymous"
                        onError={() => setImgError(true)}
                      />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top right, rgba(0,0,0,0.1), transparent)' }}></div>
                   </div>
                   {/* Blood Group Badge */}
                   {bloodGroup && (
                     <div 
                        className="absolute -bottom-1 -right-3 text-white w-7 h-7 flex items-center justify-center rounded-full shadow-lg border-2 border-white transform rotate-0 z-30"
                        style={{ background: 'linear-gradient(to bottom right, #dc2626, #991b1b)' }}
                     >
                       <span className="text-[10px] font-black">{bloodGroup}</span>
                     </div>
                   )}
                 </div>
              </div>

              {/* Main Content Body */}
              <div 
                className="flex-1 flex flex-col items-center pt-2 px-5 pb-4 text-center relative"
                style={{ backgroundImage: bodyPattern }}
              >
                 {/* ID Number */}
                 <div className="mb-1 mt-1">
                    <span 
                        className="font-mono font-bold text-sm tracking-widest border-b-2 pb-0.5"
                        style={{ color: '#b91c1c', borderColor: '#fee2e2' }} // red-700, red-100
                    >
                      {memberId}
                    </span>
                 </div>

                 {/* Display Name */}
                 <h2 
                    className="text-xl font-black uppercase leading-none tracking-tight mb-2 drop-shadow-sm line-clamp-2 min-h-[1.5em] flex items-center justify-center"
                    style={{ color: '#111827' }} // gray-900
                 >
                   {displayName}
                 </h2>

                 {/* Vertical Pill */}
                 <span 
                    className="inline-block px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-4 shadow-sm max-w-full truncate"
                    style={{ backgroundColor: '#171717', color: '#ffffff' }}
                 >
                    {vertical}
                 </span>

                 {/* Details Block */}
                 <div 
                    className="w-full space-y-3 backdrop-blur-sm p-3 rounded-xl shadow-sm"
                    style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderColor: '#f3f4f6', borderWidth: '1px' }}
                 >
                    {/* Company */}
                    <div className="flex flex-col items-center">
                       <span className="text-[8px] uppercase font-extrabold tracking-widest mb-0.5" style={{ color: '#9ca3af' }}>Company</span>
                       <p className="font-bold text-xs leading-tight line-clamp-2" style={{ color: '#1f2937' }}>{companyName}</p>
                    </div>

                    <div className="w-1/2 h-px mx-auto" style={{ backgroundColor: '#e5e7eb' }}></div>

                    {/* Contact */}
                    <div className="flex flex-col items-center">
                       <span className="text-[8px] uppercase font-extrabold tracking-widest mb-0.5" style={{ color: '#9ca3af' }}>Contact</span>
                       <div className="flex items-center gap-2 font-bold px-3 py-1 rounded-md" style={{ backgroundColor: '#f9fafb', color: '#1f2937' }}>
                          <Phone size={12} style={{ color: '#dc2626', fill: '#dc2626' }} />
                          <span className="tracking-wide text-xs">{phone}</span>
                       </div>
                    </div>
                 </div>

                 {/* Chapter Footer */}
                 <div className="mt-auto w-full pt-2 flex justify-between items-end">
                    <div className="text-left pl-1">
                       <span className="block text-[8px] uppercase font-extrabold tracking-widest" style={{ color: '#9ca3af' }}>Chapter</span>
                       <span className="text-3xl font-black leading-none select-none" style={{ color: '#d1d5db' }}>{chapterCode}</span>
                    </div>
                    <div className="opacity-10 w-10 h-10">
                       <img src="../logo.webp" alt="" className="w-full h-full object-contain grayscale" />
                    </div>
                 </div>
              </div>
            </div>

            {/* ================= CARD BACK ================= */}
            <div 
                className={`${cardDimensions} relative flex flex-col shadow-2xl overflow-hidden rounded-xl border border-gray-200 shrink-0`}
                style={{ backgroundColor: '#ffffff' }}
            >
              
              {/* Back Header */}
              <div 
                className="h-16 relative flex items-center justify-between px-6 overflow-hidden"
                style={{ backgroundColor: '#171717' }}
              >
                 <div className="absolute top-0 right-10 w-20 h-full skew-x-[-20deg]" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}></div>
                 
                 <div className="relative z-10">
                    <h2 className="font-bold text-lg tracking-wide" style={{ color: '#ffffff' }}>Details</h2>
                    <div className="h-0.5 w-8 mt-1" style={{ backgroundColor: '#eab308' }}></div>
                 </div>
                 
                 <div className="relative z-10 w-8 h-8 rounded-full p-1 flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
                    <img src='../logo.webp' className="w-full h-full object-contain" />
                 </div>
              </div>

              {/* Back Content */}
              <div className="flex-1 p-6 flex flex-col gap-4 relative" style={{ backgroundColor: '#ffffff' }}>
                 <div className="absolute inset-0 opacity-30" style={{ backgroundImage: bodyPattern }}></div>

                 <div className="relative z-10 space-y-4">
                    
                    {/* Vagaiyara */}
                    <div className="p-2.5 rounded-lg border" style={{ backgroundColor: '#f9fafb', borderColor: '#f3f4f6' }}>
                       <span className="text-[8px] font-bold uppercase tracking-widest block mb-1" style={{ color: '#9ca3af' }}>Vagaiyara</span>
                       <span className="text-xs font-bold block tracking-wide" style={{ color: '#1f2937' }}>{vagaiyara}</span>
                    </div>

                    {/* Kuladeivam */}
                    <div className="pl-2 border-l-4" style={{ borderColor: '#eab308' }}>
                       <span className="text-[8px] font-bold uppercase tracking-widest block mb-0.5" style={{ color: '#9ca3af' }}>Kuladeivam</span>
                       <span className="text-xs font-bold block leading-relaxed" style={{ color: '#1f2937' }}>{kuladeivam}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                       {/* DOB */}
                       <div>
                          <div className="flex items-center gap-1.5 mb-1" style={{ color: '#dc2626' }}>
                             <Calendar size={12} />
                             <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: '#000000' }}>DOB</span>
                          </div>
                          <span className="text-xs font-bold pl-1" style={{ color: '#1f2937' }}>{dob}</span>
                       </div>
                       {/* Wedding */}
                       <div>
                          <div className="flex items-center gap-1.5 mb-1" style={{ color: '#dc2626' }}>
                             <Calendar size={12} />
                             <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: '#000000' }}>Wedding</span>
                          </div>
                          <span className="text-xs font-bold pl-1" style={{ color: '#1f2937' }}>{weddingDate}</span>
                       </div>
                    </div>

                    {/* Email */}
                    <div className="pt-2 border-t border-dashed" style={{ borderColor: '#e5e7eb' }}>
                       <div className="flex items-center gap-1.5 mb-1">
                          <Mail size={12} style={{ color: '#9ca3af' }} />
                          <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>Email</span>
                       </div>
                       <span className="text-xs font-bold break-all" style={{ color: '#1f2937' }}>{email}</span>
                    </div>

                    {/* Address */}
                    <div>
                       <div className="flex items-center gap-1.5 mb-2">
                          <MapPin size={12} style={{ color: '#dc2626' }} />
                          <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>Address</span>
                       </div>
                       <p 
                          className="text-[10px] leading-relaxed font-medium p-2 rounded border line-clamp-3"
                          style={{ color: '#4b5563', backgroundColor: '#f9fafb', borderColor: '#f3f4f6' }}
                       >
                          {address}
                       </p>
                    </div>
                 </div>
              </div>

              {/* Back Footer */}
              <div className="py-2 px-6" style={{ backgroundColor: '#171717' }}>
                 <div className="flex items-center justify-center gap-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <Globe size={10} />
                    <span className="text-[8px] font-semibold tracking-wider uppercase">www.senguntharinbusiness.com</span>
                 </div>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t bg-gray-50 rounded-b-xl flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Close
          </button>
          <button 
            onClick={handleDownload}
            disabled={downloading || !libLoaded}
            className="flex-1 py-2.5 bg-neutral-900 text-white font-bold rounded-lg hover:bg-neutral-800 shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {downloading ? "Generating..." : (
              <>
                <Download size={16} /> Download ID Card
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdCardModal;