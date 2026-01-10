import { useState, useEffect } from "react";
import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import TextArea from "../Components/TextArea";
import FilterButton from "../Members/Components/FilterButton";
import { getDate } from '../utils/getDate.mjs';
import { X } from "lucide-react";

function ButtonPage({ onClose = () => {} }) {
  const todaysDate = getDate();

  const [chapterName, setChapterName] = useState("");
  const [date, setDate] = useState(todaysDate);
  const [location, setLocation] = useState("");
  const [conversationTopic, setConversationTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [member2Name, setMember2Name] = useState("");
  const [username, setUsername] = useState("loading...");
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(null);

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
        if (!res.ok) throw new Error("Failed to fetch user");
        const user = await res.json();
        if (!cancelled && user?.username) {
          setUsername(user.username);
        }
      } catch (e) {
        console.error(e);
        setUsername("Unknown");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleImageChange = async (e) => {
    setImageError(null);
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);

    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/auth/upload/photo`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data?.url) {
        setImageUrl(data.url);
      } else {
        setImageError(data?.error || "Image upload failed.");
      }
    } catch (err) {
      setImageError(err.message || "Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!member2Name) return "Please select Member 2.";
    if (!chapterName) return "Please select a Chapter.";
    if (!date) return "Please select a date.";
    if (!location) return "Please enter the meeting location.";
    if (!conversationTopic) return "Please enter the topic of conversation.";
    if (!imageUrl) return "Please upload an image.";
    return null;
  };

  const handleSubmit = async () => {
    setError(null);
    setResponse(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = {
      member2_name: member2Name,
      chapter_name: chapterName,
      meeting_date: date,
      location: location,
      discussion_points: conversationTopic,
      created_by_username: username,
      status: false,
      image_url: imageUrl,
    };

    try {
      setLoading(true);
      // Send notification
      const notificationData = {
        receiver: formData.member2_name,
        sender: formData.created_by_username,
        header: `Upcoming Member-to-Member (M2M) Meeting ${formData.created_by_username}`,
        content: `This is to notify you about the scheduled Member-to-Member (M2M) meeting by the user ${formData.created_by_username}. Topic of conversation: ${formData.discussion_points}`,
        read: false,
      };
      await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/notification/createnotification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notificationData),
          credentials: "include",
        }
      );
      // Submit slip
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
      if (result?.errors ) {
        const errMsg = result?.errors?.[0]
          ? `${result?.errors?.[0].path} : ${result?.errors?.[0].msg}`
          : (result?.message || "An error occurred.");
        setError(errMsg);
      } else {
        setResponse("Slip submitted successfully!");
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err) {
      setError(err.message || "Submission failed.");
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
          readOnly={true}
          type="text"
          value={username}
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
            value={location}
            onChange={setLocation}
          />
        </div>

        <TextArea
          label="Topic of conversation"
          placeholder="Describe Topics discussed..."
          value={conversationTopic}
          onChange={setConversationTopic}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Upload Image *
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-700 dark:text-gray-200
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-yellow-50 file:text-yellow-700
              hover:file:bg-yellow-100
              dark:file:bg-gray-800 dark:file:text-yellow-300 dark:hover:file:bg-gray-700
              "
            disabled={loading}
            onChange={handleImageChange}
          />
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Uploaded" className="max-h-32 rounded-md border" />
              <p className="text-xs text-green-600 dark:text-green-400 break-all">{imageUrl}</p>
            </div>
          )}
          {imageError && (
            <p className="text-xs text-red-600 dark:text-red-400">{imageError}</p>
          )}
        </div>

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

        {loading && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Processing...</p>
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
