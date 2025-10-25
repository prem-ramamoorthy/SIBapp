import SiteButtonUI from "./Components/SiteButtonUI"
import useFetch from "../hooks/useFetch";
import Loading from "../Components/Loading";

function SiteInfo() {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/getrenewaldate`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const Buttons = {
    renewalDate: (
      <SiteButtonUI
        content={
          error
            ? "Error"
            : loading
            ? "Loading..."
            : data
            ? data.renewal_date
            : "No data"
        }
      />
    ),
    website: (
      <SiteButtonUI
        need={false}
        content="SIB Website"
        color="text-red-500 dark:text-red-400"
        style2={{ fontWeight: "600", fontSize: "1rem" }}
        to="https://business-connect-three.vercel.app/"
      />
    ),
  };

  return (
    <div
      className="
        div4 
        rounded-lg sm:rounded-xl lg:rounded-2xl
        [grid-area:2/1/3/2] 
        sm:[grid-area:2/4/3/5] 
        md:[grid-area:2/5/3/7] 
        lg:[grid-area:2/6/3/9] 
        xl:[grid-area:2/7/3/11]
        grid place-items-center
        grid-cols-2
        grid-rows-1
        gap-4
        px-4
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
    >
      {Buttons.renewalDate}
      {Buttons.website}
    </div>
  );
}

export default SiteInfo;
