import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const transferStockAdjustment = await db.transferStockAdjustment.findUnique(
      {
        where: { id: id },
        include: {
          item: true,
        },
      },
    );
    if (!transferStockAdjustment) {
      return NextResponse.json(
        {
          message: "No transfer stock adjustment found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(transferStockAdjustment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch transfer stock adjustment",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const transferStockAdjustment = await db.transferStockAdjustment.update({
      where: { id: id },
      data: {
        referenceNumber: body.referenceNumber,
        transferStockQty: body.transferStockQty,
        itemId: body.itemId,
        givingWarehouseId: body.givingWarehouseId,
        receivingWarehouseId: body.receivingWarehouseId,
        notes: body.notes,
      },
    });
    return NextResponse.json(transferStockAdjustment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to update add transfer adjustment. Something is wrong",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const transferStockAdjustment = await db.transferStockAdjustment.delete({
      where: { id: id },
    });
    return NextResponse.json(transferStockAdjustment);
  } catch (error) {
    console.error(error);
    if (error.code === "P2014") {
      return NextResponse.json(
        {
          message:
            "There's item(s) associated with this transfer stock adjustment. Please delete the item(s) first",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        error,
        message:
          "Failed to delete transfer stock adjustment. Something is wrong",
      },
      {
        status: 500,
      },
    );
  }
}
