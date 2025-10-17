import React from 'react';
import EntryField from '../Components/EntryField';
import RadioButtons from '../Components/RadioButtons';
import SelectButtons from '../Components/SelectButtons';
import FilterButton from '../Members/Components/FilterButton';

function ButtonPage({ onClose = () => {} }) {
  return (
    <div className="container flex flex-1 items-center justify-around bg-gray-50 dark:bg-gray-900 min-h-screen p-4">
      <div className="max-w-[87.5%] bg-white dark:bg-gray-800 p-5 rounded-2xl flex flex-col gap-3 shadow-lg">
        
        {/* Header */}
        <div className="header border-b-2 border-gray-300 dark:border-gray-600 pb-2 flex justify-between">
          <p className="font-bold text-gray-900 dark:text-gray-100">Visitors Slip</p>
          <button
            className="font-bold text-gray-900 dark:text-gray-100 hover:text-red-500 dark:hover:text-red-400"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="header flex gap-2 my-4 justify-between w-full">
          <button className="text-sm font-semibold border-b-4 border-gray-400 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-400 pb-2 mr-4 dark:text-gray-100">
            Register someone else (To visit my chapter)
          </button>
          <button className="text-sm font-semibold border-b-4 border-gray-400 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-400 pb-2 dark:text-gray-100">
            Register Myself (To visit Another chapter)
          </button>
        </div>

        {/* Registration Details */}
        <div className="header border-b-2 border-gray-300 dark:border-gray-600 pb-2 mt-5">
          <p className="font-semibold text-gray-900 dark:text-gray-100">Registration Details</p>
        </div>

        <div className="flex w-full gap-4">
          <EntryField type="text" placeholder="Chapter Name" label="Registration Chapter" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
          <EntryField type="date" placeholder="2025-12-12" label="Visit Date" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
        </div>

        {/* Visitor Details */}
        <div className="header border-b-2 border-gray-300 dark:border-gray-600 pb-2 mt-10">
          <p className="font-semibold text-gray-900 dark:text-gray-100">Visitor Details</p>
        </div>

        <div className="flex w-full gap-4">
          <EntryField type="text" placeholder="Enter Title" label="Title (Optional)" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
          <EntryField type="text" placeholder="Enter First Name" label="First Name" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
        </div>

        <div className="flex w-full gap-4">
          <EntryField type="email" placeholder="Enter Email Address" label="Email Address" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
          <EntryField type="tel" placeholder="Enter Phone Number" label="Phone Number" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
        </div>

        <EntryField type="text" placeholder="Enter Company Name" label="Company Name (Optional)" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>

        <div className="flex w-full gap-4">
          <EntryField type="text" placeholder="" label="Address Line1 (Optional)" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
          <EntryField type="text" placeholder="" label="Address Line2 (Optional)" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
        </div>

        <div className="flex w-full gap-4">
          <EntryField type="text" placeholder="" label="City (Optional)" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
          <EntryField type="text" placeholder="" label="State (Optional)" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
          <EntryField type="text" placeholder="" label="Post Code" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>
        </div>

        {/* Other Details */}
        <div className="header border-b-2 border-gray-300 dark:border-gray-600 pb-2 mt-10">
          <p className="font-semibold text-gray-900 dark:text-gray-100">Other Details</p>
        </div>

        <EntryField type="text" placeholder="Enter Category" label="Category" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"/>

        <RadioButtons
          label="Visitor Type"
          buttons={[
            { name: 'Visitor', value: 'Visitor' },
            { name: 'Guest', value: 'Guest' },
            { name: 'Substitute', value: 'Substitute' },
          ]}
        />

        <SelectButtons
          label=""
          items={[{ name: 'I confirm to allow the system to send invitations to the visitor on my behalf' }]}
        />

        {/* Footer Buttons */}
        <div className="mt-2 flex w-full justify-end gap-4 border-t-2 border-gray-300 dark:border-gray-600 pt-3">
          <FilterButton content="Close" bg="bg-white dark:bg-gray-700" hover="hover:bg-gray-200 dark:hover:bg-gray-600" onClick={onClose}/>
          <FilterButton content="Submit" bg="bg-yellow-300 dark:bg-yellow-500" hover="hover:bg-yellow-400 dark:hover:bg-yellow-600"/>
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;
