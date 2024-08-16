import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const item = await db.item.findUnique({
      where: { id: id }
    });
    if (!item) {
      return NextResponse.json(
        {
          message: "No item found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch item",
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
    const item = await db.item.update({
      where: { id: id },
      data: {
        name: body.name,
        description: body.description,
        categoryId: body.categoryId,
        sku: body.sku,
        barcode: body.barcode,
        quantity: body.quantity,
        unitId: body.unitId,
        brandId: body.brandId,
        warehouseId: body.warehouseId,
        sellingPrice: body.sellingPrice,
        buyingPrice: body.buyingPrice,
        supplierId: body.supplierId,
        reorderPoint: body.reorderPoint,
        imageUrl: body.imageUrl,
        weight: body.weight,
        weightUnit: body.weightUnit,
        taxRate: body.taxRate,
        notes: body.notes,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to update item. Something is wrong",
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
    const item = await db.item.delete({
      where: { id: id },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    if (error.code === "P2014") {
      return NextResponse.json(
        {
          message:
            "There's item(s) associated with this item. Please delete the item(s) first",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        error,
        message: "Failed to delete item. Something is wrong",
      },
      {
        status: 500,
      },
    );
  }
}
