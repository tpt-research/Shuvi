import express from 'express';
import bodyParser from 'body-parser';
import SearchCluster from "./model/searchcluster/SearchCluster";
import ShuviCreator from "./lib/shuvicreator/ShuviCreator";
import Shuvi from "./model/shuvi/Shuvi";
import {ShuviModule} from "./modules/base/ShuviModule";
import {DeutscheBahnModule} from "./modules/jibril/deutschebahn/DeutscheBahnModule";
import {OEBBModule} from "./modules/jibril/oebb/OEBBModule";
import {RMVModule} from "./modules/jibril/rmv/RMVModule";
import {BVGModule} from "./modules/jibril/bvg/BVGModule";
import {SNCBModule} from "./modules/jibril/sncb/SNCBModule";
import {VBNModule} from "./modules/jibril/vbn/VBNModule";
import {AVVModule} from "./modules/jibril/avv/AVVModule";
import {INSAModule} from "./modules/jibril/insa/INSAModule";
import {AnachBModule} from "./modules/jibril/anachb/AnachBModule";
import {FlixbusModule} from "./modules/external/flixbus/FlixbusModule";
import {MifazModule} from "./modules/external/mifaz/MifazModule";

const server: express.Application = express();

const PORT = process.env.PORT || '9812';

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

server.use(bodyParser.json());

server.post("/shuvi/search", async function (req, res, next) {
    let requestBody = req.body;

    if (requestBody == null || requestBody == {}) {
        res.status(400).send({
            success: false,
            status: "No POST body given.",
            data: null
        });
    } else {
        try {
            let searchBody: SearchCluster = requestBody as SearchCluster;

            let result: Shuvi | null;

            result = await shuviCreator.createShuvi(searchBody);

            if (result == null) {
                res.status(200).send({
                    success: false,
                    status: "No results",
                    data: null
                });
            } else {
                if (result.result == null) {
                    res.status(500).send({
                        success: false,
                        status: "Shibi is empty",
                        data: null
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        status: "Success. " + result.result.trips.length + " trips found.",
                        data: result
                    });
                }
            }
        } catch (e) {
            res.status(500).send({
                success: false,
                status: "Shuvi Error occurred: " + e,
                data: null
            });
        }
    }
});

server.post("/shuvi/handshake", async function (req, res, next) {
    let requestBody = req.body;

    if (requestBody == null || requestBody == {}) {
        res.status(400).send({
            success: false,
            status: "No POST body given.",
            data: null
        });
    } else {
        try {
            let searchBody: SearchCluster = requestBody as SearchCluster;

            let result: Shuvi | null;

            result = await shuviCreator.createShuviHandshaked(searchBody);

            if (result == null) {
                res.status(404).send({
                    success: false,
                    status: "Nothing found",
                    data: null
                });
            } else {
                if (result.result == null) {
                    res.status(200).send({
                        success: true,
                        status: "No results inside the Shibi found",
                        data: null
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        status: "Success. " + result.result.trips.length + " trips found.",
                        data: result
                    });
                }
            }
        } catch (e) {
            res.status(500).send({
                success: false,
                status: "Shuvi Error occurred: " + e,
                data: null
            });
        }
    }
});

server.listen(PORT, function() {
    console.log('Shuvi listening on port ' + PORT.toString());
});
