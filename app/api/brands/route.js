import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function POST(request) {
  try {
    const { name } = await request.json();
    const brand = await db.brand.create({
      data: {
        name, // name: name => name iff both are the same
      },
    });
    console.log(brand);
    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a brand",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request) {
  try {
    const brands = await db.brand.findMany({
      orderBy: { createdAt: "desc" }, // Order by creation date in descending order
    });
    if (!brands) {
      return NextResponse.json(
        {
          message: "No brands found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(brands);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch brands",
      },
      {
        status: 500,
      },
    );
  }
}
