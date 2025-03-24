import { Search } from "lucide-react";
import React from "react";
import { useSearch } from "@/lib/context/SearchContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SearchInput = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    searchPlaceholder, 
    setSearchPlaceholder,
    isExactMatch,
    setIsExactMatch
  } = useSearch();
  const pathname = usePathname();

  // Update placeholder based on current route
  useEffect(() => {
    if (pathname.startsWith('/inventory')) {
      setSearchPlaceholder("Search warehouses...");
    } else if (pathname.startsWith('/sales')) {
      setSearchPlaceholder("Search in sales...");
    } else {
      setSearchPlaceholder("Search...");
    }
  }, [pathname, setSearchPlaceholder]);

  const handleSearch = (e) => {
    e.preventDefault();
    // You can add additional search logic here if needed
  };

  return (
    <form className="hidden sm:block" onSubmit={handleSearch}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            id="global-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 px-20 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="exact-match"
            checked={isExactMatch}
            onChange={(e) => setIsExactMatch(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="exact-match" className="text-sm text-gray-600 dark:text-gray-400">
            Exact match
          </label>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
