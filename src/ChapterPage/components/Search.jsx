import { Search } from "lucide-react";

function SearchInput() {
    return (
        <div className="flex items-center w-50 h-9 rounded-full border border-gray-300">
            <Search className="text-gray-900 mr-2" />
            <input
                type="text"
                placeholder="Search Member"
                className="outline-none w-full placeholder-gray-700 text-xs"
            />
        </div>
    );
}

export default SearchInput;
