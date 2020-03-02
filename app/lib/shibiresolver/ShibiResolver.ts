import SearchCluster, {Source} from "../../model/searchcluster/SearchCluster";
import Shibi from "../../model/shibi/Shibi";
import axios from "axios";

export default class ShibiResolver {

    constructor(public API_URL: string) {}

    public async getTPTShibi(search: SearchCluster): Promise<Shibi | null> {
        return axios.get(this.API_URL + "tpt.shibi",
            {
                params: {
                    latFrom: search.from.latitude,
                    lonFrom: search.from.longitude,
                    latTo: search.to.latitude,
                    lonTo: search.to.longitude,
                    date: new Date(search.date).toISOString()
                }
            }).then((result => {
                return result.data as Shibi;
        })).catch((rejected) => {
            console.error("Error occurred on getTPTSearch: " + rejected);
            return null;
        });
    }

    public async getFlixbusSearch(search: SearchCluster): Promise<Shibi | null> {
        return axios.get(this.API_URL + "flixbus.shibi",
            {
                params: {
                    nameFrom: search.from.name,
                    nameTo: search.to.name,
                    date: new Date(search.date).toISOString()
                }
            }).then((result => {
            return result.data as Shibi;
        })).catch((rejected) => {
            console.error("Error occurred on getFlixbusSearch: " + rejected);
            return null;
        });
    }
}
