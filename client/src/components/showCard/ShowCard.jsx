import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import  API_BASE_URL  from './../../config'

const ShowCard = () => {
    const admin = useSelector(store => store.auth.admin)
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [disabledMovies, setDisabledMovies] = useState(() => {
        // Retrieve disabledMovies from local storage on component mount
        const storedDisabledMovies = localStorage.getItem('disabledMovies');
        return storedDisabledMovies ? JSON.parse(storedDisabledMovies) : [];
    });

    useEffect(() => {
        axios.get(`${API_BASE_URL}/movie`)
            .then((res) => { setMovies(res.data.allMovies); setLoading(false); })
            .catch((error) => {
                console.error('Error fetching movies:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container-fluid mt-2">
            <h5 className='bg-gradient rounded text-dark px-2'><b>Now Showing🎬</b></h5>
            {loading ? (
                <div className='text-center' style={{ marginTop: "90px" }}>
                    <div className="spinner-grow text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="card-container cardd-container">
                        {movies.map((item) => (
                            <div className="card cardd mt-1" key={item._id}>
                                <img src={item.posterUrl} className="card-img-top" alt={item.title} />
                                <div className="card-body cardd-body">
                                    <h5 className="card-title cardd-title"> {item.title.length > 27 ? `${item.title.substring(0, 27)}...` : item.title}</h5>
                                    <p className="card-text cardd-text">{item.genre}</p>
                                    {!admin ? (
                                        (disabledMovies.includes(item._id)) ? ( // Check if admin or movie is disabled
                                            <div className="d-grid">
                                                <button className="btn btn-secondary" type="button" disabled><b>Not Available</b></button>
                                            </div>
                                        ) : (
                                            <div className="d-grid">
                                                <Link to={`/${item._id}`} className="btn btnn" type="button"><b>Book Tickets</b></Link>
                                            </div>
                                        )
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowCard;
