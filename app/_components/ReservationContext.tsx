'use client'


import { createContext, ReactNode, useContext, useState } from "react";
import { DateRange } from 'react-day-picker';

interface ReservationInterface {
    range: DateRange;
    setRange: React.Dispatch<React.SetStateAction<DateRange>>;
    resetRange: () => void;
}

export const ReservationContext = createContext<ReservationInterface | undefined>(undefined);

const initialState: DateRange = { from: undefined, to: undefined };

export default function ReservationProvider({ children }: { children: ReactNode }) {

    const [range, setRange] = useState<DateRange>(initialState);

    const resetRange = () => setRange(initialState);

    return (
        <ReservationContext.Provider value={{ range, setRange, resetRange }}>
            {children}
        </ReservationContext.Provider>
    )
    
}

export const useReservation = () => {
    const context = useContext(ReservationContext);
    if (!context) {
      throw new Error("useReservation must be used within a ReservationProvider");
    }
    return context;
};