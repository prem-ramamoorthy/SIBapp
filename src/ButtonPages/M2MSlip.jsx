import CrossChapterSearch from "../Components/CrossSearch";
import EntryField from "../Components/EntryField";
import TextArea from "../Components/TextArea";
import FilterButton from "../Members/Components/FilterButton";

function ButtonPage({ onClose = () => {} }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-fit max-w-4xl bg-white dark:bg-gray-900 rounded-2xl p-6 flex flex-col gap-4 shadow-lg border border-gray-200 dark:border-gray-700 overflow-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-gray-300 dark:border-gray-600 pb-2">
          <p className="font-bold text-lg dark:text-gray-100">SIB M to M Slip</p>
          <button
            className="font-bold text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Form Fields */}
        <EntryField type="text" placeholder="Chapter Name" label="Chapter" />
        <CrossChapterSearch label="Met with" placeholder="Search cross chapter" />
        <EntryField type="text" placeholder="Enter Invited member name" label="Invited By" />
        <EntryField placeholder="Date" label="Date" />
        <EntryField type="text" placeholder="Meeting Location" label="Location" />
        <TextArea label="Topic of conversation" placeholder="Describe Topics discussed..." />

        {/* Actions */}
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
          />
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
