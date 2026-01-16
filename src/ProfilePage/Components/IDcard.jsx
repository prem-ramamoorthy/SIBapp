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

      // --- CONFIGURATION FIX HERE ---
      const canvas = await window.html2canvas(cardRef.current, {
        useCORS: true,       // MUST be true
        allowTaint: false,   // MUST be false (or removed) to allow downloading
        scale: 3, 
        backgroundColor: '#f3f4f6', 
        logging: true,       // Kept true to see errors in console if it fails
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
      // More specific error message for you
      alert("Download failed. Check the Console (F12) for 'Access to image' errors. If you are on localhost, you MUST add localhost to cors.json.");
    } finally {
      setDownloading(false);
    }
  };

  // --- Data Mapping (Based on provided JSON) ---
  
  // 1. Basic Identity
  const displayName = data?.display_name || data?.user?.username || "Member Name";
  const memberId = data?.membership?.idno || "SIB-MEM";
  
  // 2. Image Logic with CACHE BUSTER
  let avatarUrl = "https://via.placeholder.com/200?text=No+Image";
  
  if (data?.profile_image_url) {
    let rawUrl = "";
    if (data.profile_image_url.startsWith("http")) {
      rawUrl = data.profile_image_url;
    } else {
      rawUrl = `${import.meta.env.VITE_BACKEND_SERVER}${data.profile_image_url}`;
    }

    // APPEND TIMESTAMP to force browser to fetch new CORS headers
    // We check if the URL already has a '?' query string
    const separator = rawUrl.includes('?') ? '&' : '?';
    avatarUrl = `${rawUrl}${separator}t=${new Date().getTime()}`;
  }

  // 3. Contact Info
  const phone = data?.company_phone || "N/A";
  const email = data?.company_email || data?.user?.email || "N/A";
  const address = data?.company_address || data?.personal_address || "Address not provided";
  
  // 4. Details
  const companyName = data?.company_name || "Company Name";
  const bloodGroup = data?.blood_group || "";
  const dob = data?.dob ? new Date(data.dob).toLocaleDateString() : "N/A";
  const weddingDate = data?.wedding_date ? new Date(data.wedding_date).toLocaleDateString() : "N/A";
  const vagaiyara = data?.vagai_category || "N/A";
  const kuladeivam = data?.kuladeivam || "N/A";

  // 5. Vertical
  let vertical = "General";
  if (data?.vertical_names && data.vertical_names.length > 0) {
    vertical = data.vertical_names.join(", ");
  }

  // 6. Chapter Code Logic
  const chapterName = data?.chaptername || "SIB Chapter";
  const chapterCode = chapterName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();

  // Styles
  const cardDimensions = "w-[320px] h-[520px]";
  const bodyPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col my-auto">

        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">Member ID Preview</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Preview Area */}
        <div className="flex-1 p-8 bg-gray-100 flex justify-center items-start overflow-auto">
          
          <div 
            ref={cardRef}
            className="flex flex-wrap justify-center gap-8 bg-gray-100 p-4" 
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            
            {/* ================= CARD FRONT ================= */}
            <div className={`${cardDimensions} bg-white relative flex flex-col shadow-2xl overflow-hidden rounded-xl border border-gray-200 shrink-0`}>
              
              {/* Premium Header Background */}
              <div className="h-[40%] bg-neutral-900 relative flex flex-col items-center overflow-hidden">
                 {/* Decorative background elements */}
                 <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-neutral-900"></div>
                 
                 {/* Org Name - Top */}
                 <h1 className="relative z-10 text-white/90 font-black text-[10px] tracking-[0.3em] uppercase mt-3 ">
                   Sengunthar In Business
                 </h1>

                 {/* Logo - Large and Centered - Added padding bottom to ensure it clears the profile pic cut */}
                 <div className="mb-60 relative z-10 w-18 h-18 flex items-center justify-center">
                    <img src='../logo.webp' alt="SIB Logo" className="w-full h-full object-contain drop-shadow-2xl" />
                 </div>
                 
                 {/* Gold accent line at bottom of header */}
                 <div className="absolute bottom-0 w-full h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>
              </div>

              {/* Profile Image Area - Overlapping */}
              <div className="relative -mt-14 flex justify-center z-20">
                 <div className="relative group">
                   {/* Image Container */}
                   <div className="  w-32 h-32 rounded-xl border-[4px] border-white shadow-2xl bg-gray-200 overflow-hidden relative">
                      <img 
                        src={avatarUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                        // REQUIRED: This asks for the CORS permission from the server
                        crossOrigin="anonymous"
                        onError={() => setImgError(true)}
                      />
                      {/* Glossy overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none"></div>
                   </div>
                   {/* Blood Group Badge - ROUNDED FULL as requested */}
                   {bloodGroup && (
                     <div className="absolute -bottom-1 -right-3 bg-gradient-to-br from-red-600 to-red-800 text-white w-7 h-7 flex items-center justify-center rounded-full shadow-lg border-2 border-white transform rotate-0 z-30">
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
                    <span className="font-mono font-bold text-red-700 text-sm tracking-widest border-b-2 border-red-100 pb-0.5">
                      {memberId}
                    </span>
                 </div>

                 {/* Display Name */}
                 <h2 className="text-xl font-black text-gray-900 uppercase leading-none tracking-tight mb-2 drop-shadow-sm line-clamp-2 min-h-[1.5em] flex items-center justify-center">
                   {displayName}
                 </h2>

                 {/* Vertical Pill */}
                 <span className="inline-block bg-neutral-900 text-white px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-4 shadow-sm max-w-full truncate">
                    {vertical}
                 </span>

                 {/* Details Block */}
                 <div className="w-full space-y-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-sm">
                    {/* Company */}
                    <div className="flex flex-col items-center">
                       <span className="text-[8px] uppercase text-gray-400 font-extrabold tracking-widest mb-0.5">Company</span>
                       <p className="font-bold text-gray-800 text-xs leading-tight line-clamp-2">{companyName}</p>
                    </div>

                    {/* Divider */}
                    <div className="w-1/2 h-px bg-gray-200 mx-auto"></div>

                    {/* Contact */}
                    <div className="flex flex-col items-center">
                       <span className="text-[8px] uppercase text-gray-400 font-extrabold tracking-widest mb-0.5">Contact</span>
                       <div className="flex items-center gap-2 text-gray-800 font-bold bg-gray-50 px-3 py-1 rounded-md">
                          <Phone size={12} className="text-red-600 fill-red-600" />
                          <span className="tracking-wide text-xs">{phone}</span>
                       </div>
                    </div>
                 </div>

                 {/* Chapter Footer */}
                 <div className="mt-auto w-full pt-2 flex justify-between items-end">
                    <div className="text-left pl-1">
                       <span className="block text-[8px] text-gray-400 uppercase font-extrabold tracking-widest">Chapter</span>
                       <span className="text-3xl font-black text-gray-300 leading-none select-none">{chapterCode}</span>
                    </div>
                    {/* SIB Logo small watermark */}
                    <div className="opacity-10 w-10 h-10">
                       <img src="../logo.webp" alt="" className="w-full h-full object-contain grayscale" />
                    </div>
                 </div>
              </div>
            </div>

            {/* ================= CARD BACK ================= */}
            <div className={`${cardDimensions} bg-white relative flex flex-col shadow-2xl overflow-hidden rounded-xl border border-gray-200 shrink-0`}>
              
              {/* Back Header */}
              <div className="bg-neutral-900 h-16 relative flex items-center justify-between px-6 overflow-hidden">
                 {/* Diagonal stripe decoration */}
                 <div className="absolute top-0 right-10 w-20 h-full bg-white/5 skew-x-[-20deg]"></div>
                 
                 <div className="relative z-10">
                    <h2 className="text-white font-bold text-lg tracking-wide">Details</h2>
                    <div className="h-0.5 w-8 bg-yellow-500 mt-1"></div>
                 </div>
                 
                 <div className="relative z-10 w-8 h-8 bg-white rounded-full p-1 flex items-center justify-center">
                    <img src='../logo.webp' className="w-full h-full object-contain" />
                 </div>
              </div>

              {/* Back Content - Clean List */}
              <div className="flex-1 p-6 flex flex-col gap-4 bg-white relative">
                 {/* Background Pattern */}
                 <div className="absolute inset-0 opacity-30" style={{ backgroundImage: bodyPattern }}></div>

                 {/* Info Grid */}
                 <div className="relative z-10 space-y-4">
                    
                    {/* Vagaiyara */}
                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                       <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Vagaiyara</span>
                       <span className="text-xs font-bold text-gray-800 block tracking-wide">{vagaiyara}</span>
                    </div>

                    {/* Kuladeivam */}
                    <div className="pl-2 border-l-4 border-yellow-500">
                       <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Kuladeivam</span>
                       <span className="text-xs font-bold text-gray-800 block leading-relaxed">{kuladeivam}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                       {/* DOB */}
                       <div>
                          <div className="flex items-center gap-1.5 mb-1 text-red-600">
                             <Calendar size={12} />
                             <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest text-black">DOB</span>
                          </div>
                          <span className="text-xs font-bold text-gray-800 pl-1">{dob}</span>
                       </div>
                       {/* Wedding */}
                       <div>
                          <div className="flex items-center gap-1.5 mb-1 text-red-600">
                             <Calendar size={12} />
                             <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest text-black">Wedding</span>
                          </div>
                          <span className="text-xs font-bold text-gray-800 pl-1">{weddingDate}</span>
                       </div>
                    </div>

                    {/* Email */}
                    <div className="pt-2 border-t border-dashed border-gray-200">
                       <div className="flex items-center gap-1.5 mb-1">
                          <Mail size={12} className="text-gray-400" />
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Email</span>
                       </div>
                       <span className="text-xs font-bold text-gray-800 break-all">{email}</span>
                    </div>

                    {/* Address */}
                    <div>
                       <div className="flex items-center gap-1.5 mb-2">
                          <MapPin size={12} className="text-red-600" />
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Address</span>
                       </div>
                       <p className="text-[10px] text-gray-600 leading-relaxed font-medium bg-gray-50 p-2 rounded border border-gray-100 line-clamp-3">
                          {address}
                       </p>
                    </div>
                 </div>

              </div>

              {/* Back Footer */}
              <div className="bg-neutral-900 py-2 px-6">
                 <div className="flex items-center justify-center gap-2 text-white/60">
                    <Globe size={10} />
                    <span className="text-[8px] font-semibold tracking-wider uppercase">www.senguntharinbusiness.com</span>
                 </div>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer Actions */}
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