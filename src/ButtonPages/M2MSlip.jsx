import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import TextArea from "../Components/TextArea";
import FilterButton from "../Members/Components/FilterButton";

function ButtonPage() {

  return (
    <div className="container flex flex-1 items-center justify-around">
      <div className="max-w-[87.5%] bg-white p-5 rounded-2xl flex flex-col gap-3">
        <div className="header border-b-2 border-gray-300 pb-2">
          <p className="font-bold">SIB M to M Slip</p>
        </div>

        <EntryField type="text" placeholder="Chapter Name" label="Chapter"/>

        <CrossChapterSearch label="Met with" placeholder="Search cross chapter"/>

        <EntryField type="text" placeholder="Enter Invited member name" label="Invited By"/>
        <EntryField placeholder="Date" label="Date"/>
        <EntryField type="text" placeholder="Meeting Location" label="Location"/>

        <TextArea label="Topic of conversation " placeholder="Describe Topics discussed..."/>

        <div className="mt-2 flex w-full justify-end gap-4 border-t-2 border-gray-300 pt-3">
          <FilterButton content="Close" bg="bg-white" hover="hover:bg-gray-200" />
          <FilterButton content="Submit" bg="bg-yellow-300" hover="hover:bg-yellow-400" />
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
