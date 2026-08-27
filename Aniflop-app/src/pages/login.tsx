import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Login() {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")


    const handleLogin = async () => {

        // Check if email is empty
        if (email.trim() === "") {

            setErrorMessage("Please enter email address")

            setTimeout(() => {
                setErrorMessage("")
            }, 2000)

            return
        }


        // Check if password is empty
        if (password.trim() === "") {

            setErrorMessage("Please enter a password.")

            setTimeout(() => {
                setErrorMessage("")
            }, 2000)

            return
        }


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            )


            const data = await response.json()


            // Check response from FastAPI

            if (!data.success) {

                setErrorMessage(data.message)

                setTimeout(() => {
                    setErrorMessage("")
                }, 5000)

                return
            }


            // Login successful

            setErrorMessage("")

             // Save logged-in user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            )

             // Navigate to About page
            navigate("/about")


        } catch (error) {

            console.error(error)

            setErrorMessage(
                "Cannot connect to the server."
            )

            setTimeout(() => {
                setErrorMessage("")
            }, 5000)
        }
    }


    return (
        <div className="login-container">

            <div className="login-box">

                <h1 className="login-title">
                    LOG IN
                </h1>


                <label className="input-label">
                    Email Address
                </label>

                <input
                    type="text"
                    placeholder="Username or Email"
                    className="login-input"

                    value={email}

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />


                <label className="input-label">
                    Password
                </label>


                <div className="password-container">

                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }

                        placeholder="Password"

                        className="login-input password-input"

                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />


                    <span
                        className="password-eye"

                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {showPassword
                            ? "🙈"
                            : "👁️"}
                    </span>

                </div>


                {/* Error message */}

                {errorMessage && (
                    <div className="login-error">
                        {errorMessage}
                    </div>
                )}


                {/* Login button */}

                <button
                    className="login-submit"
                    onClick={handleLogin}
                >
                    LOG IN
                </button>


                {/* Sign Up Navigation */}

                <p className="signup-link-text">

                    Don't have an account?{" "}

                    <span
                        className="signup-link"

                        onClick={() =>
                            navigate("/signin")
                        }
                    >
                        Sign up
                    </span>

                </p>

            </div>

        </div>
    )
}