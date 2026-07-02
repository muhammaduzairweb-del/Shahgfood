import { NextResponse } from "next/server";
import { createOrder, listOrders, type OrderItem } from "@/lib/orders-store";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const branch = searchParams.get("branch") || undefined;
  return NextResponse.json({ orders: listOrders(branch) });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items: OrderItem[] = Array.isArray(body.items) ? body.items : [];
    if (!items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    const order = createOrder({
      branch: body.branch || "F-10 Markaz",
      city: body.city || "Islamabad",
      customer: {
        name: body.customer?.name || "",
        phone: body.customer?.phone || "",
        address: body.customer?.address || "",
        notes: body.customer?.notes || "",
      },
      items,
      subtotal: Number(body.subtotal) || 0,
      delivery: Number(body.delivery) || 0,
      tax: Number(body.tax) || 0,
      total: Number(body.total) || 0,
      lang: body.lang === "ur" ? "ur" : "en",
      dest: body.dest,
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
