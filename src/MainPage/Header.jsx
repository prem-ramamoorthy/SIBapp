import { HeaderAvatar } from './Components/Avatar';
import Sidebar from './SideBar/SideBar';
import NotificationPanel from '../NotificationPanel/Notification';
// Note: We use a custom internal hook below instead of the generic useFetch 
// to handle specific caching requirements for the header.
import Loader from '../Members/Components/Loader';
import ErrorComponent from '../Components/ErrorComponent';
import CircularLoading from '../Components/CircularLoading';
import { useEffect, useState, useCallback } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { NavLink } from 'react-router-dom';

// Helper function outside component
const getInitials = (name) =>
  name
    ?.trim()
    .split(' ')
    .map(n => n[0] || '')
    .join('')
    .toUpperCase();

// --- Custom Hook for Stale-While-Revalidate Strategy ---
const usePersistentFetch = (url, storageKey) => {
  const [state, setState] = useState(() => {
    // 1. Initial Load: Try to get data from local storage immediately
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        return { data: JSON.parse(cached), loading: false, error: null };
      }
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
    // If no cache, start in loading state
    return { data: null, loading: true, error: null };
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // We always fetch in the background to ensure data is fresh
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          // Only update state if data actually changed to prevent re-renders
          // or if we were previously loading/erroring
          setState(prev => {
            const isDataDifferent = JSON.stringify(prev.data) !== JSON.stringify(result);
            if (isDataDifferent || prev.loading || prev.error) {
               // Update Cache
               localStorage.setItem(storageKey, JSON.stringify(result));
               return { data: result, loading: false, error: null };
            }
            return prev;
          });
        }
      } catch (err) {
        if (isMounted) {
          setState(prev => ({
            ...prev,
            // If we have cached data, don't show an error, just keep showing cached data
            // Only show error if we have NO data at all
            error: prev.data ? null : err, 
            loading: false
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, storageKey]);

  return state;
};

function Header() {
  // 1. Fetch User Data (Persisted)
  const { data: userData, loading: userLoading, error: userError } = usePersistentFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/auth/getuser`,
    'header_auth_user'
  );

  // 2. Fetch Profile Data (Persisted)
  const { data: showProfileData } = usePersistentFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/profile/getprofile`,
    'header_user_profile'
  );

  // 3. Fetch Chapter Data (Persisted)
  const { data: chapterNameData, loading: chapterLoading, error: chapterError } = usePersistentFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/getchapteroverview`,
    'header_chapter_overview'
  );

  // Derived state (No need for useEffect)
  const url = showProfileData?.profile_image_url || null;
  const currentChapterName = chapterNameData?.chapterName || "Chapter Name";

  return (
    <div
      className="
        sticky top-0 z-50
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        rounded-lg sm:rounded-xl lg:rounded-2xl
        flex justify-between items-center 
        transition-colors duration-300
        px-2 py-1 shadow-sm
      "
    >
      <div className="flex flex-row items-center mt-1 pl-2 gap-3">
        <Sidebar />

        <Zoom>
          <img
            src="/assets/logo.webp"
            alt="logo"
            height={50}
            width={50}
            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] object-contain rounded-full"
            style={{
              background: "none",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
        </Zoom>

        <NavLink to={'/dashboard'}>
          <h1
            className="
            font-bold text-base sm:text-lg
            text-gray-800 dark:text-gray-100
            hidden sm:inline-block
          "
          >
            SENGUNTHAR IN BUSINESS
          </h1>
        </NavLink>
      </div>

      <div className="flex flex-row items-center justify-end gap-3 p-2 mx-2 sm:mx-4">
        <span className="
          text-gray-700 dark:text-gray-300 font-bold text-sm sm:text-base 
          md:inline-block truncate max-w-[100px] sm:max-w-xs
        ">
          {chapterLoading ? (
             <Loader /> 
          ) : chapterError ? (
             <ErrorComponent />
          ) : (
            <>
              {/* Mobile View: Initials only */}
              <span className="md:hidden">
                {getInitials(currentChapterName)}
              </span>
              {/* Desktop View: Full Name */}
              <span className="hidden md:inline">
                {currentChapterName}
              </span>
            </>
          )}
        </span>

        <NotificationPanel />

        <div className="flex-shrink-0">
          {userLoading ? (
            <CircularLoading />
          ) : userError ? (
            <ErrorComponent />
          ) : userData ? (
            <HeaderAvatar
              src={url}
              initials={getInitials(userData.username)}
              Name={userData.username}
              status={userData.status === true ? "online" : "offline"}
              email={userData.email}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;