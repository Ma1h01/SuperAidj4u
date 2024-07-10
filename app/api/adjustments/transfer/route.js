import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      transferStockQty,
      transferingWarehouseId,
      receivingWarehouseId,
      notes,
    } = await request.json();
    const adjustment = {
      transferStockQty,
      transferingWarehouseId,
      receivingWarehouseId,
      notes,
    };
    console.log(adjustment);
    return NextResponse.json(adjustment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a adjustment",
      },
      {
        status: 500,
      },
    );
  }
}
