import { getCountries } from '@/app/_lib/data-service';
import { CountryInterface } from '../_utils/pages_interface';


export default async function SelectCountry({ defaultCountry, name, id, className }: 
    { defaultCountry?: string; name: string; id: string; className?: string; }) {
        
    const countries = await getCountries();
    const flag =
    countries.find((country: CountryInterface) => country.name === defaultCountry)?.flag ?? '';

    return (
        <select
            name={name}
            id={id}
            defaultValue={`${defaultCountry}%${flag}`}
            className={className}
        >
            <option value=''>Select country...</option>
            {countries.map((c: CountryInterface) => (
                <option key={c.name} value={`${c.name}%${c.flag}`}>
                    {c.name}
                </option>
            ))}
        </select>
    );
}