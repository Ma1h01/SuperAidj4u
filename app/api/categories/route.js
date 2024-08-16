import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function POST(request) {
  try {
    const { name, description } = await request.json();
    const category = await db.category.create({
      data: {
        name, // name: name => name iff both are the same
        description,
      },
    });    
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a category",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request) {
  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: "desc" }, // Order by creation date in descending order
    });
    if (!categories) {
      return NextResponse.json(
        {
          message: "No categories found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch categories",
      },
      {
        status: 500,
      },
    );
  }
}
