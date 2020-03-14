import Shuvi from "../../model/shuvi/Shuvi";
import Shibi from "../../model/shibi/Shibi";
import SearchCluster, {Source} from "../../model/searchcluster/SearchCluster";
import ShibiResolver from "../shibiresolver/ShibiResolver";
import ShibiMerge from "../shibimerge/ShibiMerge";

export default class ShuviCreator {

    constructor(public API_URL: string) {}

    private shibiResolver: ShibiResolver = new ShibiResolver(this.API_URL);


    public async createShuvi(search: SearchCluster): Promise<Shuvi | null> {
        this.shibiResolver.timeout = 5000;

        return this.shuviCreation(search);
    }

    public async createShuviHandshaked(search: SearchCluster): Promise<Shuvi | null> {
        this.shibiResolver.timeout = 1500;

        return this.shuviCreation(search);
    }

    private async shuviCreation(search: SearchCluster): Promise<Shuvi | null>  {
        let promiseArray: Promise<Shibi | null>[] = [];

        if (search.sources.indexOf(Source.DEUTSCHEBAHN) != -1) {
            promiseArray.push(this.shibiResolver.getDeutschebahnSearch(search));
        }

        if (search.sources.indexOf(Source.RMV) != -1) {
            promiseArray.push(this.shibiResolver.getRMVSearch(search));
        }

        if (search.sources.indexOf(Source.BVG) != -1) {
            promiseArray.push(this.shibiResolver.getBVGSearch(search));
        }

        if (search.sources.indexOf(Source.OEBB) != -1) {
            promiseArray.push(this.shibiResolver.getOEBBSearch(search));
        }

        if (search.sources.indexOf(Source.FLIXBUS) != -1) {
            promiseArray.push(this.shibiResolver.getFlixbusSearch(search));
        }

        if (search.sources.indexOf(Source.MIFAZ) != -1) {
            promiseArray.push(this.shibiResolver.getMiFazSearch(search));
        }

        let sources: Shibi | null = await Promise.all(promiseArray).then(result => {
            let shibiArray: Shibi[] = [];
            result.forEach(source => {
                console.log(source);
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
