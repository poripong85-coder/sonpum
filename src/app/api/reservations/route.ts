import { NextResponse } from "next/server";
import {
  createReservation,
  listReservations,
  ReservationError,
} from "@/lib/reservations";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ reservations: listReservations() });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  try {
    const reservation = createReservation(
      body as Parameters<typeof createReservation>[0],
    );
    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    if (error instanceof ReservationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}
