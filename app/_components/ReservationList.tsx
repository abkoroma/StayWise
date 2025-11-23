"use client"

import { useOptimistic } from "react";
import { BookingInterface } from "../_utils/pages_interface";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

export default function ReservationList({ bookings }: { bookings: BookingInterface[] }) {

    const [optimisticBookings, optimisticDelete] = useOptimistic(
        bookings, 
        (currBookings, bookingId) => {
            return currBookings.filter((booking) => booking.id !== bookingId);
        }
    );

    async function handleDelete(bookingId: number) {
        optimisticDelete(bookingId);
        await deleteReservation(bookingId);
    }

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard booking={booking} onDelete={handleDelete} key={booking.id} />
            ))}
        </ul>
        /*<ul className="space-y-6">
            {bookings.map((booking) => (
                <ReservationCard booking={booking} onDelete={handleDelete} key={booking.id} />
            ))}
        </ul>*/
    );

}