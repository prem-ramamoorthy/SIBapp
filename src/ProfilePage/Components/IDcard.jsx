import React, { useRef, useState, useEffect } from 'react';
import { X, Download, Phone, Calendar, Star, MapPin, Building2 } from 'lucide-react';

const IdCardModal = ({ isOpen, onClose, profileData , idno }) => {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [libLoaded, setLibLoaded] = useState(false);
  const [imgError, setImgError] = useState(false); 

  
  const data = Array.isArray(profileData) ? profileData[0] : (profileData || {});


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
            img.onerror = resolve; // Continue even if image fails
        });
      }));

      const canvas = await window.html2canvas(cardRef.current, {
        useCORS: true, 
        allowTaint: true, // Allow rendering even if tainted (might block download if strictly tainted)
        scale: 3, 
        backgroundColor: '#ffffff',
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${data?.user?.username || 'Member'}_ID.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download ID card:", err);
      // Fallback message if CORS completely blocks the canvas export
      alert("Could not generate image due to browser security (CORS). Please take a screenshot manually.");
    } finally {
      setDownloading(false);
    }
  };

  // --- Data Parsing & Formatting ---
  const username = data?.user?.username || "Member Name";
  const membershipId = data?.vagai_category ? `SIB-${data.vagai_category.substring(0,3).toUpperCase()}` : "SIB-MEM"; 

  // Image URL Logic
  let avatarUrl = "https://via.placeholder.com/200?text=No+Image";
  if (data?.profile_image_url) {
    if (data.profile_image_url.startsWith("http")) {
      avatarUrl = data.profile_image_url;
    } else {
      // Use env variable as requested without modification
      avatarUrl = `${import.meta.env.VITE_BACKEND_SERVER}${data.profile_image_url}`;
    }
  }

  // Fallback for missing fields
  const mobile = data?.company_phone || data?.user?.phone || "N/A";
  const company = data?.company_name || "Company Name";
  
  // Handle verticals array or string
  let vertical = "Vertical";
  if (Array.isArray(data?.verticals) && data.verticals.length > 0) {
     vertical = data.verticals.map(v => v.vertical_name).join(", ");
  } else if (Array.isArray(data?.vertical_names)) {
     vertical = data.vertical_names.join(", ");
  } else if (data?.vertical_names) {
     vertical = data.vertical_names;
  }

  const dob = data?.dob ? data.dob.split('T')[0] : "N/A";
  const bloodGroup = data?.blood_group || "";
  const kuladeivam = data?.kuladeivam || "N/A";
  const address = data?.company_address || "";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">Member ID Preview</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Preview Area */}
        <div className="flex-1 p-6 bg-gray-100 flex justify-center items-center overflow-auto">
          
          {/* ID CARD CONTAINER */}
          <div 
            ref={cardRef}
            className="w-[320px] h-[540px] bg-white relative flex flex-col shadow-2xl overflow-hidden shrink-0 border border-gray-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            
            {/* 1. Header Section */}
            <div className="relative h-[150px] bg-neutral-900 overflow-hidden flex flex-col items-center pt-5">
               {/* Decorative Shapes */}
               <div className="absolute top-0 left-0 w-24 h-24 bg-red-700 rounded-br-full opacity-90"></div>
               <div className="absolute top-0 right-0 w-32 h-full bg-yellow-500 transform skew-x-[-25deg] translate-x-16 border-l-4 border-white/10"></div>

               {/* Logo Area */}
               <div className="z-10 flex flex-col items-center">
                  <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-lg overflow-hidden">
                      <img src='../logo.webp' className="text-neutral-900" size={24} />
                  </div>
                  <h1 className="text-white font-black text-xl tracking-wider z-10 drop-shadow-md">Sengunthar In Business</h1>
               </div>
            </div>

            {/* 2. Profile Photo */}
            <div className="relative -mt-10 flex justify-center z-20">
               <div className="relative">
                  <div className="w-32 h-32 rounded-full border-[5px] border-white shadow-xl bg-gray-200 overflow-hidden relative">
                      {/* OPTIMIZED IMAGE LOADING:
                         We try to load with 'anonymous' first (better for downloads).
                         If that fails (CORS error), 'imgError' becomes true, and we remove the attribute so it displays visually.
                      */}
                      <img 
                        src={avatarUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        crossOrigin={imgError ? undefined : "anonymous"}
                        onError={() => setImgError(true)}
                      />
                  </div>
                  {/* Blood Group Badge */}
                  <div className="absolute bottom-1 right-1 bg-red-600 text-white w-9 h-9 flex items-center justify-center rounded-full border-[3px] border-white shadow-md z-30">
                     <span className="text-xs font-bold">{bloodGroup}</span>
                  </div>
               </div>
            </div>

            {/* 3. Primary Info */}
            <div className="text-center mt-3 px-4">
               <div className="text-red-600 font-mono font-bold text-sm tracking-wide mb-1">
                  {idno}
               </div>

               <h2 className="text-xl font-extrabold text-neutral-900 uppercase tracking-tight leading-none mb-2 line-clamp-1">
                 {username}
               </h2>

               <div className="flex flex-col items-center gap-1">
                 <span className="bg-yellow-400 text-neutral-900 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider max-w-full truncate">
                   {vertical}
                 </span>
                 <p className="text-xs text-gray-500 font-semibold truncate max-w-[90%]">{company}</p>
               </div>
            </div>

            {/* 4. Details Section */}
            <div className="px-5 mt-5 flex-1">
               <div className="bg-gray-50 rounded-xl border border-gray-100 p-3 shadow-sm">
                 
                 {/* Row 1: Phone & DOB */}
                 <div className="flex border-b border-gray-200 pb-2 mb-2">
                    <div className="flex-1 border-r border-gray-200 pr-2">
                      <div className="flex items-center gap-1.5 text-red-600 mb-0.5">
                         <Phone size={11} strokeWidth={3} />
                         <span className="text-[9px] font-bold uppercase text-gray-400">Phone</span>
                      </div>
                      <span className="text-xs font-bold text-gray-900 block truncate">{mobile}</span>
                    </div>

                    <div className="flex-1 pl-3">
                      <div className="flex items-center gap-1.5 text-red-600 mb-0.5">
                         <Calendar size={11} strokeWidth={3} />
                         <span className="text-[9px] font-bold uppercase text-gray-400">DOB</span>
                      </div>
                      <span className="text-xs font-bold text-gray-900 block">{dob}</span>
                    </div>
                 </div>

                 {/* Row 2: Kuladeivam */}
                 <div className="w-full">
                   <div className="flex items-center gap-1.5 text-red-600 mb-0.5">
                      <Star size={11} strokeWidth={3} />
                      <span className="text-[9px] font-bold uppercase text-gray-400">Kuladeivam</span>
                   </div>
                   <span className="text-xs font-bold text-gray-900 block break-words leading-snug line-clamp-2">
                     {kuladeivam}
                   </span>
                 </div>

               </div>
            </div>

            {/* 5. Address Footer */}
            {address && (
               <div className="px-6 pb-3 pt-1">
                  <div className="flex items-center gap-2 justify-center bg-neutral-900/5 py-1.5 px-3 rounded-lg">
                     <MapPin size={10} className="text-red-600 shrink-0" />
                     <p className="text-[9px] text-gray-600 text-center font-medium leading-tight line-clamp-2">
                        {address}
                     </p>
                  </div>
               </div>
            )}

            {/* Bottom Stripe */}
            <div className="h-2 w-full flex mt-auto">
               <div className="flex-1 bg-neutral-900"></div>
               <div className="w-16 bg-yellow-500"></div>
               <div className="w-4 bg-red-600"></div>
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
                <Download size={16} /> Download
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdCardModal;