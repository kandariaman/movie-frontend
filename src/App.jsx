import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieSearch from './MovieSearch.jsx'
import MovieDetails from './MovieDetails.jsx'
import BookingPage from './BookingPage.jsx'

function App() {
return (
  <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        <Routes>
          {/* Main Search Page */}
          <Route path="/" element={<MovieSearch />} />
          
          {/* Dynamic Movie Detail Page (:id is a placeholder for the movie ID) */}
          <Route path="/movies/details/:id" element={<MovieDetails />} />

          {/* The Booking Page */}
          <Route path="/movies/book/:id/:title/:date" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
);
}

export default App;
