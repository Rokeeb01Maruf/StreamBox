import {useState, useEffect} from "react"
import {
    getTrendingMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getUpcomingMovies,
    getTopRatedMovies
 } from "../api/api"

 
 const useHomeMovies = () => {
    const [trending, setTrending] = useState<[] | null>(null)
    const [popular, setPopular] = useState<[] | null>(null)
    const [nowPlaying, setNowPlaying] = useState<[] | null>(null)
    const [topRated, setTopRated] = useState<[] | null>(null)
    const [upcoming, setUpcoming] = useState<[] | null>(null)
    const [loading, setLoading] = useState({
        trending : true,
        popular : true,
        nowPlaying : true,
        topRated : true,
        upcoming : true
    })
    const [error, setError] = useState({
        trending : false,
        popular : false,
        nowPlaying : false,
        topRated : false,
        upcoming : false
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

            getUpcomingMovies()
            .then((data) => setUpcoming(data.results))
            .catch((err)=>setError(prev => ({...prev, upcoming: true})))
            .finally(()=>setLoading(prev => ({...prev, upcoming: false})))
        }
        fetchMovies()
    }, [])

    return {
        trending,
        popular,
        nowPlaying,
        topRated,
        upcoming,
        loading,
        error
    }
} 

export default useHomeMovies
