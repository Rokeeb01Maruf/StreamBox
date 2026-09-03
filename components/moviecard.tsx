import { type movieCardType } from "../utils/type"
import { Link } from "react-router-dom"
export default function Card({ card }: { card: movieCardType }) {
    return (
        <Link to={`/movie/${card.id}`} className="flex flex-col text-sm font-inter items-center w-40 text-center">
            <img src={`https://image.tmdb.org/t/p/w500${card.poster_path}`} alt={card.title} className="w-40 h-60 rounded-lg" />
            <p className="font-montserat">{card.title}</p>
            <p className="text-text-color">{card.release_date}</p>
        </Link>
    )
}