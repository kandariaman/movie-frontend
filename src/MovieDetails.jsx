import { useState, useEffect } from 'react';
import './App.css';
import { useNavigate, useParams } from 'react-router-dom';


function MovieDetail() {
    const [movieDetail, setMovieDetails] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams(); 

    console.log("The Movie ID is:", id); // e.g., 550

    const showDetails = async () => {
    try {
        const url = `/api/v1/movies/details/${id}`;
        console.log("2. Attempting fetch to:", url);
        const details = await fetch(url);
        console.log("result in the response is :: "); 
        const data = await details.json();
        setMovieDetails(data);
    } catch(error) {
        console.error("Failed to fetch movie details:", error);
    }

    }  
 useEffect(() => {
        console.log("use effect is called or not!");
        showDetails();
    }, [id]);

    if (!movieDetail) {
        return <div className="loading">Loading movie details...</div>;
    }

    return (
        <>
<div className="movie-details-container">
    {/* 1. Backdrop Image (The large background) */}
    <div className="hero-banner" style={{ 
        backgroundImage: `linear-gradient(to right, #1a1a1a 20%, transparent 100%), url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})` 
    }}>
        <div className="hero-content">
            {/* 2. Poster Image */}
            <img 
                src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} 
                alt={movieDetail.title} 
                className="detail-poster" 
            />

            <div className="info-text">
movieDetail                
                {/* 3. Rating and Metadata */}
                <div className="meta-info">
                    <span>⭐ {movieDetail.vote_average}/10</span>
                    <span>{movieDetail.runtime} mins</span>
                    <span>{movieDetail.release_date}</span>
                </div>

                {/* 4. Genres (Mapping the array) */}
                <div className="genre-list">
    {/* The ?. ensures it won't crash if genres is temporarily undefined */}
    {movieDetail?.genres?.map((genre) => (
        <span key={genre.id} className="genre-tag">
            {genre.name}
        </span>
    ))}
</div>

                <button className="book-btn" onClick={() => navigate(`/movies/book/${id}`)}>
                    Book Tickets
                </button>
            </div>
        </div>
    </div>

    {/* 5. The Overview / Description */}
    <div className="description-section">
        <h3>About the Movie</h3>
        <p>{movieDetail.overview}</p>
    </div>
</div>
        </>
    );
}

export default MovieDetail;