"use client";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search...");
  const [isExactMatch, setIsExactMatch] = useState(false);

  const value = {
    searchTerm,
    setSearchTerm,
    searchPlaceholder,
    setSearchPlaceholder,
    isExactMatch,
    setIsExactMatch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
} 