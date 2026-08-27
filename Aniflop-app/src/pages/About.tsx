import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import animeBackground from "../assets/Top 5 Best Isekai Anime & Manga! 🌀⚔️.jpg"


export default function About() {

    const navigate = useNavigate()

    const [user, setUser] = useState<any>(null)


    useEffect(() => {

        // Get logged-in user from localStorage
        const savedUser = localStorage.getItem("user")


        if (savedUser) {

            setUser(
                JSON.parse(savedUser)
            )

        }

    }, [])


    return (

        <div
            className="about-container"
            style={{
                backgroundImage: `url(${animeBackground})`
            }}
        >


            {/* If user is NOT logged in */}

            {!user && (

                <>

                    <button
                        className="signin-button"
                        onClick={() =>
                            navigate("/signin")
                        }
                    >
                        Sign up
                    </button>


                    <button
                        className="login-button"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Log in
                    </button>

                </>

            )}


            {/* If user IS logged in */}

            {user && (

                <div className="profile-container">

                    <div className="profile-icon">
                        {user.full_name?.charAt(0).toUpperCase()}
                    </div>

                    <span className="profile-email">
                        {user.email}
                    </span>

                    <button
                        className="logout-button"
                        onClick={() => {
                            localStorage.removeItem("user")
                            navigate("/login")
                        }}
                    >
                        Log out
                    </button>

                </div>

            )}


            <div className="about-content">

                <h1 className="about-text">

                    The unlimited and dedicated

                    <br />

                    Anime collections

                </h1>


                <p className="about-subtext">

                    Are you ready?
                    Let's enter the realm of endless adventures

                </p>

                <br />

                <button className="get-started-button">
                    Get Started
                </button>

            </div>

        </div>

    )
}