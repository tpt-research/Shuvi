import Place from "./Place";
import Trip from "./Trip";

export default interface Shibi {
    context: string | null;
    serverResponseTime: number;
    from: Place;
    to: Place;
    trips: Trip[];
}
