import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import checkAuth from '../auth/user/checkAuth';

const Ticket = () => {
    const { bookingId } = useParams();
    const user = useSelector(store => store.auth.user)
    const [booking, setBooking] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.token) {
            axios.get(`http://localhost:3001/booking/${bookingId}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            }).then(res => { setBooking(res.data); setIsLoading(false); })
                .catch(err => { console.log(err); setIsLoading(false); });
        }
    }, [user?.token, bookingId]);

    const downloadPDF = () => {
        const capture = document.querySelector('.ticket');
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();

            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            // Add the image directly using its source URL
            doc.addImage(booking.result.poster, 'JPEG', 15, 50, 100, 110); // Adjust dimensions and position as needed

            doc.save(`${booking.result.movie}.pdf`);
        });
    };

    return (
        <div className="container mt-5">
            {isLoading ? (
                <div className='text-center' style={{ marginTop: "190px" }}>
                    <div className="spinner-grow text-primary mt-5" style={{ width: "5rem", height: "5rem" }} role="status">
                        <span className="visually-hidden mt-5">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row justify-content-center p-2">
                    <div className="ticket col-md-3 bg-light mt-4 p- rounded text-dark shadow">
                        {booking && booking.result &&
                            <>
                                <div className="row text-center">
                                    <h3>{booking.result.movie}</h3><hr />
                                    <img className='img-fluid' src={booking.result.poster} alt={booking.result.movie} style={{ maxWidth: '200px', maxHeight: '300px' }} />
                                    <QRCode style={{ marginTop: "90px", marginLeft: "-6px", height: "100px" }} value={`Movie:${booking.result.movie}, Date:${booking.result.date}, Show Time:${booking.result.time}, Seat:${booking.result.seats}`} />
                                </div>
                                <div className="row mt-2">
                                    <p><strong>Booking ID:</strong> {booking.result._id}</p>
                                    <p><strong>Date:</strong> {booking.result.date}</p>
                                    <p><strong>Show Time:</strong> {booking.result.time}</p>
                                    <p><strong>Seats:</strong> {booking.result.seats}</p>
                                    <p><strong>Rs:</strong>{booking.result.seats * 180}/-</p>
                                </div>
                            </>}
                    </div>
                    <div className='justify-content-center text-center mt-2'>
                        <div className="download-button-container"> {/* Wrapper div */}
                            <img onClick={downloadPDF} src="https://cdn-icons-png.freepik.com/256/12085/12085405.png?ga=GA1.1.1459516267.1711715282&" alt="" className="download-button" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default checkAuth(Ticket);
