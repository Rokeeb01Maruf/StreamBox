import type { MovieFullDetailsType } from "../utils/type"
import { useState } from "react"
import MovieCard from "./movieCard"
export default function MovieDetailsCard({ data }: { data: MovieFullDetailsType | null }) {
    const [vidMode, setVidMode] = useState(false)
    console.log(data)

    const trailer = data?.videos?.results.find((video)=> video.type == "Trailer" && video.site == "YouTube")
    const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null

    const handleVideo = () => {
        setVidMode(true)
    }

    return (
        <>
            {
                !vidMode ? (

                    <div className="z-10 mt-15 w-full">
                        {
                            data?.movie &&
                            <>
                                <header className="flex font-inter gap-x-5 bg-[rgba(0,0,0,0.5)] rounded-lg p-30 pb-0">
                                    <section className="p-5 shadow-sm shadow-gray-800 text-white text-left bg-neutral flex flex-col rounded-lg">
                                        <img src={`https://image.tmdb.org/t/p/w500${data.movie.poster_path}`} alt="" className="w-40 h-60 rounded-lg mx-auto" />
                                        <h3 className="text-sm font-inter mt-2">{data.movie.title.toLocaleUpperCase()}</h3>
                                        <p className="flex gap-x-0.5 text-[8px]">
                                            <p>{data.movie.release_date.split("-")[0]} |</p>
                                            <p>{data.movie.genres[0]?.name || ""}/{data.movie.genres[1]?.name || ""} |</p>
                                            <p>{data.movie.runtime} min |</p>
                                            <p className="flex text-tertiary items-center justify-between gap-x-1"><img width={10} height={12} src="/assets/icons/star.svg" alt="" />{data.movie.vote_count}</p>
                                        </p>
                                        <section className="flex items-center justify-left gap-x-0.5 mt-1">
                                            <button className="w-fit flex py-1 px-2 rounded-sm items-center justify-center bg-primary text-[8px]">
                                                <img width={16} height={16} src="/assets/icons/play.svg" alt="" />
                                                <p>Play</p>
                                            </button>
                                            <button className="cursor-pointer hover:scale-3d w-fit flex py-1 px-2 rounded-sm items-center justify-center text-[10px]">
                                                <img width={14} height={14} src="/assets/icons/add.svg" alt="" />
                                                <p>Add to playlist</p>
                                            </button>
                                        </section>
                                        <p className="text-[8px] font-light justify-center font-inter max-w-40 mt-2">
                                            <span className="text-[10px] text-secondary">Tagline: </span>
                                            {data.movie.tagline}
                                        </p>
                                    </section>
                                    <section className="flex flex-col justify-center gap-y-1.5">
                                        <p className="text-white flex items-center gap-x-2.5">
                                            <p className="bg-[#E5E2E1]/45 px-2 py-1 rounded-sm">{data.movie.release_date.split("-")[0]}</p>
                                            <p className="bg-[#E5E2E1]/40 px-2 py-1 rounded-sm">{data.movie.runtime} min</p>
                                            <p className="bg-[#E5E2E1]/40 px-2 py-1 rounded-sm">4K HDR</p>
                                            <p className="px-1 py-1 flex gap-x-0.5 items-center justify-center">
                                                <img src="/assets/icons/outline-star.svg" alt="" />
                                                {data.movie.vote_average.toFixed(1)}
                                            </p>
                                        </p>
                                        <p className="text-white">Status: <span className="text-sm">{data.movie.status.toLocaleLowerCase()}</span></p>
                                        <p className="flex gap-x-2.5">
                                            {
                                                data.movie.genres.map((e) => (
                                                    <p className="text-white" key={e.id}>{e.name}.</p>
                                                ))
                                            }
                                        </p>
                                        <section className="text-white mt-2.5 flex items-center gap-x-5">
                                            <button onClick={handleVideo} className="flex gap-x-1.5 bg-primary hover:bg-purple-500 rounded-full px-4 py-2">
                                                <img width={14} height={14} src="/assets/icons/play.svg" alt="play icon" />
                                                <p>Watch Now</p>
                                            </button>
                                            <button onClick={handleVideo} className="flex gap-x-1.5 border border-text-color bg-[#E5E2E1]/40 rounded-full px-4 py-2">
                                                <p>Watch Trailer</p>
                                            </button>
                                            <button className="flex gap-x-1.5 border border-text-color bg-[#E5E2E1]/40 rounded-full px-2 py-2">
                                                <img width={20} height={20} src="/assets/icons/add.svg" alt="play icon" />
                                            </button>
                                        </section>
                                    </section>
                                </header>
                                <main className="text-white px-30 mt-10">
                                    <section className="flex">
                                        <aside className="flex-3/4">
                                            <h2 className="font-medium px-4 border-l-2 mb-4 border-primary">Synopsis</h2>
                                            <p className="text-sm font-light text-text-color font-inter">{data.movie.overview}</p>
                                        </aside>
                                        <aside className="flex-1/4 flex flex-col gap-y-5 font-inter text-[10px] text-text-color bg-[#E5E2E1]/5 p-2.5 rounded-lg">
                                            <div className="flex flex-col gap-y-0.5">
                                                <p className="">COMPANY</p>
                                                <p className="text-[9px]">{data.movie.production_companies[0].name}</p>
                                            </div>
                                            <div className="flex items-center gap-x-10">
                                                <div className="flex flex-col gap-y-0.5">
                                                    <p>STUDIO</p>
                                                    <p>{data.movie.production_companies[1]?.name || ""}</p>
                                                </div>
                                                <div className="flex flex-col gap-y-0.5">
                                                    <p>RELEASE DATE</p>
                                                    <p>{data.movie.release_date}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-1 pt-4 border-t border-text-color/20">
                                                <p>AUDIO & SUBTITLES</p>
                                                <p className="flex items-center gap-x-2">
                                                    {
                                                        data.movie.spoken_languages.map((e, index) => (
                                                            <p key={index} className="w-fit p-0.5 px-1.5 rounded-sm bg-gray-400/10">{e.name}</p>
                                                        ))
                                                    }
                                                </p>
                                            </div>
                                        </aside>
                                    </section>
                                    {
                                        data.casts && (
                                            <section>
                                                <h2 className="font-medium px-4 border-l-2 mb-4 border-primary">Cast & Crew</h2>
                                                <div>
                                                    <div className="flex flex-wrap gap-5">
                                                        {
                                                            data.casts.cast.map((cast, index) => index < 10 &&
                                                                <div key={index} className="flex flex-col font-inter text-sm text-text-color text-center">
                                                                    <img className="rounded-full w-24 h-24" src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} alt="" />
                                                                    <p className="w-25">{cast.name}</p>
                                                                    <p>{cast.known_for_department}</p>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </section>
                                        )
                                    }
                                    {
                                        data.similar && (
                                            <section className="mt-5">
                                                <h2 className="font-medium px-4 border-l-2 mb-4 border-primary">More Like This</h2>
                                                <div className="card grid grid-cols-6 gap-x-5 gap-y-5">
                                                    {
                                                        data.similar.results.map((datum, index) => (
                                                            index < 12 &&
                                                            <MovieCard card={datum} key={index} />
                                                        ))
                                                    }
                                                </div>
                                            </section>
                                        )
                                    }
                                    {
                                        data.recommendations && (
                                            <section className="mt-5">
                                                <h2 className="font-medium px-4 border-l-2 mb-4 border-primary">Recommendations</h2>
                                                <div className="card grid grid-cols-6 gap-x-5 gap-y-5">
                                                    {
                                                        data.recommendations.results.map((datum, index) => (
                                                            index < 12 &&
                                                            <MovieCard card={datum} key={index} />
                                                        ))
                                                    }
                                                </div>
                                            </section>
                                        )
                                    }
                                </main>
                            </>
                        }
                    </div>
                ) : (
                    <div className="z-50 mt-17.5 w-full">
                        {
                            trailerUrl && (
                                <iframe 
                                src={trailerUrl}
                                title={trailer?.name}
                                allowFullScreen
                                className="w-full h-[calc(100vh-70px)] aspect-video rounded-lg"
                                ></iframe>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}