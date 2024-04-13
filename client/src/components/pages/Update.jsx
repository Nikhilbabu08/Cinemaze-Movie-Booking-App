import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import checkAuth from '../auth/admin/checkAuth';
import axios from 'axios';
import  API_BASE_URL  from './../../config'


const Update = () => {
    const { movieId } = useParams()
    const admin = useSelector(store => store.auth.admin)
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('')
    const [actors, setActors] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [posterUrl, setPosterUrl] = useState('')
    const [bookingStartDate, setBookingStartDate] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        axios.get(`${API_BASE_URL}/movie/` + movieId, {
            headers: { 'Authorization': `Bearer ${admin.token}` }
        })
            .then(response => {
                setTitle(response.data.result.title)
                setDirector(response.data.result.director)
                setActors(response.data.result.actors)
                setDescription(response.data.result.description)
                setGenre(response.data.result.genre)
                setReleaseDate(response.data.result.releaseDate)
                setPosterUrl(response.data.result.posterUrl)
                setBookingStartDate(response.data.result.bookingStartDate)
            })
    }, [movieId, admin.token])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`${API_BASE_URL}/movie/${movieId}`, {
            title, director, actors, description, genre, releaseDate, posterUrl, bookingStartDate
        }, {
            headers: { 'Authorization': `Bearer ${admin.token}` }
        })
            .then((res) => {
                setErrorMsg('')
                navigate('/allMovies')
            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMsg(error.response.data.message);
                } else {
                    setErrorMsg('Failed to connect to api');
                }
            })
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <h1 className='text-center text-dark mt-3'><b>Edit Movie</b></h1>
                <div className="col-md-6 mt-1 bg-dark rounded p-4">
                    <form className="row g-3 text-light" onSubmit={handleSubmit}>
                        {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ''}
                        <div className="col-md-6">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Director</label>
                            <input type="text" className="form-control" value={director} onChange={(e) => setDirector(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Actors</label>
                            <input type="text" className="form-control" value={actors} onChange={(e) => setActors(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Genre</label>
                            <select className="form-select" value={genre} onChange={(e) => { setGenre(e.target.value) }}>
                                <option value="" disabled>Choose...</option>
                                <option value="Drama">Drama</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Musical,Romance">Musical,Romance</option>
                                <option value="Adventure,Drama">Adventure, Drama</option>
                                <option value="Biopic">Biopic</option>
                                <option value="Biopic">Action</option>
                                <option value="Mystery,Horror">Mystery,Horror</option>
                                <option value="Action,Sci-Fi,Thriller">Action, Sci-Fi, Thriller</option>
                                <option value="Comedy,Romance">Comedy, Romance</option>
                                <option value="Action,Crime,Thriller">Action, Crime, Thriller</option>
                                <option value="Horror,Thriller">Horror, Thriller</option>
                                <option value="Action,Adventure,Animation,Comedy">Action, Adventure, Animation, Comedy</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Booking Start Date</label>
                            <input type="date" className="form-control" value={bookingStartDate} onInput={(e) => setBookingStartDate(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Release date</label>
                            <input type="date" className="form-control" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Poster Url</label>
                            <input type="text" className="form-control" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} />
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary" type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default checkAuth(Update)
