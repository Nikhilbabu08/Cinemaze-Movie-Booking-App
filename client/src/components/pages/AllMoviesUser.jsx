import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import checkAuth from '../auth/user/checkAuth';
import  API_BASE_URL  from './../../config'

const AllMoviesUser = () => {
    const admin = useSelector(store => store.auth.admin)
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [disabledMovies, setDisabledMovies] = useState(() => {
        // Retrieve disabledMovies from local storage on component mount
        const storedDisabledMovies = localStorage.getItem('disabledMovies');
        return storedDisabledMovies ? JSON.parse(storedDisabledMovies) : [];
    });

    // Fetch data from API when the component mounts.
    useEffect(() => {
        axios.get(`${API_BASE_URL}/movie`)
            .then((res) => { setMovies(res.data.allMovies); setIsLoading(false) })
            .catch((error) => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <h1 className='text-center text-dark  mt-4'><b>All Movies</b></h1>
                    {isLoading ? ( // Check loading state
                        <div className='text-center' style={{ marginTop: "190px" }}>
                            <div className="spinner-grow text-primary mt-" style={{ width: "3rem", height: "3rem" }} role="status">
                                <span className="visually-hidden mt-5">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="card-container carddd-container">
                            {movies.map((item) => (
                                <div className="card carddd mt-2" key={item._id}>
                                    <img src={item.posterUrl} className="card-img-top" alt={item.title} />
                                    <div className="card-body carddd-body">
                                        <h5 className="card-title carddd-title"> {item.title.length > 26 ? `${item.title.substring(0, 26)}...` : item.title}</h5>
                                        <p className="card-text carddd-text">{item.genre}</p>
                                        {(admin || disabledMovies.includes(item._id)) ? ( // Check if admin or movie is disabled
                                            <div className="d-grid">
                                                <button className="btn btn-secondary" type="button" disabled><b>Not Available</b></button>
                                            </div>
                                        ) : (
                                            <div className="d-grid">
                                                <Link to={`/${item._id}`} className="btn btnn" type="button"><b>Book Tickets</b></Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default checkAuth(AllMoviesUser)
