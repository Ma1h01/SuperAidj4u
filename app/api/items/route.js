import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // title,
    // categoryId,
    // sku,
    // barcode,
    // qty,
    // unitId,
    // brandId,
    // supplierId,
    // buyingPrice,
    // sellingPrice,
    // reOrderPoint,
    // warehouseId,
    // imageUrl,
    // weight,
    // diemensions,
    // taxRate,
    // description,
    const data = await request.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create a Item",
      },
      {
        status: 500,
      },
    );
  }
}
