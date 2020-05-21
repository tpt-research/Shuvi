import Shibi from "../../model/shibi/Shibi";
import SearchCluster, {Source} from "../../model/searchcluster/SearchCluster";

export abstract class ShuviModule {
    public abstract source: Source;

    public abstract obtainShibiData(
        search: SearchCluster,
        timeout: number,
        API_URL: string
    ): Promise<Shibi | null>;
}
