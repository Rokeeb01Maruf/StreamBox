import { useState, useEffect } from "react"
import type { MovieFullDetailsType } from "../utils/type"
import {
    getMovieDetails,
    getMovieCredits,
    getMovieVideos,
    getMovieRecommendations,
    getSimilarMovies
} from "../api/api"

const useMovieDetails = (id: number | undefined) => {
    const [movieData, setMovieData] = useState<MovieFullDetailsType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        setLoading(true)
        const fetchMovieDetails = async () => {
            const results = await Promise.allSettled([
                getMovieDetails(id),
                getMovieCredits(id),
                getMovieVideos(id),
                getMovieRecommendations(id),
                getSimilarMovies(id)
            ])

            const [movie, casts, videos, recommendations, similar] = results

            setMovieData({
                movie: movie.status === "fulfilled" ? movie.value : null,
                casts: casts.status === "fulfilled" ? casts.value : null,
                videos: videos.status === "fulfilled" ? videos.value : null,
                recommendations:
                    recommendations.status === "fulfilled" ? recommendations.value : null,
                similar: similar.status === "fulfilled" ? similar.value : null,
            });
            setLoading(false)
        }
        fetchMovieDetails()
    }, [id])

    return { movieData, loading}
}

export default useMovieDetails