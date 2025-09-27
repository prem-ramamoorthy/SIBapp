import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import RadioButtons from "../Components/RadioButtons";
import SelectButtons from "../Components/SelectButtons";
import TextArea from "../Components/TextArea";
import HeatScale from "../Components/HeatScale";
import FilterButton from "../Members/Components/FilterButton";

function ButtonPage({ onClose = () => {} }) {

  return (
    <div className="container flex flex-1 items-center justify-around">
      <div className="max-w-[87.5%] bg-white p-5 rounded-2xl flex flex-col gap-3">
        <div className="header border-b-2 border-gray-300 pb-2 flex justify-between">
          <p className="font-bold">SIB Referral Slip</p>
          <button className="font-bold" onClick={onClose} >X</button>
        </div>

        <div className="flex w-full gap-4">
          <EntryField readOnly={false} type="date" placeholder="2025-12-12" label="Date"/>
          <EntryField readOnly={false} type="text" placeholder="Your Name" label="From"/>
        </div>

        <CrossChapterSearch label="To" placeholder="Search cross chapter Name"/>

        <TextArea label="Referral" placeholder="Enter the Referral details..."/>
        <RadioButtons label="Referral Type" buttons={[{name : "Tier 1 (Inside)" , value : "tier1"} , {name : "Tier 2 (OutSide)" , value : "tier2"}]}/>
        <SelectButtons label="Referral Status" items={[{name: "Given Your card " , value : "option1"},{name: "Told them you would call" , value : "option2"} ]}/>

        <div className="flex w-full gap-4">
          <EntryField type="text" placeholder="Phone Number" label="Telephone"/>
          <EntryField type="email" placeholder="Email address" label="Email"/>
        </div>

        <TextArea label="Address" placeholder="Address Details..."/>
        <TextArea label="Comments" placeholder="Additional comments..."/>
        <HeatScale />

        <div className="mt-2 flex w-full justify-end gap-4 border-t-2 border-gray-300 pt-3">
          <FilterButton content="Close" bg="bg-white" hover="hover:bg-gray-200" onClick={onClose}/>
          <FilterButton content="Submit" bg="bg-yellow-300" hover="hover:bg-yellow-400" />
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
