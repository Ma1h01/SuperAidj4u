import { NextResponse } from "next/server";
import db from "@/lib/db";
import { Description } from "@mui/icons-material";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const warehouse = await db.warehouse.findUnique({
      where: { id: id },
      include: {
        item: true,
      },
    });
    if (!warehouse) {
      return NextResponse.json(
        {
          message: "No warehouse found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(warehouse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch warehouse",
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
    const warehouse = await db.warehouse.update({
      where: { id: id },
      data: {
        name: body.name,
        location: body.location,
        description: body.description,
        warehouseType: body.warehouseType,
      },
    });
    return NextResponse.json(warehouse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to update warehouse. Something is wrong",
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
    const warehouse = await db.warehouse.delete({
      where: { id: id },
    });
    return NextResponse.json(warehouse);
  } catch (error) {
    console.error(error);
    if (error.code === "P2014") {
      return NextResponse.json(
        {
          message:
            "There's item(s) associated with this warehouse. Please delete the item(s) first",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        error,
        message: "Failed to delete warehouse. Something is wrong",
      },
      {
        status: 500,
      },
    );
  }
}
