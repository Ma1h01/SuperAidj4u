import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const unit = await db.unit.findUnique({
      where: { id: id },
      include: {
        item: true,
      },
    });
    if (!unit) {
      return NextResponse.json(
        {
          message: "No unit found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(unit);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch unit",
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
    const unit = await db.unit.update({
      where: { id: id },
      data: {
        name: body.name,
        abbreviation: body.description,
      },
    });
    return NextResponse.json(unit);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to update unit. Something is wrong",
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
    const unit = await db.unit.delete({
      where: { id: id },
    });
    return NextResponse.json(unit);
  } catch (error) {
    console.error(error);
    if (error.code === "P2014") {
      return NextResponse.json(
        {
          message:
            "There's item(s) associated with this unit. Please delete the item(s) first",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        error,
        message: "Failed to delete unit. Something is wrong",
      },
      {
        status: 500,
      },
    );
  }
}
