import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const addStockAdjustment = await db.addStockAdjustment.findUnique({
      where: { id: id },
      include: {
        item: true,
      },
    });
    if (!addStockAdjustment) {
      return NextResponse.json(
        {
          message: "No add stock adjustment found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(addStockAdjustment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch add stock adjustment",
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
    const addStockAdjustment = await db.addStockAdjustment.update({
      where: { id: id },
      data: {
        referenceNumber: body.referenceNumber,
        addStockQty: body.addStockQty,
        itemId: body.itemId,
        receivingWarehouseId: body.receivingWarehouseId,
        notes: body.notes,
      },
    });
    return NextResponse.json(addStockAdjustment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to update add stock adjustment. Something is wrong",
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
    const addStockAdjustment = await db.addStockAdjustment.delete({
      where: { id: id },
    });
    return NextResponse.json(addStockAdjustment);
  } catch (error) {
    console.error(error);
    if (error.code === "P2014") {
      return NextResponse.json(
        {
          message:
            "There's item(s) associated with this add stock adjustment. Please delete the item(s) first",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        error,
        message: "Failed to delete add stock adjustment. Something is wrong",
      },
      {
        status: 500,
      },
    );
  }
}
