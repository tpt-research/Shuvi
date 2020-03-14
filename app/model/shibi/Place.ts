import Location from "./Location";
import Departure from "./Departure";

export default interface Place {
    location: Location | null;
    placeType: PlaceType;
    name?: string;
    id?: string;
    information: string[];
    barrier_free: boolean;
    available: boolean;
    hasTimeDetails: boolean;
    timeDetailsArrival: Departure | null;
    timeDetailsDeparture: Departure | null;
}

export enum PlaceType {
    AIRPORT = "airport",
    HARBOR = "harbor",
    STATION = "station",
    ADDRESS = "address",
    POI = "poi"
}
