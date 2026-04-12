import { useState, useEffect } from 'react';
import './App.css';
import { useNavigate, useParams} from 'react-router-dom';


function BookTicket() {

    const { id, title, date } = useParams();
    const [timings, setTimings] = useState([]);
    const [theatre, setTheatre] = useState([]);
    
    const callBooking = async () => {
        const url = `/api/bookings/schedule?movieId=${id}&movieTitle=${title}&date=${date}`;
        const details = await fetch(url);
        const data = await details.json();
        console.log("following is the output ", value);
        setTheatre(data);
        return data;
    }


    const TheaterSchedule = ({ theaterData }) => {
        // 1. Deduplicate the timings list (turns 8 "10:00:00" into 1)
        const uniqueTimings = [...new Set(theaterData.timings)];
        return uniqueTimings;
    }

    useEffect(() => {
        (async() => {
            console.log("Call Booking is called ...");
            const theatreData = await callBooking();
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
    card: { borderBottom: '1px solid #eee', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
    name: { margin: 0, fontSize: '18px', color: '#333' },
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

    return (
        <div className="theater-card" style={styles.card}>
            <div className="theater-header">
                <h3 style={styles.name}>{theatre.theaterName}</h3>
                <p style={styles.location}>{theatre.location}</p>
            </div>

            <div className="timings-container" style={styles.btnContainer}>
                {timings.map((time, index) => (
                    <button 
                        key={index} 
                        style={styles.timeButton}
                        onClick={() => console.log(`Selected ${time}`)}
                    >
                        {/* Convert 10:00:00 to 10:00 AM style */}
                        {formatTime(time)}
                    </button>
                ))}
            </div>
            
            {/* Warning if screeningIds are missing */}
            {!theatre.screeningIds && (
                <p style={{color: 'red', fontSize: '12px'}}>* Booking currently unavailable</p>
            )}
        </div>
    );
}

export default BookTicket;