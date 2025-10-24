import ActivityButton from './Components/ActivityButton'
import ActivityP from './Components/ActivityP';
import useFetch from '../hooks/useFetch';

function Activity() {
  const Buttons = ['Month', '6 Months', 'Lifetime'].map((item, index) => (
    <ActivityButton content={item} key={index} />
  ));

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/getactivity`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const ActivityPs = [
    { content: "Referal Given", upcoming: 0 , actual: error ? "error" : loading ? "loading..." : data ? data.referral_given : -1 },
    { content: "Referal Received", upcoming: 0, actual: error ? "error" : loading ? "loading..." : data ? data.referral_received : -1 },
    { content: "TYFTB Received", upcoming: 0, actual: error ? "error" : loading ? "loading..." : data ? data.tyftb_received : -1 },
    { content: "TYFTB Given", upcoming: 0, actual: error ? "error" : loading ? "loading..." : data ? data.tyftb_given : -1 },
    { content: "Business Made", upcoming: 0, actual: error ? "error" : loading ? "loading..." : data ? data.business_made : -1 },
    { content: "M to M", upcoming: 0, actual: error ? "error" : loading ? "loading..." : data ? data.M2Ms : -1 },
    { content: "Visitor", upcoming: 0, actual: error ? "error" : loading ? "loading..." : data ? data.Visitors : -1 },
  ].map((props, index) => <ActivityP key={index} {...props} />);

  return (
    <div
      className="
        div2 rounded-lg sm:rounded-xl lg:rounded-2xl
        [grid-area:10/1/15/2]
        sm:[grid-area:5/1/8/3]
        md:[grid-area:5/1/9/4]
        lg:[grid-area:5/1/9/5]
        xl:[grid-area:5/1/10/5]
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        max-w-full
        min-h-0
        overflow-hidden
        flex flex-col
        shadow-md dark:shadow-gray-800/50
        transition-colors duration-300
      "
    >
      <div className="header flex items-center justify-between gap-2 px-4 py-3 shrink-0 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-[18px] font-[600] text-black dark:text-gray-100 m-0">
          Activity
        </h2>
        <div className="buttonContainer flex gap-2">
          {Buttons}
        </div>
      </div>

      <div
        className="
          container
          max-w-full
          min-h-0
          flex-1
          overflow-auto
        "
      >
        {ActivityPs}
      </div>
    </div>
  )
}

export default Activity
