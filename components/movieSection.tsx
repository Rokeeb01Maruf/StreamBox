import MovieCard from "./movieCard"
import { type movieSectionType } from "../utils/type"

export default function Section({section, top, data} : {section :string, top: number, data :movieSectionType}){
    return(
        <div className={`max-w-full w-screen mt-${top} px-25`}>
            <h2 className="font-semibold text-xl mb-5">{section}</h2>
            <div className="card grid grid-cols-6 gap-x-5 gap-y-5">
                {
                    data.map((e, index)=>(
                        <MovieCard key={index} card={e}/>
                    ))
                }
            </div>
        </div>
    )
}