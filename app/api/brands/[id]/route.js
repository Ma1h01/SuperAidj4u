import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) { 
  try {
  const { id } = params;
  const brand = await db.brand.findUnique({
    where: {id: id},
    include: {
      item: true,
    }
  })
  if (!brand) {
      return NextResponse.json(
        {
          message: "No brand found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch brand",
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
    const brand = await db.brand.update({
      where: { id: id },
      data: {
        name: body.name,
      }
    });
    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to update brand. Something is wrong",        
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
    const brand = await db.brand.delete({
      where: { id: id },
    });
    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);
    if (error.code === "P2014") {
      return NextResponse.json(
        {
          message: "There's item(s) associated with this brand. Please delete the item(s) first",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        error,
        message: "Failed to delete brand. Something is wrong",
      },
      {
        status: 500,
      },
    );
  }
}