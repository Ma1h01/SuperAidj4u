import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {    
    const data = await request.json();
    const res = await db.item.create({
      data: {
        name: data.name,
        description: data.description,
        sku: data.sku,
        barcode: data.barcode,
        quantity: parseInt(data.quantity),
        categoryId: data.categoryId,
        unitId: data.unitId,
        brandId: data.brandId,
        supplierId: data.supplierId,
        warehouseId: data.warehouseId,
        reorderPoint: parseInt(data.reorderPoint),
        buyingPrice: parseFloat(data.buyingPrice),
        sellingPrice: parseFloat(data.sellingPrice),
        weight: parseFloat(data.weight),
        dimensions: data.dimensions,
        taxRate: parseFloat(data.taxRate),
        imageUrl: data.imageUrl,
        notes: data.note,
      },
    });
    console.log(res);
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Item",
      },
      {
        status: 500,
      },
    );
  }
}


export async function GET(request) {
  try {
    const items = await db.item.findMany({
      orderBy: { createdAt: "desc" }, // Order by creation date in descending order
    });
    if (!items) {
      return NextResponse.json(
        {
          message: "No items found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch items",
      },
      {
        status: 500,
      },
    );
  }
}
