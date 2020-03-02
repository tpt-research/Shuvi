import SearchObject from "../shuvi/SearchObject";

export default interface SearchCluster {
    from: SearchObject;
    to: SearchObject;
    date: string;
    sources: Source[]
}

export enum Source {
    TPT = 'tpt',
    FLIXBUS = 'flixbus'
}
