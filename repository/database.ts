import Dexie, {type Table} from "dexie"
import type { UserType,WatchHistory } from "../utils/type"

class StreamBoxDatabase extends Dexie{
    users!: Table<UserType, string>;
    watchHistory!: Table<WatchHistory, string>

    constructor(){
        super("StreamBox")

        this.version(1).stores({
            users : "id, email",
            watchHistory: "id, userId, movieId"
        })
    }

}

export const db = new StreamBoxDatabase()