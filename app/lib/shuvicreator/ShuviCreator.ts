import Shuvi from "../../model/shuvi/Shuvi";
import Shibi from "../../model/shibi/Shibi";
import SearchCluster from "../../model/searchcluster/SearchCluster";
import ShibiMerge from "../shibimerge/ShibiMerge";
import {ShuviModule} from "../../modules/base/ShuviModule";

export default class ShuviCreator {

    constructor(
        public API_URL: string,
        public modules: ShuviModule[]
    ) {}


    public async createShuvi(search: SearchCluster): Promise<Shuvi | null> {
        return this.shuviCreation(search, 5000);
    }

    public async createShuviHandshaked(search: SearchCluster): Promise<Shuvi | null> {
        return this.shuviCreation(search, 1500);
    }

    private async shuviCreation(search: SearchCluster, timeout: number): Promise<Shuvi | null>  {
        let promiseArray: Promise<Shibi | null>[] = [];

        this.modules.forEach((module: ShuviModule) => {
            if (module.source != null) {
                if (search.sources.indexOf(module.source) != -1) {
                    promiseArray.push(module.obtainShibiData(search, timeout, this.API_URL));
                }
            }
        });

        let sources: Shibi | null = await Promise.all(promiseArray).then(result => {
            let shibiArray: Shibi[] = [];
            result.forEach(source => {
                if (source != null) shibiArray.push(source)
            });

            try {
                return ShibiMerge.mergeShibi(shibiArray);
            } catch (e) {
                console.error("ShuviCreator Error: " + e);
                return null;
            }
        }).catch(err => {
            console.error(err);
            return null;
        });

        return {
            from: search.from,
            to: search.to,
            result: sources
        }
    }
}
