import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import MovieDetailsSkeleton from "../../components/movieDetailsSkeleton"
import useMovieDetails from "../../hooks/useMovieDetails";
import MovieDetailsCard from "../../components/movieDetailsCard";
import type { MovieFullDetailsType } from "../../utils/type";

export default function MovieDetails() {
    const [loader, setLoader] = useState(true)
    const { id } = useParams()
    const [data, setData] = useState<MovieFullDetailsType | null>(null)
    const { movieData, loading } = useMovieDetails(Number(id))
    useEffect(() => {
        if (movieData) {
            setData(movieData)
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [movieData])

    return (
        <>
            {
                loader  ? <MovieDetailsSkeleton /> : (
                    <MovieDetailsCard data={data} />
                )
            }
        </>
    )
}