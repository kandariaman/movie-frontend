import { useState, useEffect } from 'react';
import './App.css';
import { useNavigate, useParams} from 'react-router-dom';


function BookTicket() {

    const { id, title } = useParams();
    const [timings, setTimings] = useState({});
    const [theatre, setTheatre] = useState([]);
    
    const navigate = useNavigate();
    
    const callBooking = async () => {
        const mDate = new Date().toLocaleDateString('en-CA');
// This will give you "2026-04-13"
        const url = `/api/bookings/schedule?movieId=${id}&movieTitle=${title}&date=${mDate}`;
        const details = await fetch(url);
        const data = await details.json();
        console.log("These are the values :: ", id, title, mDate);
        setTheatre(data);
        return data;
    }

const TheaterSchedule = (theatreData) => {

    const finalGroupedData = theatreData.reduce((acc, screening) => {
    const theaterName = screening.theaterName;
    
    if (!acc[theaterName]) acc[theaterName] = [];
    
    // Use the spread operator (...) to pull the times OUT of the list 
    // and push them into the main folder
    acc[theaterName].push(...screening.timings); 
    
    return acc;
}, {});

// Now deduplicate so you don't have "10:00" three times
Object.keys(finalGroupedData).forEach(key => {
    finalGroupedData[key] = [...new Set(finalGroupedData[key])].sort();
});



    return finalGroupedData;
};

    useEffect(() => {
        (async() => {
            console.log("Call Booking is called ...");
            const theatreData = await callBooking();
            console.log("Backend Payload:", theatreData);
            setTimings(TheaterSchedule(theatreData));
        })();
    }, []);

    const formatTime = (timeString) => {
    const [hrs, mins] = timeString.split(':');
    const hour = parseInt(hrs);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${mins} ${ampm}`;
};

const styles = {
    card: {
    borderLeft: '4px solid #4caf50', // Matching the button green
    background: '#1a1d23',           // Dark slate background
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
},
    name: { 
        margin: '0 0 4px 0', 
        fontSize: '22px',       // Increased size
        color: '#ffffff',       // Pure white for dark themes, or #1a1a1a for light
        fontWeight: '800',      // Extra bold
        letterSpacing: '-0.5px' // Tighter look for titles
    },
    location: { margin: 0, color: '#888', fontSize: '14px' },
    btnContainer: { display: 'flex', flexWrap: 'wrap', gap: '15px' },
    timeButton: { 
        padding: '8px 16px', 
        border: '1px solid #4caf50', 
        borderRadius: '4px', 
        color: '#4caf50', 
        background: 'none', 
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};

    
    console.log("Current Theatre Data:", theatre);
console.log("Timings Array:", theatre?.timings);

    return (
    <div className="booking-container" style={styles.container}>
        {/* 1. Map through the ARRAY of theaters */}
        {theatre.map((singleTheatre, tIndex) => (
            <div key={tIndex} style={styles.card} className="theatre-card">
                {/* Applied styles.name and styles.location */}
                <h3 style={styles.name}>{singleTheatre.theaterName}</h3>
                <p style={styles.location}>{singleTheatre.location}</p>
                
                {/* Added styles.btnContainer to allow buttons to wrap horizontally */}
                <div className="timings-container" style={styles.btnContainer}>
                    {singleTheatre.timings && singleTheatre.timings.map((time, index) => (
                        <div key={index} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Applied styles.timeButton for the green border and padding */}
                            <button 
                                style={styles.timeButton} 
                                
                                onClick={() => {
                                    // Get the specific ID for this time slot
                                    const selectedShowId = singleTheatre.screeningIds[index];
                
                                    // Navigate to the seating page using that ID
                                    // Your route in App.js should be: /movies/show/:id
                                    navigate(`/movies/show/${selectedShowId}`);
                                }}
                            >
                                {time}
                            </button>
                            
                            {/* Dynamic seat count styling */}
                            <p style={{ 
                                fontSize: '11px', 
                                color: singleTheatre.availableSeats[index] < 10 ? '#ff4d4d' : '#888',
                                marginTop: '5px' 
                            }}>
                                {singleTheatre.availableSeats[index]} seats left
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);
}

export default BookTicket;