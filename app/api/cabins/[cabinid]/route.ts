import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { cabinid: string } } ) {

    const { cabinid } = params;
    const cabinId = parseInt(cabinid, 10);

    try {
        //const cabinId = parseInt(cabinid, 10);
        const [cabin, bookedDates] = await Promise.all([
            getCabin(cabinId), getBookedDatesByCabinId(cabinId)
        ]);
        return NextResponse.json({ cabin, bookedDates  });
    } catch {
        return NextResponse.json({ message: "Cabin not found" });
    }
}