import Departure from "./Departure";
import Place from "./Place";
import Vehicle from "./Vehicle";

export default interface SubTrip {
    from: Place;
    to: Place;
    stops: Place[] | null;
    departure: Departure;
    arrival: Departure;
    vehicle: Vehicle;
    fromTrack?: string | null;
    toTrack?: string | null;
    information?: string | null;
    source: string;
    url?: string;
}
