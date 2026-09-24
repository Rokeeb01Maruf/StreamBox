import MovieCard from "./movieCard"
import { type movieSectionType } from "../utils/type"

export default function Section({section, top, data} : {section :string, top: number, data :movieSectionType}){
    return(
        <div className={`max-w-full w-screen mt-${top} px-25 max-[1177px]:px-20 max-[1146px]:px-15 max-[895px]:px-10`}>
            <h2 className="font-semibold text-xl mb-5">{section}</h2>
            <div className="card grid grid-cols-6 max-[1065px]:grid-cols-5 max-[901px]:grid-cols-4 max-[705px]:grid-cols-3 max-[705px]:justify-between max-[705px]:gap-y-0 max-[561px]:grid-cols-2 max-[373px]:grid-cols-1 gap-x-5 gap-y-5">
                {
                    data.map((e, index)=>(
                        <MovieCard key={index} card={e}/>
                    ))
                }
            </div>
        </div>
    )
}