import express from 'express';
import bodyParser from 'body-parser';
import SearchCluster from "./model/searchcluster/SearchCluster";
import ShuviCreator from "./lib/shuvicreator/ShuviCreator";
import Shuvi from "./model/shuvi/Shuvi";

const server: express.Application = express();

const PORT = process.env.PORT || '9812';

const SHIBI_URL = process.env.SHIBI_URL || "https://api.thepublictransport.de/shibi/";


const shuviCreator: ShuviCreator = new ShuviCreator(SHIBI_URL);

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

            searchBody.from.name = searchBody.from.name.substring(0, 5);
            searchBody.to.name = searchBody.to.name.substring(0, 5);

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

            searchBody.from.name = searchBody.from.name.substring(0, 5);
            searchBody.to.name = searchBody.to.name.substring(0, 5);

            let result: Shuvi | null;

            result = await shuviCreator.createShuviHandshaked(searchBody);

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

server.listen(PORT, function() {
    console.log('Shuvi listening on port ' + PORT.toString());
});
