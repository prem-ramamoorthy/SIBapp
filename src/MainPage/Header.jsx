import { HeaderAvatar } from './Components/Avatar';
import Sidebar from './SideBar/SideBar';
import NotificationPanel from '../NotificationPanel/Notification';
import useFetch from '../hooks/useFetch';
import CircularLoading from '../Components/CircularLoading';
import ErrorComponent from '../Components/ErrorComponent';

function Header() {

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/auth/getuser`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const getInitials = (name) =>
    name
      .trim()
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

        <h1
          className="
            h-[40px] w-[40px] 
            bg-amber-400 dark:bg-amber-500
            rounded-full font-bold flex items-center justify-center
            text-gray-900 dark:text-gray-900
          "
        >
          SIB
        </h1>

        <h1
          className="
            font-bold text-lg
            text-gray-800 dark:text-gray-100
            hidden lg:inline-block md:inline-block xl:inline-block
          "
        >
          SENGUNTHAR IN BUSINESS
        </h1>
      </div>

      <div className="flex flex-row items-center justify-end gap-3 p-2 mx-4">
        <NotificationPanel />

        <h1
          className="
            text-gray-700 dark:text-gray-300
            font-bold text-[1.1rem]
            hidden lg:inline-block md:inline-block xl:inline-block
          "
        >
          Chapter Name
        </h1>
        {loading ? <CircularLoading /> : error ? <ErrorComponent /> : data ? <HeaderAvatar
          initials = {getInitials(data.username)}
          Name = {data.username}
          status = {data.status === true ? "online" : "offline"}
          email = {data.email}/> : null}
      </div>
    </div>
  );
}

export default Header;
