import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function POST(request) {
  try {
    const { name, location, type, description } = await request.json();
    const warehouse = await db.warehouse.create({
      data: {
        name,
        location,
        warehouseType: type,
        description,
      },
    });
    console.log(warehouse);
    return NextResponse.json(warehouse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a warehouse",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request) {
  try {
    const warehouses = await db.warehouse.findMany({
      orderBy: { createdAt: "desc" }, // Order by creation date in descending order
    });
    if (!warehouses) {
      return NextResponse.json(
        {
          message: "No warehouses found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(warehouses);
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
