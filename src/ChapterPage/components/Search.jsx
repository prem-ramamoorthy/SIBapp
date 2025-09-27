import { Search } from "lucide-react";

function SearchInput() {
    return (
        <div className="flex items-center w-60 h-9 rounded-full border border-gray-300 px-4">
            <Search className="text-gray-900 mr-2" />
            <input
                type="text"
                placeholder="Search Member"
                className="outline-none w-full placeholder-gray-700 text-sm"
            />
        </div>
    );
}

export default SearchInput;
