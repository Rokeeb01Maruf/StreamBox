import MovieCardSkeleton from "./movieCardSkeleton";
export default function MovieDetailSkeleton() {
    return(
        <div className="z-10 animate-pulse mt-15 w-full">
            <header className="flex gap-x-5 bg-[rgba(0,0,0,0.5)] rounded-lg p-30 pb-0">
                <MovieCardSkeleton />
                <div className="flex flex-col gap-y-2 w-100 h-2 mt-25">
                    <div className="aspect-2/3 w-[70%] rounded-lg bg-gray-800 h-full" />
                    <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-full" />
                    <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-full" />
                    <div className="aspect-2/3 w-[70%] rounded-lg bg-gray-800 h-full" />
                    <div className="w-full h-10 flex gap-x-2 mt-5">
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-full" />
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-full" />
                    </div>
                </div>
            </header>
            <main className="px-30 pt-15 pb-0 flex flex-col gap-y-5">
                <div className="flex gap-x-5">
                    <div className="flex h-5 flex-col gap-y-2 flex-3/4">
                        <div className="aspect-2/3 w-[20%] rounded-lg bg-gray-800 h-full" />
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-2" />
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-2" />
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-2" />
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-2" />
                    </div>
                    <div className="flex h-5 flex-col gap-y-2 flex-1/4">
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-2" />
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-2" />
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-2" />
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-2" />
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-2" />
                        <div className="aspect-2/3 w-full rounded-lg bg-gray-800 h-2" />
                    </div>
                </div>
                <div className="flex flex-col gap-y-2 mt-15">
                    <div className="aspect-2/3 w-[30%] rounded-lg bg-gray-800 h-5 mb-5" />
                    <div className="flex gap-x-5">
                        <div className="w-25 h-25 rounded-full bg-gray-800" />
                        <div className="w-25 h-25 rounded-full bg-gray-800" />
                        <div className="w-25 h-25 rounded-full bg-gray-800" />
                    </div>
                </div>
            </main>
            <footer className="p-30 pt-5">
                <div className="aspect-2/3 w-[30%] rounded-lg bg-gray-800 h-5 mb-5" />
                <div className="flex gap-x-5">
                    {
                        Array.from({length: 6}).map((_, index) => (
                            <MovieCardSkeleton key={index} />
                        ))
                    }
                </div>
            </footer>
        </div>
    )
}