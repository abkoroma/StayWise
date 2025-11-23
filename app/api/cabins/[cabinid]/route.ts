import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { CabinInterface } from "@/app/_utils/pages_interface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest, 
    context: { params: { cabinid: string } } 
): Promise<
    NextResponse<{ cabin: CabinInterface; bookedDates: Date[] }> | 
    NextResponse<{ message: string }>
> {

    const { cabinid } = context.params;
    //const cabinId = parseInt(cabinid);

    try {
        const cabinId = parseInt(cabinid, 10);
        const [cabin, bookedDates] = await Promise.all([
            getCabin(cabinId), getBookedDatesByCabinId(cabinId)
        ]);
        return NextResponse.json({ cabin, bookedDates  });
    } catch {
        return NextResponse.json({ message: "Cabin not found" });
    }
}