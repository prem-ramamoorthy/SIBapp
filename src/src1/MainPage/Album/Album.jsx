import React, { useState, useCallback, useEffect, useMemo } from "react";

// Lightbox & Plugins
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// CSS
import "./Album.css";

// Environment Variable
const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER; 

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [currentView, setCurrentView] = useState("home"); // 'home' or 'album'
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  
  // Data Fetching State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Albums on Mount
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // Construct URL: Ensure we handle potential trailing slashes in env var
        const baseUrl = BACKEND_SERVER_URL.endsWith('/') 
          ? BACKEND_SERVER_URL.slice(0, -1) 
          : BACKEND_SERVER_URL;
        
        const response = await fetch(`${baseUrl}/gallery/all`);

        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }

        const data = await response.json();
        setAlbums(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching gallery:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleFolderClick = (album) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedAlbum(album);
    setCurrentView("album");
  };

  const handleBackClick = () => {
    setSelectedAlbum(null);
    setCurrentView("home");
    setCurrentImageIndex(-1);
  };

  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
  }, []);

  // Helper: Format Date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  // Helper: Normalize photos to ensure they have a 'src' property
  const formattedPhotos = useMemo(() => {
    if (!selectedAlbum || !selectedAlbum.photos) return [];
    
    return selectedAlbum.photos.map(photo => {
      if (typeof photo === 'string') {
        return { src: photo };
      }
      return { 
        src: photo.src || photo.url || photo.link || "",
        ...photo 
      };
    });
  }, [selectedAlbum]);

  // --- RENDER LOADING STATE ---
  if (loading) {
    return (
      <div className="album-wrapper loading-wrapper">
        <div className="loader"></div>
        <p>Loading Collections...</p>
      </div>
    );
  }

  // --- RENDER ERROR STATE ---
  if (error) {
    return (
      <div className="album-wrapper error-wrapper">
        <div className="error-content">
          <h3>Unable to load gallery</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="back-btn-modern">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="album-wrapper">
      
      {/* --- STICKY HEADER --- */}
      <div className="gallery-header-sticky">
        <div className="header-content">
          {currentView === "album" ? (
            <button className="back-btn-modern" onClick={handleBackClick}>
              <span className="icon">←</span> Back to Collections
            </button>
          ) : (
            <button className="back-btn-modern" onClick={() => window.location.href = '/'}>
              <span className="icon">←</span> Back to Main
            </button>
          )}
          
          <h2 className="page-title fade-in">
            {currentView === "home" ? "Collections" : selectedAlbum?.title}
          </h2>
        </div>
      </div>

      <div className="gallery-container">
        
        {/* VIEW 1: ALBUM GRID (FOLDERS) */}
        {currentView === "home" && (
          <div className="album-grid animate-up">
            {albums.length === 0 ? (
                <div className="no-data-message">No albums found.</div>
            ) : (
                albums.map((album) => (
                <div 
                    key={album.id} 
                    className="album-card-modern" 
                    onClick={() => handleFolderClick(album)}
                >
                    <div className="image-container">
                        <img 
                            src={album.coverImg || "https://via.placeholder.com/400x300?text=No+Cover"} 
                            alt={album.title} 
                            loading="lazy" 
                        />
                        <div className="overlay-gradient"></div>
                    </div>
                    <div className="card-content">
                        {/* Updated Date Formatting */}
                        <span className="date-badge">{formatDate(album.date)}</span>
                        <h3>{album.title}</h3>
                        <p className="photo-count">
                            {(album.photos || []).length} Moments
                        </p>
                    </div>
                </div>
                ))
            )}
          </div>
        )}

        {/* VIEW 2: PHOTOS INSIDE FOLDER (PURE CSS MASONRY) */}
        {currentView === "album" && selectedAlbum && (
          <div className="photos-container animate-up">
            
            {/* Inline Back Button */}
            <div style={{ marginBottom: '20px', display: 'flex' }}>
                <button className="back-btn-modern" onClick={handleBackClick}>
                    <span className="icon">←</span> Back
                </button>
            </div>

            <div className="masonry-grid">
              {formattedPhotos.map((photo, index) => (
                <div 
                  key={index} 
                  className="masonry-item"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={photo.src} 
                    alt={`Gallery item ${index}`} 
                    loading="lazy" 
                  />
                  <div className="img-overlay">
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Lightbox
              open={currentImageIndex >= 0}
              index={currentImageIndex}
              close={() => setCurrentImageIndex(-1)}
              slides={formattedPhotos}
              plugins={[Zoom, Thumbnails]}
              animation={{ fade: 300 }}
              zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Album;