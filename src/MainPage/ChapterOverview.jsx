import Stat from "./Components/Stat";
import useFetch from "../hooks/useFetch";
import Loading from "../Components/Loading";

function ChapterOverview() {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/getchapteroverview`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  console.log(data)

  return (
    <div className="div3 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl
                    [grid-area:3/1/7/2] 
                    sm:[grid-area:2/1/5/4] 
                    md:[grid-area:2/1/5/5] 
                    lg:[grid-area:2/1/5/6] 
                    xl:[grid-area:2/1/5/7]
                    max-h-4/4 max-w-4/4">
      <div>
        <p className="font-semibold p-4 text-gray-700">Chapter Overview</p>
        {error && (
          <p className="mb-4 rounded-md border px-3 py-2 text-sm bg-red-50 text-red-700 border-red-200">
            Error: {error}
          </p>
        )}
        <div className=" flex flex-col gap-4 items-center justify-between">
          {loading ? (
            <Loading />
          ) : data ? (
            <>
              <h2 className="text-2xl font-bold">{data.chapterName}</h2>
              <h3 className="text-lg font-semibold text-gray-600">
                Next Meeting <span className="text-amber-400">{data.nextMeeting}</span>
              </h3>
              <div className="stats flex flex-row justify-between text-lg font-semibold w-3/4 pb-4">
                <Stat value={data.totalMembers} label="Members" />
                <Stat value={data.totalRevenue} label="Revenue" money={true} />
                <Stat value={data.totalvisitors} label="Visitors" />
              </div>
            </>
          ) : (
            <p className="text-gray-500">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChapterOverview;
