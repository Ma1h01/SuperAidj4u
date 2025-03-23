// Generate a random date within the last 24 hours
const getRandomRecentDate = () => {
  const now = new Date();
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  const date = new Date(now);
  date.setHours(date.getHours() - randomHours);
  date.setMinutes(date.getMinutes() - randomMinutes);
  return date.toISOString();
};

// Mock warehouse data
export const mockWarehouses = [
  { id: 1, name: "TikTok US East" },
  { id: 2, name: "TikTok US West" },
  { id: 3, name: "Amazon ATL" },
  { id: 4, name: "Ebay US" },
];

// Generate mock adjustments for a specific warehouse
const generateWarehouseAdjustments = (warehouseId, warehouseName) => {
  console.log(`Generating adjustments for warehouse ${warehouseId} (${warehouseName})`);
  
  const products = [
    { id: "PRD001", name: "Laptop Pro X", basePrice: 1299.99 },
    { id: "PRD002", name: "Wireless Mouse", basePrice: 29.99 },
    { id: "PRD003", name: "4K Monitor", basePrice: 499.99 },
    { id: "PRD004", name: "Mechanical Keyboard", basePrice: 159.99 },
    { id: "PRD005", name: "USB-C Hub", basePrice: 49.99 },
    { id: "PRD006", name: "External SSD 1TB", basePrice: 129.99 },
    { id: "PRD007", name: "Webcam HD", basePrice: 79.99 },
    { id: "PRD008", name: "Gaming Headset", basePrice: 89.99 },
    { id: "PRD009", name: "Printer All-in-One", basePrice: 299.99 },
    { id: "PRD010", name: "Wireless Router", basePrice: 89.99 },
  ];

  const descriptions = [
    "Stock replenishment",
    "Sales order fulfillment",
    "Damaged items adjustment",
    "Transfer to other warehouse",
    "New stock received",
    "Quality control adjustment",
    "Customer return processed",
    "Inventory count adjustment",
    "Stock transfer initiated",
    "Damaged during transit",
  ];

  const adjustments = products.map((product, index) => {
    const quantityBefore = Math.floor(Math.random() * 100) + 50;
    const quantityChange = Math.floor(Math.random() * 20) - 10;
    const quantityAfter = Math.max(0, quantityBefore + quantityChange);

    return {
      id: index + 1,
      productId: product.id,
      productName: product.name,
      warehouseId,
      warehouseName,
      quantityBefore,
      quantityAfter,
      description: descriptions[index],
      modifiedAt: getRandomRecentDate(),
    };
  });

  console.log(`Generated ${adjustments.length} adjustments for warehouse ${warehouseId}:`, adjustments);
  return adjustments;
};

// Generate mock data for all warehouses
export const mockInventoryAdjustments = [
  ...generateWarehouseAdjustments(1, "TikTok US East"),
  ...generateWarehouseAdjustments(2, "TikTok US West"),
  ...generateWarehouseAdjustments(3, "Amazon ATL"),
  ...generateWarehouseAdjustments(4, "Ebay US"),
];

console.log("Total mock inventory adjustments:", mockInventoryAdjustments.length);

// Helper function to get adjustments for a specific warehouse
export const getWarehouseAdjustments = (warehouseId) => {
  console.log(`Getting adjustments for warehouse ${warehouseId}`);
  console.log("Total available adjustments:", mockInventoryAdjustments.length);
  
  // First filter by warehouse ID
  const warehouseAdjustments = mockInventoryAdjustments.filter(
    adj => adj.warehouseId === warehouseId
  );

  console.log(`Found ${warehouseAdjustments.length} adjustments for warehouse ${warehouseId}`);

  // Then sort by modifiedAt date
  const sortedAdjustments = warehouseAdjustments.sort(
    (a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt)
  );

  console.log(`Returning ${sortedAdjustments.length} sorted adjustments for warehouse ${warehouseId}`);
  return sortedAdjustments;
}; 