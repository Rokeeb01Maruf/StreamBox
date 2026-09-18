import { useState, useEffect } from "react"
import type { MovieListType, MovieGenre } from "../../utils/type"
import { discoverMovies, getMovieGenres, discoverGenreMovies } from "../../api/api"
import MovieSectionSkeleton from "../../components/movieSectionSkeleton"
import MovieSection from "../../components/movieSection"

function useWindowScreen() {
    const [value, setValue] = useState<number>(0)
    const [loaded, setLoaded] = useState<number>(0)
    useEffect(() => {
        let screenSize;
        screenSize = window.innerWidth
        const calc = Math.floor(screenSize / 100)
        const ex = Math.floor(screenSize / 83.3)
        setValue(calc - 3)
        setLoaded(ex)

        window.addEventListener("resize", () => {
            screenSize = window.innerWidth
            const calc = Math.floor(screenSize / 100)
            const ex = Math.floor(screenSize / 83.3)
            setValue(calc - 3)
            setLoaded(ex)
        })
    }, [])
    return { loader: value, existed: loaded }
}

export default function () {
    const [genre, setGenre] = useState("")
    const [data, setData] = useState<MovieListType | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const [movieloading, setMovieLoading] = useState(true)
    const [err, setError] = useState(false)
    const [genreList, setGenreList] = useState<MovieGenre[]>([])
    const [extend, setExtend] = useState(false)
    const { loader, existed } = useWindowScreen()



    const getMovie = async () => {
        discoverMovies()
            .then(res => setData(res))
            .catch((err) => (
                setError(true)
            ))
        setMovieLoading(false)
    }

    const getGenre = async () => {
        getMovieGenres()
            .then(res => setGenreList(res.genres))
            .catch(err => (
                setError(true)
            ))
        setLoading(false)
    }

    const getGenreMovie = async(id :number)=>{
        setMovieLoading(true)
        discoverGenreMovies(id)
        .then(res=> setData(res))
        .catch((err)=>setError(true))
        setMovieLoading(false)
    }

    useEffect(() => {
        getGenre()
        getMovie()
    }, [])

    return (
        <main className="bg-[rgba(0,0,0.8)] w-full z-10 mt-15 text-white">
            <header className="mt-2 px-25 h-max">
                <section className="flex text-sm items-start mt-5 gap-x-2.5 max-w-screen ">
                    <h3>Genres</h3>
                    <p>|</p>
                    <section className="max-w-fit">
                        {
                            !loading ? (
                                <>
                                    {
                                        genreList.length > 0 && <div style={
                                            { gridTemplateColumns: `repeat(${existed}, max-content)` }
                                        } className={`h-4 grid ${ extend ? "h-max" : "overflow-y-hidden"} gap-y-2.5 gap-x-2 items-start justify-start`}>
                                            {
                                                genreList.map((e, index) => (
                                                    <button onClick={()=>{getGenreMovie(Number(e.id))}} className={`text-white cursor-pointer whitespace-nowrap ${index != existed && ""}`} key={index}>{e.name}</button>
                                                ))
                                            }
                                        </div>
                                    }
                                </>
                            ) : (
                                <div className="flex overflow-hidden gap-x-5 animate-pulse overflow-x-hidden">
                                    {
                                        Array.from({ length: loader }).map((e, index) => (
                                            <p key={index} className="bg-gray-700 w-25 h-6 rounded-sm"></p>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </section>
                    <button onClick={()=>setExtend(!extend)} className="text-[8px] right-5 text-primary">{extend ? "hide" : "see more"}</button>
                </section>
            </header>
            <main>
                {
                    movieloading ? (
                        <MovieSectionSkeleton section="" top={0} />
                    ) : (
                        data && (
                            <MovieSection section="" top={0} data={data.results} />
                        )
                    )
                }
            </main>
        </main>
    )
}