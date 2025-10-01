import ActivityField from "../../MyActivity/Components/ActivityField";
import ActivityBadge from "../../MyActivity/Components/ActivityBadge";

function Meeting({ header = false, content = {
    sno : 1,
    direction: "Given",
    name: "yonesh Murugan",
    category: "Category Name",
    date: "20 sept 2025",
    given: 201,
    received: 123,
    business: "25L"
} }) {
    if (header) {
        const headers = ["S.No", "Member Name", "Category", "Joined Date", "Referrals Given", "Referrals Received", "Business Generated"];
        return (
            <div className="sticky top-0 flex justify-around bg-gradient-to-r from-yellow-300 to-yellow-400 shadow-md rounded-t-2xl py-4 px-2 select-none w-fit lg:w-full xl:w-full">
                {headers.map((element, index) => (
                    <p
                        key={index}
                        className="min-w-[120px] font-semibold text-gray-900 text-center mx-2 tracking-wide"
                    >
                        {element}
                    </p>
                ))}
            </div>
        );
    }
    return (
        <div className="flex justify-around items-center py-3 px-2 w-max lg:w-full xl:w-full cursor-auto rounded-b-lg transition-colors hover:bg-yellow-50 even:bg-gray-50 odd:bg-gray-300 shadow-sm select-text">
            <ActivityField data={content.sno} className="overflow-x-hidden font-semibold min-w-[120px] text-center" />
            <ActivityField data={content.name} className="font-bold min-w-[120px] text-center" />
            <ActivityField data={content.category} className="font-semibold min-w-[120px] text-center" />
            <ActivityField data={content.date} className="overflow-x-hidden min-w-[120px] text-center" />
            <ActivityField data={content.given} className="overflow-x-hidden font-semibold min-w-[120px] text-center" />
            <ActivityField data={content.received} className="overflow-x-hidden font-semibold min-w-[120px] text-center" />
            <ActivityField data={content.business} className="overflow-x-hidden font-semibold min-w-[120px] text-center" />
        </div>
    );
}

export default Meeting;
