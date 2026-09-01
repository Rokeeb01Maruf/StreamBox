import useHomeMovies from "../hooks/useHomeMovies"
function Home() {
  const { trending, popular, nowPlaying, topRated, movieGenres, loading, error } = useHomeMovies()
  return (
    <p>Please</p>
  )
}

export default Home
