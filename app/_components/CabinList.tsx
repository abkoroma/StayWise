import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

export default async function CabinList({ filter }: { filter: string }) {

    const cabins = await getCabins();

    if (!cabins.length) return null;

    const displayedCabins = {
        all: cabins,
        small: cabins.filter((cabin) => cabin.max_capacity <= 3),
        medium: cabins.filter((cabin) =>  cabin.max_capacity >= 4 && cabin.max_capacity <= 7),
        large: cabins.filter((cabin) => cabin.max_capacity >= 8)
    }[filter] || cabins;


    /*if (filter === "small") {
        displayedCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
    }
    if (filter === "medium") {
        displayedCabins = cabins.filter((cabin) =>  cabin.max_capacity >= 4 && cabin.max_capacity <= 7);
    }
    if (filter === "large") {
        displayedCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);
    }*/

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {displayedCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );

}