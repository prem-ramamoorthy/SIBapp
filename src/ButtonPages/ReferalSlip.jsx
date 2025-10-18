import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import RadioButtons from "../Components/RadioButtons";
import SelectButtons from "../Components/SelectButtons";
import TextArea from "../Components/TextArea";
import HeatScale from "../Components/HeatScale";
import FilterButton from "../Members/Components/FilterButton";
import { useState } from "react";
import { getDate } from "../utils/getDate.mjs";
import { X } from "lucide-react";

function ButtonPage({ onClose = () => {} }) {

  const todaysDate = getDate() ;

  const [date, setDate] = useState(todaysDate) ;
  const [from , setFrom ] = useState('') ;
  const [referraldetails , setreferralDetails ] = useState('') ;
  const [referralType , setreferraltype ] = useState("Value1") ;
  const [ReferralStatus, setReferralStatus] = useState([]);
  const [phone , setphone ] = useState("") ;
  const [email , setEmail] = useState("") ;
  const [address , setaddress] = useState("") ;
  const [comments , setcomments] = useState("") ;
  const [heatscale , setheatscale] = useState("") ;

  const handler = ()=>{
    console.log(date) ;
    console.log(from) ;
    console.log(referralType) ;
    console.log(referraldetails)
    console.log(phone);
    console.log(email) ;
    console.log(address) ;
    console.log(comments)
    console.log(heatscale)
    console.log(ReferralStatus)
    console.log("IM clicked !!!");
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="max-w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 rounded-2xl flex flex-col gap-4 shadow-lg">
        {/* Header */}
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
            readOnly={false}
            type="date"
            placeholder={todaysDate}
            label="Date"
            value={date}
            onChange={setDate}
          />
          <EntryField
            readOnly={false}
            type="text"
            placeholder="Your Name"
            label="From"
            onChange={setFrom}
          />
        </div>

        <CrossChapterSearch
          label="To"
          placeholder="Search cross chapter Name"
        />

        <TextArea label="Referral" placeholder="Enter the Referral details..." onChange={setreferralDetails}/>
        <RadioButtons
          label="Referral Type"
          buttons={[
            { name: "Tier 1 (Inside)", value: "tier1" },
            { name: "Tier 2 (OutSide)", value: "tier2" },
          ]}
          onChange={setreferraltype}
        />
        <SelectButtons
          label="Referral Status"
          items={[
            { name: "Given Your card", value: "option1" },
            { name: "Told them you would call", value: "option2" },
          ]}
          onChange={setReferralStatus}
        />

        <div className="flex flex-col md:flex-row w-full gap-4">
          <EntryField type="text" placeholder="Phone Number" label="Telephone" onChange={setphone}/>
          <EntryField type="email" placeholder="Email address" label="Email" onChange={setEmail}/>
        </div>

        <TextArea label="Address" placeholder="Address Details..." onChange={setaddress}/>
        <TextArea label="Comments" placeholder="Additional comments..." onChange={setcomments}/>

        <HeatScale onChange={setheatscale}/>

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
          />
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
