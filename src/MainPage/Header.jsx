import { HeaderAvatar } from './Components/Avatar';
import Sidebar from './SideBar/SideBar';
import NotificationPanel from '../NotificationPanel/Notification';
import useFetch from '../hooks/useFetch';
import Loader from '../Members/Components/Loader';
import ErrorComponent from '../Components/ErrorComponent';
import CircularLoading from '../Components/CircularLoading';
import { useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { NavLink } from 'react-router-dom';

function Header() {
  const [url, seturl] = useState(null);

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/auth/getuser`, {
    method: "GET",
    credentials: "include",
  }
  );

  const { data: showProfileData } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/profile/getprofile`, {
    method: "GET",
    credentials: "include"
  }
  );

  const { data: chapterName, loading: loading2, error: error2 } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/getchapteroverview`, {
    method: "GET",
    credentials: "include",
  }
  );

  useEffect(() => {
    if (showProfileData?.profile_image_url) {
      seturl(showProfileData.profile_image_url);
    }
  }, [showProfileData]);

  const getInitials = (name) =>
    name
      ?.trim()
      .split(' ')
      .map(n => n[0] || '')
      .join('')
      .toUpperCase();

  return (
    <div
      className="
        sticky top-0
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        rounded-lg sm:rounded-xl lg:rounded-2xl
        [grid-area:1/1/2/2] sm:[grid-area:1/1/2/5]
        md:[grid-area:1/1/2/7] lg:[grid-area:1/1/2/9]
        xl:[grid-area:1/1/2/11]
        flex justify-between items-center z-50
        transition-colors duration-300
        mx-2
      "
    >
      <div className="flex flex-row items-center mt-2 pl-5 gap-3">
        <Sidebar />

        <Zoom>
          <img
            src="/assets/logo.png"
            alt="logo"
            height={60}
            width={60}
            style={{
              background: "none",
              display: "inline-block",
              verticalAlign: "middle",
              borderRadius: "50%", 
              objectFit: "contain"
            }}
          />

        </Zoom>

        <NavLink to={'/dashboard'}>
          <h1
            className="
            font-bold text-lg
            text-gray-800 dark:text-gray-100
            hidden lg:inline-block md:inline-block xl:inline-block
          "
          >
            SENGUNTHAR IN BUSINESS
          </h1>
        </NavLink>
      </div>

      <div className="flex flex-row items-center justify-end gap-3 p-2 mx-4">
        <NotificationPanel />

        <span className="
          text-gray-700 dark:text-gray-300 font-bold text-base  md:inline-block xl:inline-block truncate max-w-[140px] sm:max-w-xs
        ">
          {loading2 ? <Loader /> : error2 ? <ErrorComponent /> : (chapterName?.chapterName || "Chapter Name")}
        </span>

        <div className="flex-shrink-0">
          {loading ? (
            <CircularLoading />
          ) : error ? (
            <ErrorComponent />
          ) : data ? (
            <HeaderAvatar
              src={url}
              initials={getInitials(data.username)}
              Name={data.username}
              status={data.status === true ? "online" : "offline"}
              email={data.email}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
