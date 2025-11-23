'use client'

import { differenceInDays, isWithinInterval } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CabinInterface, SettingsInterface } from "../_utils/pages_interface";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {

    return (
        range.from &&
        range.to &&
        datesArr.some((date) =>
            isWithinInterval(date, { start: range.from ?? new Date(), end: range.to ?? new Date() })
        )
    );
}

export default function DateSelector({ settings, bookedDates, cabin }: 
    { settings: SettingsInterface; bookedDates: Date[]; cabin: CabinInterface }) {
    
    const { range, setRange, resetRange } = useReservation();

    const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;

    const { regular_price, discount } = cabin;
    const num_nights = displayRange && displayRange.from && displayRange.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
    const cabin_price  = num_nights * (regular_price - discount);

    const { min_booking, max_booking } = settings;

    const validBookedDates = bookedDates.map((date) => new Date(date));

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                classNames={{
                    selected: `border-none`,
                    range_start: `bg-accent-500 rounded-l-3xl`,
                    range_middle: `bg-accent-500`,
                    range_end: `bg-accent-500 rounded-r-3xl`
                }}
                styles={{
                    months: { width: "30rem" },
                    day: { width: "32px", height: "32px" },
                    day_button: { width: "30px", height: "30px" }
                }}
                onSelect={setRange}
                selected={displayRange}
                mode="range"
                min={min_booking}
                max={max_booking}
                startMonth={new Date()}
                endMonth={new Date(new Date().getFullYear(), 5 * 12)}
                captionLayout="dropdown"
                numberOfMonths={2}
                required
                disabled={[{ before: new Date() }, ...validBookedDates.map((date) => ({ from: date, to: date }))]}
            />

            <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
                <div className="flex items-baseline gap-6">
                    <p className="flex gap-2 items-baseline">
                        {discount > 0 ? (
                        <>
                            <span className="text-2xl">${regular_price - discount}</span>
                            <span className="line-through font-semibold text-primary-700">
                                ${regular_price}
                            </span>
                        </>
                        ) : (
                            <span className="text-2xl">${regular_price}</span>
                        )}
                        <span className="">/night</span>
                    </p>
                    {num_nights ? (
                        <>
                            <p className="bg-accent-600 px-3 py-2 text-2xl">
                                <span>&times;</span> <span>{num_nights}</span>
                            </p>
                            <p>
                                <span className="text-lg font-bold uppercase">Total</span>{" "}
                                <span className="text-2xl font-semibold">${cabin_price}</span>
                            </p>
                        </>
                    ) : null}
                </div>

                {range.from || range.to ? (
                    <button
                        className="border border-primary-800 py-2 px-4 text-sm font-semibold"
                        onClick={resetRange}
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}