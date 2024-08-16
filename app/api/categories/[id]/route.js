import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const category = await db.category.findUnique({
      where: { id: id },
      include: {
        item: true,
      },
    });
    if (!category) {
      return NextResponse.json(
        {
          message: "No category found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch category",
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
    const category = await db.category.update({
      where: { id: id },
      data: {
        name: body.name,
        description: body.description,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to update category. Something is wrong",
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
    const category = await db.category.delete({
      where: { id: id },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    if (error.code === "P2014") {
      return NextResponse.json(
        {
          message:
            "There's item(s)/adjustment(s) associated with this category. Please delete the item(s)/adjustment(s) first",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        error,
        message: "Failed to delete category. Something is wrong",
      },
      {
        status: 500,
      },
    );
  }
}
