import SearchCluster from "../../model/searchcluster/SearchCluster";
import Shibi from "../../model/shibi/Shibi";
import axios from "axios";

export default class ShibiResolver {

    constructor(public API_URL: string) {}

    public timeout: number = 5000;

    public async getDeutschebahnSearch(search: SearchCluster): Promise<Shibi | null> {
        return axios.get(this.API_URL + "deutschebahn.shibi",
            {
                timeout: this.timeout,
                params: {
                    latFrom: search.from.latitude,
                    lonFrom: search.from.longitude,
                    latTo: search.to.latitude,
                    lonTo: search.to.longitude,
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
            console.error("Error occurred on getDeutschebahnSearch: " + rejected);
            return null;
        });
    }

    public async getRMVSearch(search: SearchCluster): Promise<Shibi | null> {
        return axios.get(this.API_URL + "rmv.shibi",
            {
                timeout: this.timeout,
                params: {
                    latFrom: search.from.latitude,
                    lonFrom: search.from.longitude,
                    latTo: search.to.latitude,
                    lonTo: search.to.longitude,
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
            console.error("Error occurred on getRMVSearch: " + rejected);
            return null;
        });
    }

    public async getBVGSearch(search: SearchCluster): Promise<Shibi | null> {
        return axios.get(this.API_URL + "bvg.shibi",
            {
                timeout: this.timeout,
                params: {
                    latFrom: search.from.latitude,
                    lonFrom: search.from.longitude,
                    latTo: search.to.latitude,
                    lonTo: search.to.longitude,
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
            console.error("Error occurred on getBVGSearch: " + rejected);
            return null;
        });
    }

    public async getOEBBSearch(search: SearchCluster): Promise<Shibi | null> {
        return axios.get(this.API_URL + "oebb.shibi",
            {
                timeout: this.timeout,
                params: {
                    latFrom: search.from.latitude,
                    lonFrom: search.from.longitude,
                    latTo: search.to.latitude,
                    lonTo: search.to.longitude,
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
            console.error("Error occurred on getOEBBSearch: " + rejected);
            return null;
        });
    }

    public async getFlixbusSearch(search: SearchCluster): Promise<Shibi | null> {
        return axios.get(this.API_URL + "flixbus.shibi",
            {
                timeout: this.timeout,
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

    public async getMiFazSearch(search: SearchCluster): Promise<Shibi | null> {
        return axios.get(this.API_URL + "mifaz.shibi",
            {
                timeout: this.timeout,
                params: {
                    latFrom: search.from.latitude,
                    lonFrom: search.from.longitude,
                    latTo: search.to.latitude,
                    lonTo: search.to.longitude,
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
            console.error("Error occurred on getMiFazSearch: " + rejected);
            return null;
        });
    }
}
