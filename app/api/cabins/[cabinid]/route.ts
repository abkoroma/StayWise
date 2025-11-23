import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: NextRequest, context: { params: { cabinid: string } } ) {


    const { cabinid } = context.params;
    const cabinId = parseInt(cabinid);

    try {
        const [cabin, bookedDates] = await Promise.all([
            getCabin(cabinId), getBookedDatesByCabinId(cabinId)
        ]);
        return NextResponse.json({ cabin, bookedDates  });
    } catch {
        return NextResponse.json({ message: "Cabin not found" });
    }
}