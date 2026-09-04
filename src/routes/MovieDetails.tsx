import { useParams } from "react-router-dom"
import { getMovieDetails } from "../../api/api"
import { type movieCardType } from "../../utils/type"
import { useEffect, useState } from "react";
import MovieDetailsSkeleton from "../../components/movieDetailsSkeleton"

export default function MovieDetails() {
    const [data, setData] = useState<movieCardType>()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const [error, setError] = useState(false)

    useEffect(() => {
        const datum = async () => {
            setTimeout(() => {
                getMovieDetails(Number(id))
                .then(data => setData(data))
                .catch(err => setError(true))
                .finally(() => setLoading(false))
            },5000)
        }
        datum()
    }, [])
    return (
        <>
            {
                loading && <MovieDetailsSkeleton />
            }
        </>
    )
}