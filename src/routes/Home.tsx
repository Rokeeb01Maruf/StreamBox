import MovieSectionSkeleton from "../../components/movieSectionSkeleton"
import MovieSection from "../../components/movieSection"
import useHomeMovies from "../../hooks/useHomeMovies";
import { Link } from "react-router-dom"
export default function home() {
    const { trending, popular, nowPlaying, topRated, upcoming, loading, error } = useHomeMovies()
    return (
        <main className="w-full mt-17.5 flex flex-col text-lg z-10 text-white ">
            <section className="text-center w-200 mx-auto mt-40 mb-15 px-25">
                <h2 className="font-semibold text-xl">The Best Streaming Experience</h2>
                <p className="text-xs mt-4 leading-relaxed">StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
                <Link to={"/discover"} className="mt-5 bg-primary p-2 rounded-full w-fit flex mx-auto font-light text-xs items-center leading-0">
                    <img className="w-4 h-4" src="/assets/icons/play.svg" alt="" />
                    <p className="">Start Streaming</p>
                </Link>
            </section>
            {
                loading.trending ? (
                    <MovieSectionSkeleton section="Trending now" top={0} />
                ) : (
                    trending ? (<MovieSection section="Trending now" top={0} data={trending} />) : (
                        error.trending && null
                    )
                )
            }
            {
                loading.upcoming ? (
                    <MovieSectionSkeleton section="Upcoming" top={5} />
                ) : (
                    upcoming ? (<MovieSection section="Upcoming" top={5} data={upcoming} />) : (
                        error.upcoming && null
                    )
                )
            }
            {
                loading.popular ? (
                    <MovieSectionSkeleton section="Popular" top={5} />
                ) : (
                    popular ? (<MovieSection section="Popular" top={5} data={popular} />) : (
                        error.popular && null
                    )
                )
            }
            {
                loading.nowPlaying ? (
                    <MovieSectionSkeleton section="Now Playing" top={5} />
                ) : (
                    nowPlaying ? (<MovieSection section="Now Playing" top={5} data={nowPlaying} />) : (
                        error.nowPlaying && null
                    )
                )
            }
            {
                loading.topRated ? (
                    <MovieSectionSkeleton section="Top Rated" top={5} />
                ) : (
                    topRated ? (<MovieSection section="Top Rated" top={5} data={topRated} />) : (
                        error.topRated && null
                    )
                )
            }

        </main>

    )
}