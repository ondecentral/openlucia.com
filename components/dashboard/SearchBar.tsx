import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <section className="border-b border-gray-200 p-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          placeholder="Search by visitor ID, wallet address, or IP address..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </section>
  );
};

export default SearchBar;
