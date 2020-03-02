export default interface Vehicle {
    operator: string;
    id?: string;
    name?: string;
    vehicleType: VehicleType;
    climateFootprint: VehicleClimateFootprint;
    speed: VehicleSpeed;
    features: VehicleFeatures[];
    barrier_free: boolean;
    seats: number | null;
}

export enum VehicleType {
    // Over the Air
    AIRPLANE = "airplane",
    ROCKET = "rocket",

    // Landline
    TRAIN = "train",
    BUS = "bus",
    TRAM = "tram",
    SUBWAY = "subway",
    TRANSRAPID = "transrapid",
    TAXI = "taxi",
    CABLEWAY = "cableway",
    ONDEMAND = "ondemand",
    CAR = "car",

    // Oceanic
    FERRY = "ferry",
    SHIP = "ship",

    // Sharing
    RIDESHARING = "ridesharing",
    CARSHARING = "carsharing",
    ESCOOTER = "escooter",
    BIKE = "bike",

    // Extremely futuristic
    TELEPORTER = "teleporter",

    // Misc
    MISC = "misc"
}

export enum VehicleClimateFootprint {
    VERY_HIGH = "very_high",
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low",
    VERY_LOW = "very_low",
    NEUTRAL = "neutral"
}

export enum VehicleSpeed {
    VERY_FAST = "very_fast",
    FAST = "fast",
    NORMAL = "normal",
    SLOW = "slow",
    VERY_SLOW = "very_slow"
}

export enum VehicleFeatures {
    WIFI = "wifi",
    TOILETS = "toilets",
    FAMILY_FRIENDLY = "family_friendly",
    RESTAURANT = "restaurant",
    POWER_SOCKETS = "power_sockets",
    TICKET_MACHINES = "ticket_machines",
    PANORAMA = "panorama",
    HUMAN_SUPPORT = "human_support"
}
