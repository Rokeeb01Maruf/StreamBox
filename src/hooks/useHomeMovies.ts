import {useState, useEffect} from "react"
import {
    getTrendingMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getMovieGenres,
    getTopRatedMovies
 } from "../api/api"

 
 const useHomeMovies = () => {
    const [trending, setTrending] = useState([])
    const [popular, setPopular] = useState([])
    const [nowPlaying, setNowPlaying] = useState([])
    const [topRated, setTopRated] = useState([])
    const [movieGenres, setMovieGenres] = useState([])
    const [loading, setLoading] = useState({
        trending : true,
        popular : true,
        nowPlaying : true,
        topRated : true,
        movieGenres : true
    })
    const [error, setError] = useState({
        trending : false,
        popular : false,
        nowPlaying : false,
        topRated : false,
        movieGenres : false
    })

    useEffect(()=>{
        const fetchMovies = async() => {
            getTrendingMovies()
            .then((data) => setTrending(data.results))
            .catch((err)=>setError(prev => ({...prev, trending: true})))
            .finally(()=>setLoading(prev => ({...prev, trending: false})))

            getPopularMovies()
            .then((data) => setPopular(data.results))
            .catch((err)=>setError(prev => ({...prev, popular: true})))
            .finally(()=>setLoading(prev => ({...prev, popular: false})))

            getNowPlayingMovies()
            .then((data) => setNowPlaying(data.results))
            .catch((err)=>setError(prev => ({...prev, nowPlaying: true})))
            .finally(()=>setLoading(prev => ({...prev, nowPlaying: false})))

            getTopRatedMovies()
            .then((data) => setTopRated(data.results))
            .catch((err)=>setError(prev => ({...prev, topRated: true})))
            .finally(()=>setLoading(prev => ({...prev, topRated: false})))

            getMovieGenres()
            .then((data) => setMovieGenres(data.genres))
            .catch((err)=>setError(prev => ({...prev, movieGenres: true})))
            .finally(()=>setLoading(prev => ({...prev, movieGenres: false})))
        }
        fetchMovies()
    }, [])

    return {
        trending,
        popular,
        nowPlaying,
        topRated,
        movieGenres,
        loading,
        error
    }
} 

export default useHomeMovies
