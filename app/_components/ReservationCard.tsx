import Image from "next/image";
import type { Metadata } from "next";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { isPast, isToday, format, formatDistance, parseISO } from "date-fns";
import Link from "next/link";
import DeleteReservation from "./DeleteReservation";
import { BookingInterface } from "../_utils/pages_interface";

export const metadata: Metadata = {
    title: "Reservations - StayWise",
};


export const formatDistanceFromNow = (dateStr: string) =>
    formatDistance(parseISO(dateStr), new Date(), {
      addSuffix: true,
}).replace('about ', '');
  
export default function ReservationCard({ booking, onDelete }: { booking: BookingInterface, onDelete: (id: number) => void }) {
    const {
      id,
      start_date,
      end_date,
      num_nights,
      total_price,
      num_guests,
      created_at,
      cabins: { name, image } 
    } = booking;

    const imageUrl = typeof image === "string" ? image : URL.createObjectURL(image!);
  

    return (
        <div className='flex border border-primary-800'>
            <div className='relative h-32 aspect-square'>
                <Image
                    src={imageUrl}
                    alt={`Cabin ${name}`}
                    className='object-cover border-r border-primary-800'
                    fill
                />
            </div>
    
            <div className='flex-grow px-6 py-3 flex flex-col'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-semibold'>
                        {num_nights} nights in Cabin {name}
                    </h3>
                    {isPast(new Date(start_date)) ? (
                        <span 
                            className='bg-yellow-800 text-yellow-200 h-7 px-3 uppercase 
                            text-xs font-bold flex items-center rounded-sm'
                        >
                            past
                        </span>
                        ) : (
                        <span 
                            className='bg-green-800 text-green-200 h-7 px-3 uppercase text-xs 
                            font-bold flex items-center rounded-sm'
                        >
                            upcoming
                        </span>
                    )}
                </div>
    
                <p className='text-lg text-primary-300'>
                    {format(new Date(start_date), 'EEE, MMM dd yyyy')} (
                    {isToday(new Date(start_date))
                    ? 'Today'
                    : formatDistanceFromNow(String(start_date))}
                    ) &mdash; {format(new Date(end_date), 'EEE, MMM dd yyyy')}
                </p>
        
                <div className='flex gap-5 mt-auto items-baseline'>
                    <p className='text-xl font-semibold text-accent-400'>${total_price}</p>
                    <p className='text-primary-300'>&bull;</p>
                    <p className='text-lg text-primary-300'>
                        {num_guests} guest{num_guests! > 1 && 's'}
                    </p>
                    <p className='ml-auto text-sm text-primary-400'>
                        Booked {format(new Date(String(created_at)), 'EEE, MMM dd yyyy, p')}
                    </p>
                </div>
            </div>
    
            {!isPast(start_date) ?
                <>
                    <div className='flex flex-col border-l border-primary-800 w-[100px]'>
                        <Link
                            href={`/account/reservation/edit/${id}`}
                            className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
                        >
                            <PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
                            <span className='mt-1'>Edit</span>
                        </Link>
                        <DeleteReservation onDelete={onDelete} bookingId={id} />
                    </div>
                </> : null
             }
        </div>
    );
}

