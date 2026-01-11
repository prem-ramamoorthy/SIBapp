import React from 'react';
import ChapterStat from './Components/ChapterStat';
import CreatePresidentForm from './Components/CreatePresident';
import PresidentRoleManagement from './Components/PresidentRole';
import MemberDetailes from './Components/Memberdetails';

const ChapterDetails = () => {
    return (

        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold dark:text-white">(Chapter Name)</h1>
            </div>
            <ChapterStat />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="w-full">
                    <CreatePresidentForm />
                </div>
                <div className="w-full">
                    <PresidentRoleManagement />
                </div>
            </div>
            <div className="mt-10">
                <MemberDetailes />
            </div>
        </div>
    );
};

export default ChapterDetails;