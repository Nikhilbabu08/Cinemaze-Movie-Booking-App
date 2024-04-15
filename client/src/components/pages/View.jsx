import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import { useSelector } from 'react-redux'
import checkAuth from '../auth/user/checkAuth';
import  API_BASE_URL  from './../../config'

const View = () => {
    const navigate = useNavigate();
    const [razorpayKey, setRazorpayKey] = useState('');
    const user = useSelector(store => store.auth.user)
    const { movieId } = useParams()
    const [movie, setMovie] = useState([])
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [seats, setSeats] = useState("")
    const [errorMsg, setErrorMsg] = useState('')
    // const [bookingDetails, setBookingDetails] = useState({})
    const [bookingDates, setBookingDates] = useState([])

    useEffect(() => {
        if (user?.token) {
            axios.get(`${API_BASE_URL}/movie/` + movieId, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            }).then(res => { setMovie(res.data) })
                .catch(err => console.log(err));
        }
    }, [user?.token, movieId]);

    useEffect(() => {
        setBookingDates(nxtFiveDates(movie?.result?.bookingStartDate))
    }, [movie?.result?.bookingStartDate]);

    const nxtFiveDates = (startDate) => {
        const dates = [];
        const currentDate = new Date(startDate);
        for (let i = 0; i < 5; i++) {
            const nextDate = new Date(currentDate)
            nextDate.setDate(nextDate.getDate() + i)
            dates.push(nextDate.toDateString())
        }
        return dates;
    }

    useEffect(() => {
        // Fetch Razorpay key from backend API
        axios.get(`${API_BASE_URL}/api/getkey`)
            .then(response => {
                setRazorpayKey(response.data.key);
            })
            .catch(error => {
                console.error('Error fetching Razorpay key:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/booking`, {
            movie: movie.result.title,
            poster: movie.result.posterUrl,
            date,
            time,
            seats,
            user: user.id
        }, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
            .then((res) => {
                setErrorMsg('')
                const bookingId = res.data.bookings._id
                // console.log(bookingId)
                // setBookingDetails(res.data.bookings)
                // console.log(bookingDetails)
                handlePayment(bookingId, movie.result.title, date, time, seats, user.email);
            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMsg(error.response.data.message);
                } else {
                    setErrorMsg('Failed to connect to api');
                }
            })
    }
    const handlePayment = (bookingId, movieTitle, bookingDate, bookingTime, bookingSeats) => {
        if (!razorpayKey) {
            console.error('Razorpay key is not available.');
            return;
        }
        const options = {
            key: razorpayKey,
            amount: (bookingSeats * 18000), // Amount in paise (e.g., 18000 for ₹180)
            currency: 'INR',
            name: 'CINEMAZE',
            description: 'Movie Ticket Booking',
            image: 'https://cdn-icons-png.freepik.com/256/5698/5698340.png?ga=GA1.1.1459516267.1711715282&',
            order_id: movie.orderId,
            handler: function (response) {
                console.log(response);
                sendEmail(bookingId, movieTitle, bookingDate, bookingTime, bookingSeats);
                navigate(`/ticket/${bookingId}`)
            },
            prefill: {
                name: user.name,
                email: user.email,
            },
            theme: {
                color: '#154360',
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const sendEmail = (bookingId, movieTitle, bookingDate, bookingTime, bookingSeats) => {
        axios.post(`${API_BASE_URL}/email`, {
            id: bookingId,
            movie: movieTitle,
            date: bookingDate,
            time: bookingTime,
            seats: bookingSeats,
            email: user.email

        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error('Error processing payment:', error);
            });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                {Object.keys(movie).length > 0 ? (
                    <>
                        <div className="col-md-6 mt-5">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{movie.result.title}</h3>
                                </div>
                                <div className="card-body">
                                    <img src={movie.result.posterUrl} alt={movie.result.title} className="img-fluid mb-3" style={{ maxWidth: '600px', width: '300px', maxHeight: '250px' }} />
                                    <p><strong>Director:</strong> {movie.result.director}</p>
                                    <p><strong>Genre:</strong> {movie.result.genre}</p>
                                    <p><strong>Release Date:</strong> {movie.result.releaseDate}</p>
                                    <p><strong>Description:</strong> {movie.result.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mt-5">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Booking Form</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ''}
                                        <input type="hidden" id="movieName" name="movieName" value={movie?.result?.title || ''} />
                                        <input type="hidden" id="movieUrl" name="movieUrl" value={movie?.result?.posterUrl || ''} />
                                        <div className="mb-3">
                                            <label className="form-label">Available Date:</label>
                                            <select className="form-select" value={date} onChange={e => setDate(e.target.value)} required>
                                                <option value="" disabled>Select Date</option>
                                                {bookingDates.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Time:</label>
                                            <select className="form-select" value={time} onChange={e => setTime(e.target.value)} required>
                                                <option value="" disabled>Show Time</option>
                                                <option value="11:30 AM">11:30 AM</option>
                                                <option value="2:30 PM">2:30 PM</option>
                                                <option value="5:00 PM">5:00 PM</option>
                                                <option value="9:00 PM">9:00 PM</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Seats:</label>
                                            <input type="number" min="1" className="form-control" placeholder="Enter numbet of seats" value={seats} onChange={e => setSeats(e.target.value)} required />
                                        </div>
                                        {seats ? (
                                            <div className="mb-3">
                                                <p className='text-secondary' >Total Price:₹{(seats * 180)}</p>
                                            </div>
                                        ) : <div className="mb-3">
                                            <p className='text-danger'>The ticket price stands at ₹180 apiece</p>
                                        </div>}
                                        <div className="d-flex justify-content-between">
                                            <button type='submit' className="btn btnn"><b>Book Ticket</b></button>
                                            <Link to={'/'} className="btn btnn"><b>Go back</b></Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div></>
                ) : (
                    <div className='text-center' style={{ marginTop: "190px" }}>
                        <div className="spinner-grow text-primary mt-5" style={{ width: "2rem", height: "2rem" }} role="status">
                            <span className="visually-hidden mt-5">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default checkAuth(View)
