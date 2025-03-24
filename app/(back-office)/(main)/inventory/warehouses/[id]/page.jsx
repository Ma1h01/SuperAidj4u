"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import FixedHeader from "@/components/main/inventory/FixedHeader";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { getData } from "@/lib/getDataRequest";
import { WAREHOUSE_SERVER_BASE_URL } from "@/lib/constants";

const ITEMS_PER_PAGE = 10;

export default function WarehouseInventory() {
  const params = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "updatedAt",
    direction: "desc",
  });

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const data = await getData(`${WAREHOUSE_SERVER_BASE_URL}/${params.id}`);
        setWarehouse(data);
        setItems(data.item || []);
      } catch (error) {
        console.error("Error fetching warehouse:", error);
      }
    };

    fetchWarehouse();
  }, [params.id]);

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortConfig.key === "updatedAt") {
      return sortConfig.direction === "asc"
        ? new Date(a.updatedAt) - new Date(b.updatedAt)
        : new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    if (sortConfig.key === "quantity" || sortConfig.key === "sellingPrice" || sortConfig.key === "buyingPrice") {
      return sortConfig.direction === "asc"
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key];
    }
    return sortConfig.direction === "asc"
      ? String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]))
      : String(b[sortConfig.key]).localeCompare(String(a[sortConfig.key]));
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  if (!warehouse) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <FixedHeader 
        title={warehouse.name}
        newLink={`/inventory/items/new?warehouseId=${warehouse.id}`}
        newButtonText="New Product"
      />
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Products</h2>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
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
                    onClick={() => requestSort("sku")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Product ID</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 text-slate-600 font-medium"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Product Name</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 text-slate-600 font-medium"
                    onClick={() => requestSort("quantity")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Quantity</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 text-slate-600 font-medium"
                    onClick={() => requestSort("updatedAt")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Last Modified</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-slate-600 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="5" className="px-4 py-6 text-center text-slate-500">
                      No products found in this warehouse
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-900">{item.sku}</TableCell>
                      <TableCell className="text-slate-900">{item.name}</TableCell>
                      <TableCell className="text-slate-900">{item.quantity}</TableCell>
                      <TableCell className="text-slate-600">
                        {format(new Date(item.updatedAt), "MMM d, yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        <Link href={`/inventory/items/info/${item.id}`}>
                          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                            <Eye className="h-4 w-4 mr-2" />
                            View History
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
