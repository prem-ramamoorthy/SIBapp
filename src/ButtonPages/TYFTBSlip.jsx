import { useState } from "react";
import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import RadioButtons from "../Components/RadioButtons";
import TextArea from "../Components/TextArea";
import FilterButton from "../Members/Components/FilterButton";
import { getDate } from "../utils/getDate.mjs";
import { X } from "lucide-react";

function ButtonPage({ onClose = () => { } }) {
  const todaysDate = getDate();
  const [date, setDate] = useState(todaysDate);
  const [amount, setAmount] = useState("");
  const [businessType, setBusinessType] = useState("new");
  const [referralType, setReferralType] = useState("tier1");
  const [comments, setComments] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    const data = {
      receiver_displayname: to,
      business_type: businessType,
      referral_type: referralType,
      business_amount: amount,
      business_description: comments,
      created_at: date
    };

    try {
      setLoading(true);
      const user = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/auth/getuser`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const getuser = await user.json();
      const notificationData = {
        receiver: data.receiver_displayname,
        sender: getuser.username,
        header: `You've received the TYFTB from the user : ${getuser.username.toString()}`,
        content: `Thankyou for the Business(TYFTB), I have earned ₹${data.business_amount} from your referral. Description : ${data.business_description} `,
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
        `${import.meta.env.VITE_BACKEND_SERVER}/slips/tyftb/createtyftb`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
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
    <div className="flex flex-1 items-center justify-around  min-h-screen p-4">
      <div className="max-w-full  border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 rounded-2xl flex flex-col gap-3 shadow-lg">
        <div className="header border-b-2 border-gray-300 dark:border-gray-600 pb-2 flex justify-between">
          <p className="font-bold text-gray-900 dark:text-gray-100">SIB TYFTB Slip</p>
          <button
            className="font-bold text-gray-900 dark:text-gray-100 hover:text-red-500 dark:hover:text-red-400"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <div className="flex w-full gap-4">
          <EntryField
            type="text"
            placeholder="Chapter Name"
            label="Chapter"
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
          <EntryField
            type="date"
            placeholder={todaysDate}
            label="Date"
            value={date}
            onChange={setDate}
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>

        <CrossChapterSearch
          label="Thank you to"
          placeholder="Select a member"
          value={to}
          onChange={setTo}
          className="dark:bg-gray-700 dark:text-gray-100 dark:border-yellow-400"
        />

        <EntryField
          type="text"
          placeholder="Enter Amount in INR"
          label="Amount"
          onChange={setAmount}
          className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
        />

        <RadioButtons
          label="Business Type"
          buttons={[
            { name: "New", value: "new" },
            { name: "Repeat", value: "repeat" },
          ]}
          onChange={setBusinessType}
        />

        <RadioButtons
          label="Referral Type"
          buttons={[
            { name: "Tier 1 (Inside)", value: "tier1" },
            { name: "Tier 2 (Outside)", value: "tier2" },
            { name: "Tier 3+", value: "tier3" },
          ]}
          onChange={setReferralType}
        />

        <TextArea
          label="Business Description"
          placeholder="Additional Comments..."
          onChange={setComments}
          className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
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
            bg="bg-white dark:bg-gray-700"
            hover="hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={onClose}
          />
          <FilterButton
            content="Submit"
            bg="bg-yellow-300 dark:bg-yellow-500"
            hover="hover:bg-yellow-400 dark:hover:bg-yellow-600"
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
