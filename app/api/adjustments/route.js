import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { referenceNumber, transferStockQty, warehouseId, notes } =
      await request.json();
    const adjustment = {
      referenceNumber,
      transferStockQty,
      warehouseId,
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
