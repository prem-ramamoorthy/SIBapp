import React, { useState, useCallback } from "react";

// Lightbox & Plugins
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// CSS and Data
import "./Album.css";
import { albums } from "./data";

const Album = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);

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
             <div className="brand-title">Event Gallery</div>
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
            {albums.map((album) => (
              <div 
                key={album.id} 
                className="album-card-modern" 
                onClick={() => handleFolderClick(album)}
              >
                <div className="image-container">
                   <img src={album.coverImg} alt={album.title} loading="lazy" />
                   <div className="overlay-gradient"></div>
                </div>
                <div className="card-content">
                  <span className="date-badge">{album.date}</span>
                  <h3>{album.title}</h3>
                  <p className="photo-count">{album.photos.length} Moments</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: PHOTOS INSIDE FOLDER (PURE CSS MASONRY) */}
        {currentView === "album" && selectedAlbum && (
          <div className="photos-container animate-up">
            
            <div className="masonry-grid">
              {(selectedAlbum.photos || []).map((photo, index) => (
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
                  {/* Enhanced Overlay */}
                  <div className="img-overlay">
                    <span>
                        {/* Simple SVG Zoom Icon */}
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
              slides={selectedAlbum.photos}
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