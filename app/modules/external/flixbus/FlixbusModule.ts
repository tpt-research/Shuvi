import {ShuviModule} from "../../base/ShuviModule";
import SearchCluster, {Source} from "../../../model/searchcluster/SearchCluster";
import Shibi from "../../../model/shibi/Shibi";
import axios from "axios";

export class FlixbusModule extends ShuviModule {
    source: Source = Source.FLIXBUS;

    obtainShibiData(
        search: SearchCluster,
        timeout: number,
        API_URL: string
    ): Promise<Shibi | null> {
        return axios.get(API_URL + "flixbus.shibi",
            {
                timeout: timeout,
                params: {
                    nameFrom: search.from.name,
                    nameTo: search.to.name,
                    date: new Date(search.date).toISOString()
                }
            }).then((result => {
            try {
                if (typeof result.data != "string") {
                    return result.data as Shibi;
                } else {
                    return null;
                }
            } catch (e) {
                return null;
            }
        })).catch((rejected) => {
            console.error("Error occurred on getFlixbusSearch: " + rejected);
            return null;
        });
    }
}
