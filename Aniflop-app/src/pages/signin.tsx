import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SignIn() {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [agreed, setAgreed] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")


    const handleNext = async () => {

        setError("")
        setMessage("")


        // Full name

        if (fullName.trim() === "") {
            setError("Please enter your full name.")
            return
        }


        // Email

        if (email.trim() === "") {
            setError("Please enter your email address.")
            return
        }


        // Password

        if (password.trim() === "") {
            setError("Please enter a password.")
            return
        }


        // Confirm password

        if (confirmPassword.trim() === "") {
            setError("Please confirm your password.")
            return
        }


        // Password matching

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }


        // Agreement

        if (!agreed) {
            setError("Please agree to the user agreement !")
            return
        }


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        full_name: fullName,
                        email: email,
                        password: password,
                        confirm_password: confirmPassword
                    })
                }
            )


            const data = await response.json()


            if (!data.success) {

                setError(data.message)

                return
            }


            // Account successfully created

            setMessage(data.message)

            console.log("User saved in database")


            // Go to login after a short delay

            setTimeout(() => {
                navigate("/login")
            }, 2000)


        } catch (error) {

            console.error(error)

            setError(
                "Cannot connect to the server."
            )
        }
    }


    return (
        <div className="signin-container">

            <div className="signin-box">

                <h1 className="signin-title">
                    Sign up
                </h1>

                <h2 className="signin-subtitle">
                    Create account
                </h2>


                {/* Full Name */}

                <label className="signin-label">
                    Full Name
                </label>

                <input
                    type="text"
                    placeholder="Your Full Name"
                    className="signin-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />


                {/* Email */}

                <label className="signin-label">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="signin-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                {/* Password */}

                <label className="signin-label">
                    Password
                </label>

                <div className="signin-password-container">

                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }

                        placeholder="Set a password"

                        className="signin-input signin-password-input"

                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        type="button"
                        className="signin-password-eye"

                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {showPassword
                            ? "🙈"
                            : "👁️"}
                    </button>

                </div>


                {/* Confirm Password */}

                <label className="signin-label">
                    Confirm Password
                </label>

                <div className="signin-password-container">

                    <input
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }

                        placeholder="Password"

                        className="signin-input signin-password-input"

                        value={confirmPassword}

                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="button"
                        className="signin-password-eye"

                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                    >
                        {showConfirmPassword
                            ? "🙈"
                            : "👁️"}
                    </button>

                </div>


                {/* Terms */}

                <div className="terms-container">

                    <input
                        type="checkbox"
                        id="terms"

                        className="terms-checkbox"

                        checked={agreed}

                        onChange={(e) =>
                            setAgreed(e.target.checked)
                        }
                    />

                    <label htmlFor="terms">

                        I agreed to the{" "}

                        <span className="terms-link">
                            Terms of Service
                        </span>

                        {" "}and{" "}

                        <span className="terms-link">
                            Privacy Policy
                        </span>

                    </label>

                </div>


                {/* Error */}

                {error && (
                    <p className="agreement-error">
                        {error}
                    </p>
                )}


                {/* Success */}

                {message && (
                    <p className="signup-success">
                        {message}
                    </p>
                )}


                {/* Sign Up */}

                <button
                    className="signin-next-button"

                    onClick={handleNext}
                >
                    Sign up
                </button>


                {/* Login */}

                <p className="login-link-text">

                    Already have an account? Please{" "}

                    <span
                        className="login-link"

                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Log in
                    </span>

                </p>

            </div>

        </div>
    )
}