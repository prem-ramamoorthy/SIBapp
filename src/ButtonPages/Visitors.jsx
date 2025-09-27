import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import RadioButtons from "../Components/RadioButtons";
import SelectButtons from "../Components/SelectButtons";
import FilterButton from "../Members/Components/FilterButton";

function ButtonPage() {

  return (
    <div className="container flex flex-1 items-center justify-around">
      <div className="max-w-[87.5%] bg-white p-5 rounded-2xl flex flex-col gap-3">
        <div className="header border-b-2 border-gray-300 pb-2">
          <p className="font-bold">Visitors Slip</p>
        </div>

        <div className="header flex gap-2 my-4 justify-between w-full">
          <button className="text-sm font-semibold border-b-3 border-gray-400 hover:border-amber-300 pb-2 mr-4">Register someone else (To visit my chapter)</button>
          <button className=" text-sm font-semibold  border-b-3 border-gray-400 hover:border-amber-300 pb-2">Register Myself (To visit Another chapter)</button>
        </div>

        <div className="header border-b-2 border-gray-300 pb-2 mt-5">
          <p className="font-semibold">Registration Details</p>
        </div>

        <div className="flex w-full gap-4">
          <EntryField type="text" placeholder="Chapter Name" label="Registration Chapter"/>
          <EntryField type="date" placeholder="2025-12-12" label="Visit Date"/>
        </div>

        <div className="header border-b-2 border-gray-300 pb-2 mt-10">
          <p className="font-semibold">Visitor Details</p>
        </div>

         <div className="flex w-full gap-4">
          <EntryField type="text" placeholder="Enter Title" label="Title (Optional)" />
          <EntryField type="text" placeholder="Enter First Name" label="First Name"/>
        </div>

        <div className="flex w-full gap-4">
          <EntryField type="email" placeholder="Enter Email Address" label="Email Address" />
          <EntryField type="phone" placeholder="Enter Phone Number" label="Phone Number"/>
        </div>

        <EntryField type="text" placeholder="Enter Company Name" label="Company Name (Optional)"/>

        <div className="flex w-full gap-4">
          <EntryField type="text" placeholder="" label="Address Line1 (Optional)"/>
          <EntryField type="text" placeholder="" label="Address Line2 (Optional)"/>
        </div>

        <div className="flex w-full gap-4">
          <EntryField type="text" placeholder="" label="City (Optional)"/>
          <EntryField type="text" placeholder="" label="State (Optional)"/>
          <EntryField type="text" placeholder="" label="Post Code (Optional)"/>
        </div>

        <div className="header border-b-2 border-gray-300 pb-2 mt-10">
          <p className="font-semibold">Other Details</p>
        </div>

        <EntryField type="text" placeholder="Enter Category" label="Category"/>
        
        <RadioButtons label="Visitor Type" buttons={[{name:"Visitor" , value : "Visitor"},{name:"Guest", value :"Guest" },{name:"Subtitute", value : "Subtitute"}]}/>
        <SelectButtons label="" items={[{name : "I confirm to allow the system to send invitations to the visitor on my behalf"}]}/>

        <div className="mt-2 flex w-full justify-end gap-4 border-t-2 border-gray-300 pt-3">
          <FilterButton content="Close" bg="bg-white" hover="hover:bg-gray-200" />
          <FilterButton content="Submit" bg="bg-yellow-300" hover="hover:bg-yellow-400" />
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
