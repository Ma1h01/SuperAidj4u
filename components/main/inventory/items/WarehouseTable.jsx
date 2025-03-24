"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useSearch } from "@/lib/context/SearchContext";

const ITEMS_PER_PAGE = 8;

const WarehouseTable = ({ warehouse, adjustments }) => {
  console.log("WarehouseTable received:", { warehouse, adjustments });

  const [currentPage, setCurrentPage] = useState(1);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "modifiedAt",
    direction: "desc",
  });
  const { searchTerm, isExactMatch } = useSearch();

  useEffect(() => {
    console.log("Adjustments updated:", adjustments);
  }, [adjustments]);

  // First filter based on warehouse name (global search)
  const globallyFilteredAdjustments = searchTerm 
    ? isExactMatch
      ? warehouse.name === searchTerm
        ? adjustments
        : []
      : warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
        ? adjustments
        : []
    : adjustments;

  // Then filter based on local search term
  const filteredAdjustments = globallyFilteredAdjustments.filter((adjustment) =>
    Object.values(adjustment).some((value) =>
      String(value).toLowerCase().includes(localSearchTerm.toLowerCase())
    )
  );

  console.log("Filtered adjustments:", filteredAdjustments);

  const sortedAdjustments = [...filteredAdjustments].sort((a, b) => {
    if (sortConfig.key === "modifiedAt") {
      return sortConfig.direction === "asc"
        ? new Date(a.modifiedAt) - new Date(b.modifiedAt)
        : new Date(b.modifiedAt) - new Date(a.modifiedAt);
    }
    if (sortConfig.key === "quantityBefore" || sortConfig.key === "quantityAfter") {
      return sortConfig.direction === "asc"
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key];
    }
    return sortConfig.direction === "asc"
      ? String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]))
      : String(b[sortConfig.key]).localeCompare(String(a[sortConfig.key]));
  });

  console.log("Sorted adjustments:", sortedAdjustments);

  // Reset to first page when either search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [localSearchTerm, searchTerm]);

  const totalPages = Math.ceil(sortedAdjustments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAdjustments = sortedAdjustments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  console.log("Paginated adjustments:", paginatedAdjustments);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getQuantityChangeIndicator = (before, after) => {
    if (after > before) {
      return (
        <div className="flex items-center text-green-600">
          <span>{after}</span>
          <ChevronUp className="h-4 w-4 ml-1" />
        </div>
      );
    } else if (after < before) {
      return (
        <div className="flex items-center text-red-600">
          <span>{after}</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </div>
      );
    }
    return <span>{after}</span>;
  };

  return (
    <div className={`space-y-4 bg-white rounded-lg shadow-sm border border-slate-200 p-4 ${
      searchTerm && (isExactMatch 
        ? warehouse.name !== searchTerm
        : !warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())) 
      ? 'hidden' 
      : ''
    }`}>
      <div className="flex items-center justify-between">
        <Link 
          href={`/inventory/${warehouse.id}`}
          className="text-lg font-semibold text-slate-900 hover:text-slate-700 transition-colors"
        >
          {warehouse.name}
        </Link>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Filter products..."
            value={localSearchTerm}
            onChange={(e) => {
              setLocalSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-8 bg-slate-50 border-slate-200 focus:border-slate-300"
          />
        </div>
      </div>

      <div className="rounded-md border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead
                className="cursor-pointer hover:bg-slate-100 text-slate-600 font-medium"
                onClick={() => requestSort("productId")}
              >
                <div className="flex items-center space-x-1">
                  <span>Product ID</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100 text-slate-600 font-medium"
                onClick={() => requestSort("productName")}
              >
                <div className="flex items-center space-x-1">
                  <span>Product Name</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100 text-slate-600 font-medium"
                onClick={() => requestSort("quantityBefore")}
              >
                <div className="flex items-center space-x-1">
                  <span>Before</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100 text-slate-600 font-medium"
                onClick={() => requestSort("quantityAfter")}
              >
                <div className="flex items-center space-x-1">
                  <span>After</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-slate-600 font-medium">Description</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100 text-slate-600 font-medium"
                onClick={() => requestSort("modifiedAt")}
              >
                <div className="flex items-center space-x-1">
                  <span>Modified</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adjustments.length === 0 ? (
              <TableRow>
                <TableCell colSpan="5" className="px-4 py-6 text-center text-slate-500">
                  No adjustments found for this warehouse
                </TableCell>
              </TableRow>
            ) : (
              paginatedAdjustments.map((adjustment, index) => (
                <TableRow 
                  key={adjustment.id} 
                  className={`hover:bg-slate-50 ${
                    index !== paginatedAdjustments.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <TableCell className="font-medium text-slate-900">{adjustment.productId}</TableCell>
                  <TableCell className="text-slate-900">{adjustment.productName}</TableCell>
                  <TableCell className="text-slate-900">{adjustment.quantityBefore}</TableCell>
                  <TableCell className="text-slate-900">
                    {getQuantityChangeIndicator(adjustment.quantityBefore, adjustment.quantityAfter)}
                  </TableCell>
                  <TableCell className="text-slate-600">{adjustment.description}</TableCell>
                  <TableCell className="text-slate-600">
                    {format(new Date(adjustment.modifiedAt), "MMM d, HH:mm")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${
              currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${
              currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default WarehouseTable; 