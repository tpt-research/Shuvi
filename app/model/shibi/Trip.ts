import Departure from "./Departure";
import Place from "./Place";
import SubTrip from "./SubTrip";

export default interface Trip {
    from: Place;
    to: Place;
    departure: Departure;
    arrival: Departure;
    routes: SubTrip[];
    tripType: TripType;
    alternative: boolean;
    information: string[];
}

export enum TripType {
    SINGLE_MODAL = "single_modal",
    MULTI_MODAL = "multi_modal",
}
