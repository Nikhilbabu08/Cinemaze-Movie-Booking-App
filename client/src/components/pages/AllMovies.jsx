import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Modal from './ModalDelete';
import checkAuth from '../auth/admin/checkAuth';
import  API_BASE_URL  from './../../config'

const AllMovies = () => {
  const navigate = useNavigate()
  const admin = useSelector(store => store.auth.admin)
  const [movies, setMovies] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [disabledMovies, setDisabledMovies] = useState(() => {

    const storedDisabledMovies = localStorage.getItem('disabledMovies');
    return storedDisabledMovies ? JSON.parse(storedDisabledMovies) : [];

  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/movie`)
      .then((res) => { setMovies(res.data.allMovies); setIsLoading(false); })
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('disabledMovies', JSON.stringify(disabledMovies));
  }, [disabledMovies]);

  const handleDelete = (movieId) => {
    setDeleteItemId(movieId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    axios.delete(`${API_BASE_URL}/movie/${deleteItemId}`, {
      headers: { 'Authorization': `Bearer ${admin.token}` }
    }).then((response) => {
      setMovies(prevMovie => prevMovie.filter(movie => movie._id !== deleteItemId))
      setShowModal(false);
      navigate('/allMovies')
    }).catch((error) => {
      console.error('Delete Error:', error)
    })
  }

  const handleDisable = (movieId) => {
    if (disabledMovies.includes(movieId)) {
      setDisabledMovies(prevDisabledMovies => prevDisabledMovies.filter(id => id !== movieId));
    } else {
      setDisabledMovies(prevDisabledMovies => [...prevDisabledMovies, movieId]);
    }

    axios.put(`${API_BASE_URL}/movie/${movieId}/toggleDisableMovie`, {}, {
      headers: { 'Authorization': `Bearer ${admin.token}` }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error disabling/enabling movie:', error);
      });
  };



  return (
    <div className="container mt-5">
      {isLoading ? ( // Check loading state
        <div className='text-center' style={{ marginTop: "190px" }}>
          <div className="spinner-grow text-primary mt-5" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden mt-5">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <h1 className='text-center text-dark mt-2'><b>All Movies</b></h1>
            <div className="card-container carddd-container">
              {movies.map((item) => (
                <div className="card carddd mt-2" key={item._id}>
                  <img src={item.posterUrl} className="card-img-top" alt={item.title} />
                  <div className="card-body carddd-body">
                    <h5 className="card-title carddd-title"> {item.title.length > 26 ? `${item.title.substring(0, 26)}...` : item.title}</h5>
                    <p className="card-text carddd-text">{item.genre}</p>
                    <div className="d-flex justify-content-evenly">
                      <Link to={`/${item._id}/update`} type='button' className="btn btn-warning">Edit</Link>
                      <Link onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete</Link>
                      <button className={`btn ${disabledMovies.includes(item._id) ? 'btn-secondary' : 'btn-success'}`} onClick={() => handleDisable(item._id)}>
                        {disabledMovies.includes(item._id) ? 'Enable' : 'Disable'}
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal component for delete confirmation */}
      <Modal show={showModal} handleClose={() => setShowModal(false)} handleDelete={confirmDelete}>
        <div className="modal-header">
          <h5 className="modal-title">Confirm Delete</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}

export default checkAuth(AllMovies)
