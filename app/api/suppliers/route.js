import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function POST(request) {
  try {
    const {
      name,
      contactPerson,
      phone,
      email,
      address,
      supplierCode,
      taxID,
      paymentTerms,
    } = await request.json();
    const supplier = await db.supplier.create({
      data: {
        name,
        contactPerson,
        phone,
        email,
        address,
        supplierCode,
        taxID,
        paymentTerms,
      },
    });
    console.log(supplier);
    return NextResponse.json(supplier);
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
    const suppliers = await db.supplier.findMany({
      orderBy: { createdAt: "desc" }, // Order by creation date in descending order
    });
    if (!suppliers) {
      return NextResponse.json(
        {
          message: "No suppliers found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(suppliers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch suppliers",
      },
      {
        status: 500,
      },
    );
  }
}
