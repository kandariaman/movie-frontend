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
    <div className="movie-details-page">
        {/* Background Banner */}
        <div 
            className="hero-banner" 
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})` }}
        >
            <div className="banner-overlay"></div>
            
            <div className="hero-content">
                {/* Poster */}
                <div className="poster-container">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} 
                        alt={movieDetail.title} 
                        className="detail-poster" 
                    />
                </div>

                {/* Text Info */}
                <div className="info-text">
                    <h1 className="movie-title">{movieDetail.title}</h1>
                    
                    <div className="meta-info">
                        <span className="rating">⭐ {movieDetail.vote_average?.toFixed(1)}/10</span>
                        <span className="dot">•</span>
                        <span>{movieDetail.runtime} mins</span>
                        <span className="dot">•</span>
                        <span>{movieDetail.release_date?.split('-')[0]}</span>
                    </div>

                    <div className="genre-list">
                        {movieDetail.genres?.map(genre => (
                            <span key={genre.id} className="genre-tag">{genre.name}</span>
                        ))}
                    </div>

                    <p className="overview-text">{movieDetail.overview}</p>

                    <button className="book-btn" onClick={() => 
                    navigate(`/movies/book/${id}/${encodeURIComponent(movieDetail.title)}/${movieDetail.release_date}`)}>
                        Book Tickets
                    </button>
                </div>
            </div>
        </div>
    </div>
);
}



export default MovieDetail;