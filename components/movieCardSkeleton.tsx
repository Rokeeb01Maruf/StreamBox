export default function MovieCardSkeleton() {
    return (
        <div className="animate-pulse w-37.5 flex flex-col">
            <div className="aspect-2/3 w-full rounded-lg bg-gray-800" />

            <div className="mt-1 h-2 w-3/4 rounded bg-gray-800" />

            <div className="mt-1 h-2 w-1/2 rounded bg-gray-800" />
        </div>
    )
}