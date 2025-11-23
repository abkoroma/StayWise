"use server"

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "../_lib/auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export async function updateGuestProfile(formData: FormData) {
    
    const session = await auth();

    if (!session) {
        throw new Error("You must be logged in")
    }

    const national_id = formData.get("national_id");

    const rawValue = formData.get("nationality");
    let nationality = "";
    let country = "";

    if (typeof rawValue === "string") {
        [nationality, country] = rawValue.split("%");
    } else {
        throw new Error("Invalid nationality format");
    }

    if (typeof national_id !== "string" || !/^[a-zA-Z0-9]{6,12}$/.test(national_id)) {
        throw new Error("Please provide a valid national ID");
    }

    const updateData = { national_id, country, nationality };

    const { error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user?.id)
    
      if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
      }

      revalidatePath('/account/profile')


}

export async function deleteReservation(bookingId: number) {
    const session = await auth();

    if (!session) {
        throw new Error("You must be logged in")
    }

    const guestBookings = await getBookings(Number(session.user?.id));
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(bookingId)) {
        throw new Error("You're not allowed to delete this booking");
    }

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }

    revalidatePath('/account/reservation');

}

export async function updateBooking(formData: FormData) {
    const session = await auth();

    if (!session) {
        throw new Error("You must be logged in")
    }

    const bookingId = Number(formData.get("bookingId"));
    const guestBookings = await getBookings(Number(session.user?.id));
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(bookingId)) {
        throw new Error("You're not allowed to update this booking");
    }

    const updateData = {
        num_guests: Number(formData.get("num_guests")),
        observations: formData.get("observations")?.slice(0, 1000),
    }

    const {  error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  revalidatePath(`/account/reservation/edit/${bookingId}`);
  revalidatePath('/account/reservation');
  redirect('/account/reservation');

}

export async function createBooking(bookingData: {
    start_date: Date | undefined;
    end_date: Date | undefined;
    num_nights: number;
    cabin_price: number;
    cabin_id: number | undefined;
}, formData: FormData) {

    const session = await auth();

    if (!session) {
        throw new Error("You must be logged in")
    }

    const newBooking = {
        ...bookingData,
        guest_id: session.user?.id,
        num_guests: Number(formData.get("num_guests")),
        observations: formData.get("observations")?.slice(0, 1000),
        extras_price: 0,
        total_price: bookingData.cabin_price,
        status: "unconfirmed",
        is_paid: false,
        has_breakfast: false,
    }

    const { error } = await supabase
    .from('bookings')
    .insert([newBooking])

    if (error) {
        console.error(error);
        throw new Error('Booking could not be created');
    }

    revalidatePath(`/cabins/${bookingData.cabin_id}`);
    redirect('/cabins/thankyou');

}

