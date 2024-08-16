import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const supplier = await db.supplier.findUnique({
      where: { id: id },
      include: {
        item: true,
      },
    });
    if (!supplier) {
      return NextResponse.json(
        {
          message: "No supplier found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(supplier);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch supplier",
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
    const supplier = await db.supplier.update({
      where: { id: id },
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        address: body.address,
        supplierCode: body.supplierCode,
        paymentTerms: body.paymentTerms,
        taxID: body.taxID,
      },
    });
    return NextResponse.json(supplier);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to update supplier. Something is wrong",
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
    const supplier = await db.supplier.delete({
      where: { id: id },
    });
    return NextResponse.json(supplier);
  } catch (error) {
    console.error(error);
    if (error.code === "P2014") {
      return NextResponse.json(
        {
          message:
            "There's item(s) associated with this supplier. Please delete the item(s) first",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        error,
        message: "Failed to delete supplier. Something is wrong",
      },
      {
        status: 500,
      },
    );
  }
}
