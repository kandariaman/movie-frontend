import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function MovieSearch() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const navigate = useNavigate();


    const searchMovies = async (searchQuery) => {
        // LOG 1: Check if the function even triggers
        console.log("1. Function triggered. Parameter searchQuery is:", searchQuery);

        if (!searchQuery) {
            console.warn("Aborting: Query is empty.");
            return;
        }

        try {
            // LOG 2: Check the final URL being sent
            const url = `/api/v1/movies/search?movieName=${searchQuery}`;
            console.log("2. Attempting fetch to:", url);

            const response = await fetch(url);
            
            // LOG 3: Check HTTP Status
            console.log("3. Response received. Status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("4. Server error detected:", errorText);
                return;
            }

            const data = await response.json();
            
            // LOG 5: CRITICAL - Check the raw data shape from Java
            console.log("5. Raw data from backend:", data);

            // LOGIC CHECK: If your Java returns [{}, {}], then 'data.results' will be undefined.
            // We use a fallback to ensure we always set an array.
            const finalResults = data.results || data;
            
            console.log("6. Setting movies state to:", finalResults);
            setMovies(finalResults);

        } catch (error) {
            console.error("LOG ERROR: The fetch process crashed entirely:", error);
        }
    };

    // LOG 7: Check if the component re-renders when state changes
    console.log("7. Component Rendering. Current movies count:", movies?.length);

    return (
        <>
            <div className='search-container'>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search for movie'
                    className="bg-gray-800 text-white border border-gray-600 p-2 rounded w-80 focus:outline-none focus:border-red-500"
                />
                <button onClick={() => searchMovies(query)}>Search</button>
            </div>

            <div className="movie-results-grid">
                {/* LOG 8: In-browser visual check */}

                {movies && movies.length === 0 && <p>No movies found or search not started.</p>}
                
                {movies && movies.map((movie, index) => (
                    <div key={movie.id || index} className="movie-card"
                                onClick={() => navigate(`/movies/details/${movie.id}`)}>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title || movie.originalTitle || "Untitled Movie"}</h3>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MovieSearch;