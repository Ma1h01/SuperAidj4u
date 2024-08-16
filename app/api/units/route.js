import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function POST(request) {
  try {
    const { name, abbreviation } = await request.json();
    const unit = await db.unit.create({
      data: {
        name,
        abbreviation,
      },
    });    
    return NextResponse.json(unit);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a unit",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request) {
  try {
    const units = await db.unit.findMany({
      orderBy: { createdAt: "desc" }, // Order by creation date in descending order
    });
    if (!units) {
      return NextResponse.json(
        {
          message: "No units found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(units);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch units",
      },
      {
        status: 500,
      },
    );
  }
}
