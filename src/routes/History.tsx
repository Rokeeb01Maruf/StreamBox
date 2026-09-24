import { useEffect, useState } from "react";
import { getCurrentUser, getWatchHistory } from "../../repository/userRepository"
import { useNavigate } from "react-router-dom"
import type { WatchHistory, movieCardType } from "../../utils/type"
import { getMovieDetails } from "../../api/api"
import MovieCard from "../../components/movieCard"

export default function Dashboard() {
    const navigate = useNavigate()
    const [movieHistory, setMovieHistory] = useState<WatchHistory[]>([])
    const [data, setData] = useState<movieCardType[]>([])
    const [date, setDate] = useState<string[]>([])

    useEffect(() => {
        const isAuthenticated = async () => {
            const user = await getCurrentUser()

            if (user.success === false && !user.data.id) {
                navigate("/")
            }

            if (user.data.id) {
                getWatchHistory(user.data.id)
                    .then(res => setMovieHistory(res))
            } else {
                navigate("/")
            }
        }

        isAuthenticated()
    }, [])

    useEffect(() => {
        if (movieHistory.length > 0) {
            for (let i = 0; i < movieHistory.length; i++) {
                getMovieDetails(movieHistory[i].movieId)
                    .then((res => setData(prev => [...prev, res])))
                    .catch(err => console.error(err))
            }
        }
    }, [movieHistory])

    useEffect(() => {
    if (movieHistory.length > 0) {
        const dates: string[] = []

        for (let i = 0; i < movieHistory.length; i++) {
            const watchedDate = new Date(movieHistory[i].watchedAt)
                .toLocaleDateString("en-US")

            if (!dates.includes(watchedDate)) {
                dates.push(watchedDate)
            }
        }

        setDate(dates)
    }
}, [movieHistory])

    useEffect(() => {
        console.log(date)
    }, [date])

    return (
        <main className="bg-[rgba(0,0,0,0.8)] w-full z-10">
            {
                data.length < 1 ? (
                    <div className="flex text-text-color italic justify-center items-center w-[calc(100vw-10px)] px-25 h-[calc(100vh-100px)]">
                        <p>Empty List</p>
                    </div>
                ) : (
                    <>
                        <div className="mt-17.5 text-white min-h-screen mx-25 flex flex-col gap-y-5">
                            {
                                date.map((d) => (
                                    <div key={d}>
                                        <h2>
                                            {
                                                new Date(d).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })
                                            }
                                        </h2>

                                        <div className="card grid grid-cols-6 max-[1065px]:grid-cols-5 max-[901px]:grid-cols-4 max-[705px]:grid-cols-3 max-[705px]:justify-between max-[705px]:gap-y-0 max-[561px]:grid-cols-2 max-[373px]:grid-cols-1 gap-x-5 gap-y-5">
                                            {
                                                movieHistory
                                                    .filter((e) => {
                                                        const watchedDate =
                                                            new Date(e.watchedAt)
                                                                .toLocaleDateString("en-US")

                                                        return watchedDate === d
                                                    })
                                                    .map((e) => {
                                                        const movie = data.find(
                                                            (f) => f.id === e.movieId
                                                        )

                                                        return movie && (
                                                            <MovieCard
                                                                card={movie}
                                                                key={e.id}
                                                            />
                                                        )
                                                    })
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </main>
    )
}