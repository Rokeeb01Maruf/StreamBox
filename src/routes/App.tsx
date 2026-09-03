import { useEffect, useState } from "react"
import HomePage from "./Home"
import MovieDetails from "./MovieDetails"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function Home() {
  const [search, setSearch] = useState(false)
  useEffect(() => {
    document.title = "StreamBox"
  }, [])
  return (
    <>
      <BrowserRouter>
        <div className="relative min-h-screen font-montserat overflow-x-hidden w-screen bg-neutral items-center z-0 flex flex-col">
          <header className="flex fixed w-full top-0 bg-[rgba(0,0,0,0.5)] z-1000 justify-between items-center h-17.5 px-25">
            <img src="/assets/images/StreamBox.svg" alt="StreamBox Logo" />
            <nav className="flex list-none items-center gap-x-10">
              <li className="cursor-pointer">
                <a href="" className="text-text-color font-montserat">Home</a>
              </li>
              <li className="cursor-pointer">
                <a href="" className="text-text-color font-montserat">Discover</a>
              </li>
              <li className="cursor-pointer">
                <button className="text-text-color font-montserat">Signin</button>
              </li>
              <li className={`${search ? 'opacity-100' : 'opacity-0 cursor-default'} relative w-49`}>
                <img src="/assets/icons/search.svg" className="absolute top-2 right-1.5" width={12} height={12} alt="" />
                <input placeholder="Search..." className="border rounded-xl text-white placeholder:text-xs px-1 text-sm w-full border-text-color font-montserat" type="text" name="" id="search" />
              </li>
              <li className="cursor-pointer">
                <img src="/assets/icons/search.svg" className="w-5 h-5" alt="" onClick={() => setSearch(!search)} />
              </li>
              <li>
                <button className="text-text-color font-montserat">SignUp</button>
              </li>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>

        </div>
      </BrowserRouter>
    </>
  )
}

export default Home
