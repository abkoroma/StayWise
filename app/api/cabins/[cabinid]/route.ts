import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { NextRequest } from "next/server";

export async function GET( request: NextRequest, context: { params: { cabinid: string } } ) {


    const { cabinid } =  await context.params;
    const cabinId = parseInt(cabinid);

    try {
        const [cabin, bookedDates] = await Promise.all([
            getCabin(cabinId), getBookedDatesByCabinId(cabinId)
        ]);
        return Response.json({ cabin, bookedDates  });
    } catch {
        return Response.json({ message: "Cabin not found" });
    }
}