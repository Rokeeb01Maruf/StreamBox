const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN
const BASE_URL  = "https://api.themoviedb.org/3"

const request = async(endpoint :string) =>{
    const response = await fetch(`${BASE_URL}/${endpoint}`,{
        headers : {
            Authorization : `Bearer ${TOKEN}`,
            Accept : "application/json"
        }
    })
    if(!response.ok){
        throw new Error("failed to fetch data")
    }else{
        const data = await response.json()
        return data
    }
    }

export const getTrendingMovies = () => {
    return request("/trending/movie/week")
}

export const getPopularMovies = () => {
    return request("/movie/popular")
}

export const getNowPlayingMovies = () => {
    return request("/movie/now_playing")
}

export const getTopRatedMovies = () => {
    return request("/movie/top_rated")
}

export const getUpcomingMovies = () => {
    return request("/movie/upcoming")
}

export const getMovieDetails = (id :number) => {
    return request(`/movie/${id}`)
}

export const getMovieCredits = (id: number) =>
    request(`movie/${id}/credits`);

export const getMovieVideos = (id: number) =>
    request(`movie/${id}/videos`);

export const getMovieRecommendations = (id: number) =>
    request(`movie/${id}/recommendations`);

export const getSimilarMovies = (id: number) =>
    request(`movie/${id}/similar`);