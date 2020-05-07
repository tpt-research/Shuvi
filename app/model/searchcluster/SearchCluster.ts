import SearchObject from "../shuvi/SearchObject";

export default interface SearchCluster {
    from: SearchObject;
    to: SearchObject;
    date: string;
    sources: Source[]
}

export enum Source {
    DEUTSCHEBAHN = 'deutschebahn',
    RMV = 'rmv',
    BVG = 'bvg',
    OEBB = 'oebb',
    AVV = 'avv',
    VBN = 'vbn',
    INSA = 'insa',
    SNCB = 'sncb',
    ANACHB = 'anachb',
    FLIXBUS = 'flixbus',
    MIFAZ = 'mifaz'
}
