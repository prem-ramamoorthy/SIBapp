import { useState , useEffect } from "react";
import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import TextArea from "../Components/TextArea";
import FilterButton from "../Members/Components/FilterButton";
import { getDate } from '../utils/getDate.mjs'
import { X } from "lucide-react";

function ButtonPage({ onClose = () => { } }) {

  const todaysDate = getDate();

  const [chapterName, setChapterName] = useState("");
  const [date, setDate] = useState(todaysDate);
  const [location, setLocation] = useState("");
  const [conversationTopic, setConversationTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [member2Name, setMember2Name] = useState("");
  const [username , setUsername] = useState("loading...") ;

  useEffect(() => {
      let cancelled = false;
      (async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_SERVER}/auth/getuser`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
          const user = await res.json();
          if (!cancelled && user?.username) {
            setUsername(user.username);
          }
        } catch (e) {
          console.log(e)
        }
      })();
      return () => {
        cancelled = true;
      };
    }, []);

  const handleSubmit = async () => {
    const formData = {
      member2_name: member2Name,
      chapter_name: chapterName,
      meeting_date: date,
      location: location,
      discussion_points: conversationTopic,
      created_by_username: username
    }

    try {
      setLoading(true);
      const notificationData = {
        receiver: formData.member2_name,
        sender: formData.created_by_username,
        header: `Upcoming Member-to-Member (M2M) Meeting ${formData.created_by_username}`,
        content: `This is to notify you about the scheduled Member-to-Member (M2M) meeting by the user ${formData.created_by_username}. Topic of conversation :${formData.discussion_points}`,
        read: false
      }
      await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/notification/createnotification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notificationData),
          credentials: "include",
        }
      );
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/slips/one2one/createone2one`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const result = await res.json();
      if (result?.errors || result?.message) {
        const errMsg = result?.errors?.[0]
          ? `${result?.errors?.[0].path} : ${result?.errors?.[0].msg}`
          : (result?.message || "An error occurred.");
        if (errMsg)
          setError(errMsg);
      }
      else {
        setResponse(result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="w-fit max-w-full bg-white dark:bg-gray-900 rounded-2xl p-6 flex flex-col gap-4 shadow-lg border border-gray-200 dark:border-gray-700 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b-2 border-gray-300 dark:border-gray-600 pb-2">
          <p className="font-bold text-lg dark:text-gray-100">SIB M to M Slip</p>
          <button
            className="font-bold text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition"
            onClick={onClose}
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        <EntryField
            placeholder={username}
            label="Member - 1"
            readOnly = {true }
            type="text"
          />

        <CrossChapterSearch
          label="Member - 2"
          placeholder="Search a member"
          onChange={setMember2Name}
        />

        <CrossChapterSearch
          label="Chapter"
          placeholder="Chapter Name of the member met"
          onChange={setChapterName}
          offsubmit={true}
          searchdomain="searchchapter"
        />

        <div className="flex flex-row w-full gap-2">

          <EntryField
            type="date"
            placeholder="Date"
            label="Date"
            value={date}
            onChange={setDate}
          />
          <EntryField
            type="text"
            placeholder="Meeting Location"
            label="Location"
            onChange={setLocation}
          />
        </div>

        <TextArea
          label="Topic of conversation"
          placeholder="Describe Topics discussed..."
          onChange={setConversationTopic}
        />

        {error && (
          <p className="rounded-md border px-3 py-2 text-sm border-red-300 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-900 dark:text-red-300">
            {error}
          </p>
        )}

        {response && (
          <p className="rounded-md border px-3 py-2 text-sm border-green-300 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900 dark:text-green-300">
            {response}
          </p>
        )}

        <div className="mt-2 flex w-full justify-end gap-4 border-t-2 border-gray-300 dark:border-gray-600 pt-3">
          <FilterButton
            content="Close"
            bg="bg-white dark:bg-gray-800"
            hover="hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={onClose}
          />
          <FilterButton
            content="Submit"
            bg="bg-yellow-300 dark:bg-yellow-400"
            hover="hover:bg-yellow-400 dark:hover:bg-yellow-500"
            onClick={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
