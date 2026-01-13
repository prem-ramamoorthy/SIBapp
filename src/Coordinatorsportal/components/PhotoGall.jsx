import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon, 
  Plus, Trash2, Upload, FolderPlus, ArrowLeft, Loader2, AlertCircle, CheckCircle2,
  Calendar, ArrowLeftIcon, Star, GripHorizontal, Save
} from 'lucide-react';

const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER; 
const UPLOAD_API_URL = `${BACKEND_SERVER_URL}/auth/upload/photo`;
const GALLERY_API_URL = `${BACKEND_SERVER_URL}/gallery/all`;
const GALLERY_CREATE_URL = `${BACKEND_SERVER_URL}/gallery/upload`;
const GALLERY_ADD_PHOTOS_URL = (eventId) => `${BACKEND_SERVER_URL}/gallery/add-photos/${eventId}`;
const GALLERY_DELETE_PHOTO_URL = (eventId) => `${BACKEND_SERVER_URL}/gallery/delete-photo/${eventId}`;
const GALLERY_DELETE_ALBUM_URL = (eventId) => `${BACKEND_SERVER_URL}/gallery/${eventId}`;

// Updated Route for updating cover image
const GALLERY_UPDATE_COVER_URL = (id) => `${BACKEND_SERVER_URL}/gallery/updatecoverimage/${id}`;

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

// --- UPLOAD PROGRESS BAR ---
const UploadProgress = ({ progress, currentFile, totalFiles }) => {
  if (progress === 0 && !currentFile) return null;
  
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] w-full max-w-md px-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-white flex items-center">
            <Loader2 className="animate-spin mr-2 h-4 w-4 text-emerald-500" />
            Uploading...
          </span>
          <span className="text-xs text-neutral-400 font-mono">
            {Math.round(progress)}%
          </span>
        </div>
        
        {/* Progress Track */}
        <div className="w-full bg-neutral-800 rounded-full h-2 mb-2 overflow-hidden">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-neutral-500">
           <span>{currentFile}</span>
           <span>{totalFiles} files total</span>
        </div>
      </div>
    </div>
  );
};

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

const AlbumCard = ({ 
  album, 
  onClick, 
  onDelete, 
  onLongPress, 
  isReordering,
  onDragStart,
  onDragEnter,
  onDragEnd,
  index
}) => {
  const longPressTimer = useRef(null);

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      onLongPress(album.id);
    }, 800); // 800ms long press
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  return (
    <div 
      draggable={isReordering}
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onClick={isReordering ? undefined : onClick}
      className={`group relative aspect-square bg-neutral-800 rounded-lg overflow-hidden shadow-lg border border-neutral-700 transition-all duration-300 
        ${isReordering ? 'cursor-move ring-2 ring-emerald-500 animate-pulse scale-95' : 'cursor-pointer hover:shadow-xl hover:-translate-y-1'}
      `}
    >
      {album.coverImg ? (
        <img 
          src={album.coverImg} 
          alt={album.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isReordering ? 'opacity-60' : 'group-hover:scale-110 opacity-80 group-hover:opacity-100'}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-600 bg-neutral-800">
          <ImageIcon size={48} />
        </div>
      )}
      
      {/* Overlay Content */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 ${isReordering ? 'pointer-events-none' : ''}`}>
        <h3 className="text-white font-bold text-xl mb-1 truncate">{album.title}</h3>
        <div className="flex items-center text-neutral-300 text-sm mb-2">
          <Calendar size={14} className="mr-1.5 opacity-75" />
          {album.date && (new Date(album.date)).toLocaleDateString()}
        </div>
        <div className="flex items-center text-xs text-neutral-400">
          <span className="bg-neutral-700/50 px-2 py-1 rounded backdrop-blur-sm">
            {album.photos ? album.photos.length : 0} Photos
          </span>
        </div>
      </div>

      {/* Delete Button (Hidden during reorder) */}
      {!isReordering && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(album); }}
          className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
          title="Delete Album"
        >
          <Trash2 size={16} />
        </button>
      )}

      {/* Reorder Indicator */}
      {isReordering && (
        <div className="absolute top-2 right-2 p-2 bg-emerald-500/80 text-white rounded-full">
          <GripHorizontal size={20} />
        </div>
      )}
    </div>
  );
};

export default function PhotoGallery({ onBack }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // Upload Progress State
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCurrentFile, setUploadCurrentFile] = useState("");
  const [uploadTotalFilesCount, setUploadTotalFilesCount] = useState(0);

  const [newAlbumDate, setNewAlbumDate] = useState("");
  
  const [toasts, setToasts] = useState([]);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: "", message: "", onConfirm: () => {} });

  // Reordering States
  const [isReordering, setIsReordering] = useState(false);
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(GALLERY_API_URL , { method: 'GET' , credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch gallery data");
        return res.json();
      })
      .then(data => {
        const normalized = (data || []).map(album => ({
          id: album._id || album.id,
          title: album.title,
          date: album.date,
          coverImg: album.coverImg,
          photos: (album.photos || []).map(url => ({
            src: url,
            width: 1000,
            height: 800
          }))
        }));
        setAlbums(normalized);
      })
      .catch(() => {
        setAlbums([]);
        addToast("Failed to load gallery data", "error");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

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

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!newAlbumTitle.trim()) return;

    const payload = {
      title: newAlbumTitle,
      date: newAlbumDate ? new Date(newAlbumDate).toISOString() : "",
      coverImg: "",
      photos: []
    };

    try {
      const res = await fetch(GALLERY_CREATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to create album");
      const album = await res.json();

      const normalized = {
        id: album._id,
        title: album.title,
        date: album.date,
        coverImg: album.coverImg,
        photos: (album.photos || []).map(url => ({
          src: url,
          width: 1000,
          height: 800
        }))
      };

      setAlbums(prev => [normalized, ...prev]);
      setNewAlbumTitle("");
      setNewAlbumDate("");
      setIsCreatingAlbum(false);
      addToast("Album created successfully");
    } catch (err) {
      console.error("Create album error:", err);
      addToast("Failed to create album", "error");
    }
  };

  const handleDeleteAlbum = (albumToDelete) => {
    openConfirm(
      "Delete Album",
      `Are you sure you want to delete "${albumToDelete.title}"? This action cannot be undone.`,
      async () => {
        try {
          const res = await fetch(GALLERY_DELETE_ALBUM_URL(albumToDelete.id), {
            method: 'DELETE',
            credentials: 'include',
          });
          if (!res.ok) throw new Error("Failed to delete album");
          const data = await res.json();
          setAlbums(prev => prev.filter(e => e.id !== albumToDelete.id));
          if (selectedAlbumId === albumToDelete.id) setSelectedAlbumId(null);
          addToast(data.message || "Album deleted");
        } catch (err) {
          console.error("Delete album error:", err);
          addToast("Failed to delete album", "error");
        }
      },
      true 
    );
  };

  // --- SET COVER IMAGE (UPDATED) ---
  const handleSetCoverImage = async (photoUrl) => {
    if (!selectedAlbumId) return;

    try {
      const res = await fetch(GALLERY_UPDATE_COVER_URL(selectedAlbumId), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ coverImg: photoUrl })
      });

      if (!res.ok) throw new Error("Failed to set cover image");
      
      setAlbums(prev => prev.map(album => {
        if (album.id === selectedAlbumId) {
          return { ...album, coverImg: photoUrl };
        }
        return album;
      }));
      
      addToast("Cover image updated successfully");
    } catch (err) {
      console.error("Set cover error:", err);
      addToast("Failed to set cover image", "error");
    }
  };

  // --- REARRANGE ALBUMS ---
  const handleDragStart = (e, position) => {
    dragItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    
    // Live Swap Logic
    const copyListItems = [...albums];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = position;
    dragOverItem.current = null;
    setAlbums(copyListItems);
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleLongPress = () => {
    if (!isReordering) {
      setIsReordering(true);
      addToast("Reorder mode enabled. Drag albums to rearrange.");
    }
  };

  const saveReorder = () => {
    setIsReordering(false);
    addToast("Album order saved");
  };

  // --- UPDATED UPLOAD LOGIC WITH PROGRESS ---
  
  // Helper to upload single file using XHR for progress events
  const uploadFileWithProgress = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', UPLOAD_API_URL);
      xhr.withCredentials = true;

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          onProgress(event.loaded);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (e) {
            reject(new Error("Invalid JSON response"));
          }
        } else {
           try {
             const errorData = JSON.parse(xhr.responseText);
             reject(new Error(errorData.error || 'Upload failed'));
           } catch(e) {
             reject(new Error(xhr.statusText));
           }
        }
      };

      xhr.onerror = () => reject(new Error('Network Error'));

      const formData = new FormData();
      formData.append('photo', file);
      xhr.send(formData);
    });
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedAlbumId) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadTotalFilesCount(files.length);

    try {
      const uploadedUrls = [];
      let successCount = 0;
      
      // Calculate total size for global progress
      let totalBytes = 0;
      for (let i = 0; i < files.length; i++) totalBytes += files[i].size;

      let accumulatedBytes = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadCurrentFile(`${file.name}`);

        try {
          const data = await uploadFileWithProgress(file, (loaded) => {
             const currentTotal = accumulatedBytes + loaded;
             const percentage = Math.min((currentTotal / totalBytes) * 100, 99); // Cap at 99 until finished
             setUploadProgress(percentage);
          });

          const imageUrl = data.url; 
          if (!imageUrl) throw new Error("No URL returned from backend");

          uploadedUrls.push(imageUrl);
          successCount++;
          
          // Add this file's full size to accumulated for next loop
          accumulatedBytes += file.size;

        } catch (innerErr) {
          console.error(`Failed to upload ${file.name}:`, innerErr);
          // Even if failed, add size to keep progress bar moving roughly correctly or skip
          accumulatedBytes += file.size; 
        }
      }
      
      setUploadProgress(100);

      if (uploadedUrls.length > 0) {
        setUploadCurrentFile("Saving to album...");
        
        const addPhotosRes = await fetch(GALLERY_ADD_PHOTOS_URL(selectedAlbumId), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ photos: uploadedUrls })
        });

        if (!addPhotosRes.ok) {
          throw new Error('Failed to add photos to album');
        }

        const updatedAlbum = await addPhotosRes.json();

        const normalized = {
          id: updatedAlbum._id,
          title: updatedAlbum.title,
          date: updatedAlbum.date,
          coverImg: updatedAlbum.coverImg,
          photos: (updatedAlbum.photos || []).map(url => ({
            src: url,
            width: 1000,
            height: 800
          }))
        };

        setAlbums(prevAlbums => prevAlbums.map(alb => alb.id === normalized.id ? normalized : alb));
        addToast(`Uploaded ${successCount} photo(s)`);
      } else {
        addToast("No photos were uploaded successfully", "error");
      }

    } catch (err) {
      console.error("Upload process error:", err);
      addToast("Upload process failed", "error");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadCurrentFile("");
      setUploadTotalFilesCount(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeletePhoto = async (photoToDelete) => {
    openConfirm(
      "Delete Photo",
      "Are you sure you want to remove this photo?",
      async () => {
        try {
          const res = await fetch(GALLERY_DELETE_PHOTO_URL(selectedAlbumId), {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ photo: photoToDelete.src })
          });
          if (!res.ok) throw new Error("Failed to delete photo");
          const updatedAlbum = await res.json();

          const normalized = {
            id: updatedAlbum._id,
            title: updatedAlbum.title,
            date: updatedAlbum.date,
            coverImg: updatedAlbum.coverImg,
            photos: (updatedAlbum.photos || []).map(url => ({
              src: url,
              width: 1000,
              height: 800
            }))
          };

          setAlbums(prevAlbums => prevAlbums.map(alb => alb.id === normalized.id ? normalized : alb));
          if (lightboxOpen) setLightboxOpen(false);
          addToast("Photo deleted");
        } catch (err) {
          console.error("Delete photo error:", err);
          addToast("Failed to delete photo", "error");
        }
      },
      true
    );
  };

  const selectedAlbum = albums.find(a => a.id === selectedAlbumId);
  const currentPhotos = selectedAlbum ? (selectedAlbum.photos || []) : [];

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1 < currentPhotos.length ? prev + 1 : 0));
  }, [currentPhotos.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 >= 0 ? prev - 1 : currentPhotos.length - 1));
  }, [currentPhotos.length]);

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

      {/* Upload Progress Bar (Displays when isUploading is true) */}
      {isUploading && (
         <UploadProgress 
           progress={uploadProgress} 
           currentFile={uploadCurrentFile} 
           totalFiles={uploadTotalFilesCount} 
         />
      )}

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
                <ArrowLeftIcon size={20} />
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
                  <span>{isUploading ? 'Uploading...' : 'Upload Photos'}</span>
                </button>
              ) : isReordering ? (
                <button 
                  onClick={saveReorder}
                  className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors animate-pulse"
                >
                  <Save size={16} />
                  <span>Done Reordering</span>
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
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Albums & Collections</h2>
                  <p className="text-neutral-400">
                    {isReordering 
                      ? "Drag albums to change their order." 
                      : "Select an album to view or long-press to reorder."}
                  </p>
                </div>
                {isReordering && (
                   <span className="text-emerald-400 text-sm font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                     Reorder Mode Active
                   </span>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="animate-spin text-neutral-500" size={32} />
                </div>
              ) : albums.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-neutral-800 rounded-xl">
                  <FolderPlus className="mx-auto h-12 w-12 text-neutral-600 mb-4" />
                  <h3 className="text-lg font-medium text-white">No albums yet</h3>
                  <p className="text-neutral-500 mt-1">Create your first album to start uploading photos.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {albums.map((album, index) => (
                    <AlbumCard 
                      key={album.id} 
                      index={index}
                      album={album} 
                      onClick={() => !isReordering && setSelectedAlbumId(album.id)}
                      onDelete={handleDeleteAlbum}
                      onLongPress={handleLongPress}
                      isReordering={isReordering}
                      onDragStart={handleDragStart}
                      onDragEnter={handleDragEnter}
                      onDragEnd={handleDragEnd}
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
                      {selectedAlbum.date && (new Date(selectedAlbum.date)).toLocaleDateString()}
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

                    {/* Actions Overlay (Always visible on hover) */}
                    <div className="absolute top-0 w-full p-2 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Set Cover Button */}
                        <button
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleSetCoverImage(photo.src); 
                          }}
                          className={`p-1.5 rounded-md backdrop-blur-md transition-colors ${
                             selectedAlbum.coverImg === photo.src 
                             ? 'bg-yellow-500/80 text-white' 
                             : 'bg-black/50 text-white hover:bg-yellow-500/80'
                          }`}
                          title="Set as Album Cover"
                        >
                           <Star size={14} fill={selectedAlbum.coverImg === photo.src ? "currentColor" : "none"} />
                        </button>

                        {/* Delete Image Button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeletePhoto(photo); }}
                          className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                          title="Delete Image"
                        >
                          <Trash2 size={14} />
                        </button>
                    </div>
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

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Album Date</label>
                <input 
                  type="date" 
                  value={newAlbumDate}
                  onChange={(e) => setNewAlbumDate(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="e.g., Summer Vacation 2024"
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