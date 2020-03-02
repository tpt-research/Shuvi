import Location from "./Location";

export default interface Place {
    location: Location | null;
    placeType: PlaceType;
    name?: string;
    id?: string;
    information: string[];
    barrier_free: boolean;
    available: boolean;
}

export enum PlaceType {
    AIRPORT = "airport",
    HARBOR = "harbor",
    STATION = "station",
    ADDRESS = "address",
    POI = "poi"
}
