import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function POST(request) {
  try {
    const {
      referenceNumber,
      addStockQty,
      itemId,
      receivingWarehouseId,
      notes,
    } = await request.json();
    const adjustment = await db.addStockAdjustment.create({
      data: {
        referenceNumber,
        addStockQty: parseInt(addStockQty), //  This is needed b/c input was converted to a string
        receivingWarehouseId,
        itemId,
        notes,
      },
    });

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
    const addStockAdjustments = await db.addStockAdjustment.findMany({
      orderBy: { createdAt: "desc" }, // Order by creation date in descending order
    });
    if (!addStockAdjustments) {
      return NextResponse.json(
        {
          message: "No add stock adjustments found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(addStockAdjustments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch add stock adjustments",
      },
      {
        status: 500,
      },
    );
  }
}
