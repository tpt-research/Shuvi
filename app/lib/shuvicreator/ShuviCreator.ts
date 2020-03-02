import Shuvi from "../../model/shuvi/Shuvi";
import Shibi from "../../model/shibi/Shibi";
import SearchCluster, {Source} from "../../model/searchcluster/SearchCluster";
import ShibiResolver from "../shibiresolver/ShibiResolver";
import ShibiMerge from "../shibimerge/ShibiMerge";

export default class ShuviCreator {

    constructor(public API_URL: string) {}

    private shibiResolver: ShibiResolver = new ShibiResolver(this.API_URL);


    public async createShuvi(search: SearchCluster): Promise<Shuvi | null> {
        let shibiArray: Shibi[] = [];

        if (search.sources.indexOf(Source.TPT) != -1) {
            let tpt = await this.shibiResolver.getTPTShibi(search);

            if (tpt != null) shibiArray.push(tpt);
        }

        if (search.sources.indexOf(Source.FLIXBUS) != -1) {
            let flixbus = await this.shibiResolver.getFlixbusSearch(search);

            console.log(flixbus);

            if (flixbus != null) shibiArray.push(flixbus);
        }

        let mergedShibi: Shibi;

        try {
            mergedShibi = ShibiMerge.mergeShibi(shibiArray);
        } catch (e) {
            console.error("ShuviCreator Error: " + e);
            return null;
        }

        return {
            from: search.from,
            to: search.to,
            result: mergedShibi
        }
    }
}
