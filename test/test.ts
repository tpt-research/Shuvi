import {ShuviModule} from "../app/modules/base/ShuviModule";
import {DeutscheBahnModule} from "../app/modules/jibril/deutschebahn/DeutscheBahnModule";
import {OEBBModule} from "../app/modules/jibril/oebb/OEBBModule";
import {RMVModule} from "../app/modules/jibril/rmv/RMVModule";
import {BVGModule} from "../app/modules/jibril/bvg/BVGModule";
import {SNCBModule} from "../app/modules/jibril/sncb/SNCBModule";
import {VBNModule} from "../app/modules/jibril/vbn/VBNModule";
import {AVVModule} from "../app/modules/jibril/avv/AVVModule";
import {INSAModule} from "../app/modules/jibril/insa/INSAModule";
import {AnachBModule} from "../app/modules/jibril/anachb/AnachBModule";
import {FlixbusModule} from "../app/modules/external/flixbus/FlixbusModule";
import {MifazModule} from "../app/modules/external/mifaz/MifazModule";
import ShuviCreator from "../app/lib/shuvicreator/ShuviCreator";
import SearchCluster from "../app/model/searchcluster/SearchCluster";
import Shuvi from "../app/model/shuvi/Shuvi";

async function test() {
    try {
        let time = Date.now();
        const SHIBI_URL = process.env.SHIBI_URL || "https://api.thepublictransport.de/shibi/";

        const loadedModules: ShuviModule[] = [
            new DeutscheBahnModule(),
            new OEBBModule(),
            new RMVModule(),
            new BVGModule(),
            new SNCBModule(),
            new VBNModule(),
            new AVVModule(),
            new INSAModule(),
            new AnachBModule(),
            new FlixbusModule(),
            new MifazModule()
        ]

        const shuviCreator: ShuviCreator = new ShuviCreator(SHIBI_URL, loadedModules);

        let searchBody = {
            date: new Date(Date.now()).toISOString(),
            from: {
                "latitude": 50.0014936,
                "longitude": 8.2591177,
                "name": "Mainz Hbf"
            },
            sources: [
                "deutschebahn",
                "oebb",
                "rmv",
                "bvg",
                "flixbus",
                "avv",
                "insa",
                "vbn",
                "anachb",
                "sncb",
                "mifaz"
            ],
            to: {
                "latitude": 50.106529,
                "longitude": 8.6599731,
                "name": "Frankfurt(Main)Hbf"
            }
        } as SearchCluster;

        let result: Shuvi | null;

        result = await shuviCreator.createShuvi(searchBody);

        if (result == null) {
            // Can't be null, because it's a common trip which always throws an result
            throw Error("Result has to be given");
        } if (result.result == null){
            // Trips should not be null on this test
            throw Error("Trips are null, no trips should not be possible on this test");
        } else {
            console.log("Starting place: " + result.from.name);
            console.log("Target place: " + result.to.name);
            console.log("Search context: " + result.result?.context)
            if (result.result?.serverResponseTime != null) {
                console.log("Response time: " + (result.result?.serverResponseTime - time) + "ms");
            }
            console.log("Trip count: " + result.result?.trips.length);
            console.log("Test success !!!");
            await Promise.resolve();
        }
    } catch (e) {
        await Promise.resolve();
        console.error(e);
        throw Error(e);
    }
}

test().catch((err) => {
    console.error("Test failed!!!")
});
