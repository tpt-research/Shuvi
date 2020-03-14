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
    FLIXBUS = 'flixbus',
    MIFAZ = 'mifaz'
}
