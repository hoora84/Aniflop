import { useState } from "react"
import { FiSearch } from "react-icons/fi"

export default function GetStarted() {

    const [search, setSearch] = useState("")

    const handleSearch = () => {
        console.log("Searching for:", search)
    }

    return (
        <div className="get-started-container">

            <header className="get-started-header">

                <div className="search-box">

                    <div className="search-bar">

                        <input
                            type="text"
                            placeholder="Search anime..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button
                            className="search-button"
                            onClick={handleSearch}
                        >
                            <FiSearch />
                        </button>

                     </div>

                </div>

            </header>


        </div>
    )
}