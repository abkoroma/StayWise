export interface CabinInterface {
    id?: number;
    created_at?: string;
    name: string;
    regular_price: number;
    discount: number;
    max_capacity: number;
    description: string;
    image: File | string;
}

export interface SettingsInterface {
    id?: string | number;
    created_at?: string;
    min_booking: number;
    max_booking: number;
    max_guests: number;
    breakfast_price: number;
}

export interface BookingInterface {
    id: number;
    created_at?: string;
    start_date: Date;
    end_date: Date;
    num_nights: number;
    num_guests?: number;
    cabin_price?: number;
    extras_price?: number;
    total_price: number;
    status?: "unconfirmed" | "checked-in" | "checked-out";
    has_breakfast?: boolean;
    is_paid?: boolean;
    observations?: string;
    cabin_id?: number;
    guest_id?: number;
    guests?: { full_name: string, email: string, country?: string, countryFlag?: string, national_id?: string },
    cabins: { name: string; image: string; }
}

export interface GuestInterface {
    id?: number;
    created_at?: string;
    full_name: string;
    email: string;
    national_id?: string;
    nationality?: string;
    country?: string;
}

export interface UserInterface {
    role?: string;
    email?: string,
    user_metadata?: { fullName: string } 

}

export interface CountryInterface {
    name: string,
    flag: string,
    independent: boolean
}