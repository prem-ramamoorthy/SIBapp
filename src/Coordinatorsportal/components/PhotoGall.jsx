import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon, 
  Plus, Trash2, Upload, FolderPlus, ArrowLeft, Loader2, AlertCircle, CheckCircle2,
  LayoutDashboard, Calendar
} from 'lucide-react';

// Importing the JSON data directly
import initialData from './data.json';

// NOTE: Replace this with your actual backend server URL.
// We use a fallback to localhost to ensure the code compiles if the env var is missing.
const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER; 
const UPLOAD_API_URL = `${BACKEND_SERVER_URL}/auth/upload/photo`;

// --- UI COMPONENTS ---

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-top-2 fade-in duration-300 ${
      type === 'error' ? 'bg-red-900/90 border-red-700 text-white' : 'bg-emerald-900/90 border-emerald-700 text-white'
    }`}>
      {type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75"><X size={14} /></button>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, isDestructive = false }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-sm p-6 shadow-2xl scale-100">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 mb-6">{message}</p>
        <div className="flex space-x-3">
          <button 
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors font-medium ${
              isDestructive ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// 1. Lightbox Component
const Lightbox = ({ isOpen, image, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
      >
        <X size={32} />
      </button>

      {hasPrev && (
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50 hidden md:block"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {hasNext && (
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50 hidden md:block"
        >
          <ChevronRight size={40} />
        </button>
      )}

      <div 
        className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
        onClick={onClose}
      >
        <img 
          src={image.src} 
          alt="Gallery Image"
          className="max-w-full max-h-full object-contain shadow-2xl rounded-sm select-none"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

// 2. Album Card Component
const AlbumCard = ({ album, onClick, onDelete }) => (
  <div 
    onClick={onClick}
    className="group relative aspect-square bg-neutral-800 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-neutral-700"
  >
    {album.coverImg ? (
      <img 
        src={album.coverImg} 
        alt={album.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-neutral-600 bg-neutral-800">
        <ImageIcon size={48} />
      </div>
    )}
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
      <h3 className="text-white font-bold text-xl mb-1">{album.title}</h3>
      <div className="flex items-center text-neutral-300 text-sm mb-2">
        <Calendar size={14} className="mr-1.5 opacity-75" />
        {album.date}
      </div>
      <div className="flex items-center text-xs text-neutral-400">
        <span className="bg-neutral-700/50 px-2 py-1 rounded backdrop-blur-sm">
          {album.photos ? album.photos.length : 0} Photos
        </span>
      </div>
    </div>

    <button
      onClick={(e) => { e.stopPropagation(); onDelete(album); }}
      className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
      title="Delete Album"
    >
      <Trash2 size={16} />
    </button>
  </div>
);

// --- MAIN APP ---
export default function PhotoGallery({ onBack }) {
  // Initialize state directly from imported JSON
  // Note: Changes made here (like creating albums or uploading photos) 
  // will only persist in memory for the session, as the browser cannot 
  // overwrite the 'data.json' file on the disk.
  const [albums, setAlbums] = useState(initialData);

  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  
  // UI State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Toasts & Modals
  const [toasts, setToasts] = useState([]);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: "", message: "", onConfirm: () => {} });

  // Forms
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const fileInputRef = useRef(null);

  // --- HELPERS ---
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openConfirm = (title, message, action, isDestructive = false) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      isDestructive,
      onConfirm: () => {
        action();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // --- ACTIONS ---

  const handleCreateAlbum = (e) => {
    e.preventDefault();
    if (!newAlbumTitle.trim()) return;

    // Create album matching the new JSON structure
    const newAlbum = {
      id: Date.now(),
      title: newAlbumTitle,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      coverImg: null,
      photos: []
    };

    setAlbums(prev => [newAlbum, ...prev]);
    setNewAlbumTitle("");
    setIsCreatingAlbum(false);
    addToast("Album created successfully");
  };

  const handleDeleteAlbum = (albumToDelete) => {
    openConfirm(
      "Delete Album",
      `Are you sure you want to delete "${albumToDelete.title}"? This action cannot be undone.`,
      () => {
        setAlbums(prev => prev.filter(e => e.id !== albumToDelete.id));
        if (selectedAlbumId === albumToDelete.id) setSelectedAlbumId(null);
        addToast("Album deleted");
      },
      true 
    );
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedAlbumId) return;

    setIsUploading(true);

    try {
      const newPhotos = [];
      let successCount = 0;
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('photo', file);
        
        try {
          // Calls your backend which returns { url: '...' }
          const response = await fetch(UPLOAD_API_URL, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Upload failed');
          }
          
          const data = await response.json();
          const imageUrl = data.url; 
          
          if (!imageUrl) throw new Error("No URL returned from backend");

          // Convert backend response to match our new photo structure
          const photoObj = {
            src: imageUrl,
            width: 1000, 
            height: 800
          };
          newPhotos.push(photoObj);
          successCount++;
        } catch (innerErr) {
          console.error(`Failed to upload ${file.name}:`, innerErr);
        }
      }

      if (newPhotos.length > 0) {
        setAlbums(prevAlbums => prevAlbums.map(alb => {
          if (alb.id === selectedAlbumId) {
            const updatedPhotos = [...(alb.photos || []), ...newPhotos];
            // Use first image as cover if none exists
            const updatedCover = alb.coverImg || newPhotos[0].src;
            return { ...alb, photos: updatedPhotos, coverImg: updatedCover };
          }
          return alb;
        }));
        
        addToast(`Uploaded ${successCount} photo(s)`);
      } else {
        addToast("No photos were uploaded successfully", "error");
      }

    } catch (err) {
      console.error("Upload process error:", err);
      addToast("Upload process failed", "error");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeletePhoto = (photoToDelete) => {
    openConfirm(
      "Delete Photo",
      "Are you sure you want to remove this photo?",
      () => {
        setAlbums(prevAlbums => prevAlbums.map(alb => {
          if (alb.id === selectedAlbumId) {
            const updatedPhotos = alb.photos.filter(p => p.src !== photoToDelete.src);
            // Update cover if we deleted the current cover
            let updatedCover = alb.coverImg;
            if (alb.coverImg === photoToDelete.src) {
               updatedCover = updatedPhotos.length > 0 ? updatedPhotos[0].src : null;
            }
            return { ...alb, photos: updatedPhotos, coverImg: updatedCover };
          }
          return alb;
        }));

        if (lightboxOpen) setLightboxOpen(false);
        addToast("Photo deleted");
      },
      true
    );
  };

  // --- HELPER ---
  const selectedAlbum = albums.find(a => a.id === selectedAlbumId);
  const currentPhotos = selectedAlbum ? (selectedAlbum.photos || []) : [];

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1 < currentPhotos.length ? prev + 1 : 0));
  }, [currentPhotos.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 >= 0 ? prev - 1 : currentPhotos.length - 1));
  }, [currentPhotos.length]);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans selection:bg-emerald-500/30">
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col space-y-2 pointer-events-none">
        <div className="pointer-events-auto flex flex-col space-y-2">
          {toasts.map(toast => (
            <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        isDestructive={confirmModal.isDestructive}
      />

      {/* HEADER */}
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setSelectedAlbumId(null)}>
            {/* BACK BUTTON */}
            {onBack && (
              <button 
                onClick={onBack}
                className="mr-2 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
                title="Back to Portal"
              >
                <LayoutDashboard size={20} />
              </button>
            )}
            
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <ImageIcon className="text-emerald-500" size={20} />
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-white">Gallery</h1>
          </div>
          
          <div className="flex items-center space-x-4">
             {selectedAlbumId ? (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? <Loader2 className="animate-spin" size={16}/> : <Upload size={16} />}
                  <span>Upload Photos</span>
                </button>
             ) : (
                <button 
                  onClick={() => setIsCreatingAlbum(true)}
                  className="flex items-center space-x-2 bg-neutral-100 hover:bg-white text-neutral-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <Plus size={16} />
                  <span>New Album</span>
                </button>
             )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW: ALBUM LIST */}
        {!selectedAlbumId && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Albums & Collections</h2>
                <p className="text-neutral-400">Select an album to view or manage photos.</p>
             </div>

             {albums.length === 0 ? (
               <div className="text-center py-20 border-2 border-dashed border-neutral-800 rounded-xl">
                 <FolderPlus className="mx-auto h-12 w-12 text-neutral-600 mb-4" />
                 <h3 className="text-lg font-medium text-white">No albums yet</h3>
                 <p className="text-neutral-500 mt-1">Create your first album to start uploading photos.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {albums.map(album => (
                   <AlbumCard 
                     key={album.id} 
                     album={album} 
                     onClick={() => setSelectedAlbumId(album.id)}
                     onDelete={handleDeleteAlbum}
                   />
                 ))}
               </div>
             )}
          </div>
        )}

        {/* VIEW: SINGLE ALBUM GALLERY */}
        {selectedAlbumId && selectedAlbum && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Gallery Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div className="flex items-start space-x-4">
                <button 
                  onClick={() => setSelectedAlbumId(null)}
                  className="mt-1 p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400 hover:text-white"
                >
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedAlbum.title}</h2>
                  <div className="flex items-center text-neutral-400 mt-1 text-sm">
                     <Calendar size={14} className="mr-1.5" />
                     {selectedAlbum.date}
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-neutral-500 font-mono">
                {currentPhotos.length} items
              </div>
            </div>

            {/* Photos Grid */}
            {currentPhotos.length === 0 ? (
               <div className="text-center py-20 bg-neutral-800/30 rounded-xl">
                 <div className="inline-flex items-center justify-center p-4 bg-neutral-800 rounded-full mb-4">
                    <Upload className="h-8 w-8 text-neutral-500" />
                 </div>
                 <h3 className="text-lg font-medium text-white">Album is empty</h3>
                 <p className="text-neutral-500 mt-1 mb-4">Upload photos to get started.</p>
                 <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-emerald-500 hover:text-emerald-400 font-medium"
                 >
                   Select files from computer
                 </button>
               </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentPhotos.map((photo, index) => (
                  <div 
                    key={index}
                    className="group relative aspect-square bg-neutral-800 rounded-lg overflow-hidden cursor-zoom-in"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setLightboxOpen(true);
                    }}
                  >
                    <img 
                      src={photo.src} 
                      alt="Gallery Item"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <ZoomIn className="text-white drop-shadow-lg" size={24} />
                    </div>

                    {/* Delete Image Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeletePhoto(photo); }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                      title="Delete Image"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* HIDDEN FILE INPUT */}
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* MODAL: CREATE ALBUM */}
      {isCreatingAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Create New Album</h3>
              <button onClick={() => setIsCreatingAlbum(false)} className="text-neutral-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateAlbum} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Album Title</label>
                <input 
                  type="text" 
                  value={newAlbumTitle}
                  onChange={(e) => setNewAlbumTitle(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="e.g., Summer Vacation 2024"
                  autoFocus
                />
              </div>
              
              <div className="pt-2 flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsCreatingAlbum(false)}
                  className="flex-1 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!newAlbumTitle.trim()}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      <Lightbox 
        isOpen={lightboxOpen}
        image={currentPhotos[currentImageIndex]}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
        hasNext={currentPhotos.length > 1}
        hasPrev={currentPhotos.length > 1}
      />
    </div>
  );
}