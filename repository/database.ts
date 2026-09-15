import Dexie, {type Table} from "dexie"
import type { UserType } from "../utils/type"

class StreamBoxDatabase extends Dexie{
    users!: Table<UserType, string>

    constructor(){
        super("StreamBox")

        this.version(1).stores({
            users : "id, email"
        })
    }

}

export const db = new StreamBoxDatabase()