import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import RadioButtons from "../Components/RadioButtons";
import TextArea from "../Components/TextArea";
import FilterButton from "../Members/Components/FilterButton";

function ButtonPage({ onClose = () => {} }) {

  return (
    <div className="container flex flex-1 items-center justify-around">
      <div className="max-w-[87.5%] bg-white p-5 rounded-2xl flex flex-col gap-3">
        <div className="header border-b-2 border-gray-300 pb-2 flex justify-between">
          <p className="font-bold">SIB TYFTB Slip</p>
          <button className="font-bold" onClick={onClose} >X</button>
        </div>

        <div className="flex w-full gap-4">
          <EntryField type="text" placeholder="Chapter Name" label="Chapter"/>
          <EntryField placeholder="03-sep-2025" label="Date" type="date"/>
        </div>

        <CrossChapterSearch label="Thank you to" placeholder="Select a member"/>

        <EntryField type="text" placeholder="Enter Amount in INR" label=""/>

        <RadioButtons label="Business Type" buttons={[{name:"New" , value:"new" }, {name:"Repeat" , value:"repeat" }]}/>
        <RadioButtons label="Referral Type" buttons={[{name : "Tier 1 (Inside)" , value : "tier1"} , {name : "Tier 2 (OutSide)" , value : "tier2"},{name : "Tier 3+" , value : "tier3"}]}/>

        <TextArea label="Comments" placeholder="Additional Comments..."/>

        <div className="mt-2 flex w-full justify-end gap-4 border-t-2 border-gray-300 pt-3">
          <FilterButton content="Close" bg="bg-white" hover="hover:bg-gray-200" onClick={onClose}/>
          <FilterButton content="Submit" bg="bg-yellow-300" hover="hover:bg-yellow-400" />
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
