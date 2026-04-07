import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';


function BookTicket() {
    const navigate = useNavigate();

    return (
        <>
            <div className='search-container'>
                <h1>Book tickets here</h1>
            </div>
        </>
    );
}

export default BookTicket;