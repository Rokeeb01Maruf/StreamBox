import { useParams } from "react-router-dom"
export default function MovieDetails() {
    const { id } = useParams()
    console.log(id)
    return (
        <>
            <img src="/assets/images/hero-section.png" className="max-w-full absolute z-5 top-0 left-0 h-fit brightness-25" alt="" />
        </>
    )
}