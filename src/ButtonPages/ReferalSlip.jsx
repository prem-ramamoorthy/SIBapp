import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import RadioButtons from "../Components/RadioButtons";
import SelectButtons from "../Components/SelectButtons";
import TextArea from "../Components/TextArea";
import HeatScale from "../Components/HeatScale";
import FilterButton from "../Members/Components/FilterButton";
import { useEffect, useState } from "react";
import { getDate } from "../utils/getDate.mjs";
import { X } from "lucide-react";
import { sanitizeReferralData } from "../utils/slipsSanitization.mjs";

function ButtonPage({ onClose = () => {} }) {
  const todaysDate = getDate();

  const [date, setDate] = useState(todaysDate);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [referralDetails, setReferralDetails] = useState("");
  const [referralType, setReferralType] = useState("tier1");
  const [referralStatus, setReferralStatus] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comments, setComments] = useState("");
  const [heatScale, setHeatScale] = useState("tepid");
  const [contactName, setContactName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [username, setUsername] = useState("loading...");

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
          setFrom(user.username);
        }
      } catch (e) {
        console.log(e)
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handler = async () => {
    setError(null);
    setResponse(null);

    let data = {
      referrer_username: from,
      referee_username: to,
      contact_name: contactName,
      description: referralDetails,
      referral_type: referralType,
      referral_status: referralStatus,
      contact_phone: phone,
      contact_email: email,
      contact_address: address,
      comments: comments,
      hot: heatScale,
      created_at: date,
      status:false
    };

    data = sanitizeReferralData(data);

    if (!data.referrer_username || !data.referee_username || !data.description) {
      setError("Please fill in all required fields (*).");
      return;
    }
    if (data.referral_type === "tier2" && !data.contact_name) {
      setError("Contact Name is required for Tier 2 referrals.");
      return;
    }

    try {
      setLoading(true);

      const notificationData = {
        receiver: data.referee_username,
        sender: data.referrer_username,
        header: `New Referral Received from ${data.referrer_username}`,
        content: `Hello! You’ve been referred by ${data.referrer_username} : ${data.description}`,
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

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/slips/referral/createreferral`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const result = await res.json();

      if (result?.errors || result?.message === "error" || result?.error) {
        const errMsg =
          result?.errors?.[0]
            ? `${result?.errors?.[0].path} : ${result?.errors?.[0].msg}`
            : result?.message || result?.error || "An error occurred.";
        setError(String(errMsg));
      } else {
        const okText =
          typeof result === "string"
            ? result
            : result?.message || "Referral created successfully.";
        setResponse(okText);
      }
    } catch (err) {
      setError(err?.message || "Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="max-w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 rounded-2xl flex flex-col gap-4 shadow-lg">
        <div className="header border-b-2 border-gray-300 dark:border-gray-700 pb-2 flex justify-between items-center">
          <p className="font-bold text-lg">SIB Referral Slip</p>
          <button
            className="font-bold text-gray-900 dark:text-gray-100"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4">
          <EntryField
            type="date"
            placeholder={todaysDate}
            label="Date *"
            value={date}
            onChange={setDate}
          />
          <EntryField
            type="text"
            placeholder={username || "Loading..."}
            label="From *"
            value={from}
            readOnly={true}
            onChange={() => {}}
          />
        </div>

        <CrossChapterSearch
          label="To *"
          placeholder="Search Username..."
          onChange={setTo}
        />

        <TextArea
          label="Referral"
          placeholder="Enter the referral details..."
          onChange={setReferralDetails}
        />

        <RadioButtons
          label="Referral Type *"
          buttons={[
            { name: "Tier 1 (Inside)", value: "tier1" },
            { name: "Tier 2 (Outside)", value: "tier2" },
          ]}
          value={referralType}
          onChange={setReferralType}
        />

        {referralType === "tier2" && (
          <EntryField
            type="text"
            placeholder="Enter Contact Name"
            label="Contact Name *"
            value={contactName}
            onChange={setContactName}
          />
        )}

        <SelectButtons
          label="Referral Status"
          items={[
            { name: "Given Your Card", value: "given_card" },
            { name: "Told Them You Would Call", value: "told_to_call" },
          ]}
          value={referralStatus}
          onChange={setReferralStatus}
        />

        <div className="flex flex-col md:flex-row w-full gap-4">
          <EntryField
            type="text"
            placeholder="Phone Number"
            label="Telephone *"
            value={phone}
            onChange={setPhone}
          />
          <EntryField
            type="email"
            placeholder="Email Address"
            label="Email"
            value={email}
            onChange={setEmail}
          />
        </div>

        <TextArea
          label="Address"
          placeholder="Address Details..."
          value={address}
          onChange={setAddress}
        />
        <TextArea
          label="Comments"
          placeholder="Additional comments..."
          value={comments}
          onChange={setComments}
        />

        <HeatScale value={heatScale} onChange={setHeatScale} />

        {error && (
          <p className="rounded-md border px-3 py-2 text-sm border-red-300 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-900 dark:text-red-300">
            {String(error)}
          </p>
        )}

        {response && (
          <p className="rounded-md border px-3 py-2 text-sm border-green-300 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900 dark:text-green-300">
            {String(response)}
          </p>
        )}

        <div className="mt-2 flex w-full justify-end gap-4 border-t-2 border-gray-300 dark:border-gray-700 pt-3">
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
            onClick={handler}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
