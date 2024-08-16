import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function POST(request) {
  try {
    const {
      referenceNumber,
      itemId,
      transferStockQty,
      givingWarehouseId,
      receivingWarehouseId,
      notes,
    } = await request.json();
    const adjustment = await db.transferStockAdjustment.create({
      data: {
        referenceNumber,
        itemId,
        transferStockQty: parseInt(transferStockQty),
        givingWarehouseId,
        receivingWarehouseId,
        notes,
      },
    });
    console.log(adjustment);
    return NextResponse.json(adjustment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Failed to create a adjustment with error: ${error}`,
      },
      {
        status: 500,
      },
    );
  }
}


export async function GET(request) {
  try {
    const transferStockAdjustments = await db.transferStockAdjustment.findMany({
      orderBy: { createdAt: "desc" }, // Order by creation date in descending order
    });
    if (!transferStockAdjustments) {
      return NextResponse.json(
        {
          message: "No transfer stock adjustments found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(transferStockAdjustments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch transfer stock adjustments",
      },
      {
        status: 500,
      },
    );
  }
}
