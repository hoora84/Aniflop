import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import animeBackground from "../assets/Anime World.jpg"
export default function Home() {
    
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/about")
        },6000)

        return () => clearTimeout(timer)
    }, [])
    
    return (

        <div>

            <div className="container"  style={{ backgroundImage: `url(${animeBackground})` }}>
                <h1 className='title'> AniFlop </h1>
            </div>

            {/* <footer className='footer'>
                <img src='https://poketcg.in/cdn/shop/files/58.jpg?v=1776065970' alt='anime1' />
                <img src='https://static0.colliderimages.com/wordpress/wp-content/uploads/2021/11/One-Piece-Character-Guide.jpg?w=1200&h=675&fit=crop' alt='anime2' />
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDIdfU88NeevVZTzEDFFjvSkIh3jPMl5uM7Q&s' alt='anime3' />
  
            </footer> */}
        </div>


    )
}