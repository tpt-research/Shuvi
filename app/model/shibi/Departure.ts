export default interface Departure {
    time: Date; // Unix Timestamp
    predictedTime?: Date;
    noPreciseTime: boolean;
}
