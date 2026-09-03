import MovieCardSkeleton from "./movieCardSkeleton"
export default function MovieSectionSkeleton({ section, top }: { section: string, top : number }) {
    return (
        <div className={`max-w-full w-screen mt-${top} px-25`}>
            <h2 className="font-semibold text-xl mb-5">{section}</h2>
            <div className="card grid grid-cols-6 gap-x-5 gap-y-5">
                {Array.from({ length: 12 }).map((_, index) => (
                    <MovieCardSkeleton key={index} />
                ))}
            </div>
        </div>
    )
}