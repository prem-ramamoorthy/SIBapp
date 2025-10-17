import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import RadioButtons from "../Components/RadioButtons";
import SelectButtons from "../Components/SelectButtons";
import TextArea from "../Components/TextArea";
import HeatScale from "../Components/HeatScale";
import FilterButton from "../Members/Components/FilterButton";

function ButtonPage({ onClose = () => {} }) {
  return (
    <div className="container flex flex-1 items-center justify-center p-4">
      <div className="max-w-[87.5%] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 rounded-2xl flex flex-col gap-4 shadow-lg">
        {/* Header */}
        <div className="header border-b-2 border-gray-300 dark:border-gray-700 pb-2 flex justify-between items-center">
          <p className="font-bold text-lg">SIB Referral Slip</p>
          <button
            className="font-bold text-gray-900 dark:text-gray-100"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* Top Entry Fields */}
        <div className="flex flex-col md:flex-row w-full gap-4">
          <EntryField
            readOnly={false}
            type="date"
            placeholder="2025-12-12"
            label="Date"
          />
          <EntryField
            readOnly={false}
            type="text"
            placeholder="Your Name"
            label="From"
          />
        </div>

        {/* Cross Chapter Search */}
        <CrossChapterSearch
          label="To"
          placeholder="Search cross chapter Name"
        />

        {/* Text Areas */}
        <TextArea label="Referral" placeholder="Enter the Referral details..." />
        <RadioButtons
          label="Referral Type"
          buttons={[
            { name: "Tier 1 (Inside)", value: "tier1" },
            { name: "Tier 2 (OutSide)", value: "tier2" },
          ]}
        />
        <SelectButtons
          label="Referral Status"
          items={[
            { name: "Given Your card", value: "option1" },
            { name: "Told them you would call", value: "option2" },
          ]}
        />

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row w-full gap-4">
          <EntryField type="text" placeholder="Phone Number" label="Telephone" />
          <EntryField type="email" placeholder="Email address" label="Email" />
        </div>

        {/* Address and Comments */}
        <TextArea label="Address" placeholder="Address Details..." />
        <TextArea label="Comments" placeholder="Additional comments..." />

        {/* Heat Scale */}
        <HeatScale />

        {/* Action Buttons */}
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
          />
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
