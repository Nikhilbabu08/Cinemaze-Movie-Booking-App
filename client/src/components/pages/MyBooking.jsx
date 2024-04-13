import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import checkAuth from '../auth/user/checkAuth';
import  API_BASE_URL  from './../../config'

const MyBooking = () => {
    const navigate = useNavigate()
    const user = useSelector(store => store.auth.user)
    const [bookings, setBookings] = useState([])

    // Fetch data from API when the component mounts.
    useEffect(() => {
        // Fetch bookings
        if (user?.token) {
            axios.get(`${API_BASE_URL}/booking`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
                params: { user: user.id } // Pass userId as a query parameter
            })
            .then((res) => {  
                setBookings(res.data.userBookings);
            })
            .catch((error) => console.error('Error fetching bookings:', error));
        }
    }, [user?.token]);

    const handleDelete = (bookingId) => {
        axios.delete(`${API_BASE_URL}/booking/${bookingId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        }).then((response) => {
            setBookings(prevBooking => prevBooking.filter(booking => booking._id !== bookingId))
            navigate('/myBooking')
        }).catch((error) => {
            console.error('Delete Error:', error)
        })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <h1 className='text-center text-dark mt-4'><b>My Bookings</b></h1>
                    {bookings.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                            <div className="card carddd">
                                <div className="card-body carddd-body text-center">
                                    <p className="card-text carddd-text">No bookings available</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card-container carddd-container mt-3">
                            {bookings.map((item) => (
                                <div className="card carddd mt-2" key={item._id}>
                                    <div className="card-header">
                                        <h3 className="card-title text-center" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.movie}</h3>
                                    </div>
                                    <div className="card-body carddd-body">
                                        <p className="card-text carddd-text"><b>Booking ID:</b>{item._id}</p>
                                        <p className="card-text carddd-text"><b>Date:</b>{item.date}</p>
                                        <p className="card-text carddd-text"><b>Show Time:</b>{item.time}</p>
                                        <p className="card-text carddd-text"><b>Seats:</b>{item.seats}</p>
                                        <div className="d-grid mx- d-md-block">
                                            <Link to={`/ticket/${item._id}`} className='btn btnn btn-sm'>View</Link>&nbsp;&nbsp;
                                            <Link onClick={() => handleDelete(item._id)} className='btn btnn btn-sm'>Delete</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default checkAuth(MyBooking)
