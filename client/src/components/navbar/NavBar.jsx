import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { adminLogout, userLogout } from '../../store/AuthSlice';
import API_BASE_URL from './../../config';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector(store => store.auth.admin);
  const user = useSelector(store => store.auth.user);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const offcanvasRef = useRef(null);

  const handleAdminLogout = (event) => {
    event.preventDefault();
    if (admin) {
      axios.post(`${API_BASE_URL}/admin/logout`, {}, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      dispatch(adminLogout());
      navigate('adminLogin');
    }
  };

  const handleUserLogout = (event) => {
    event.preventDefault();
    if (user) {
      axios.post(`${API_BASE_URL}/user/logout`, {}, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      dispatch(userLogout());
      navigate('userLogin');
    }
  };

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-lg fixed-top space-between " style={{ backgroundColor: "#154360 ", color: "#000" }}>
      <div className="container-fluid">
        <NavLink exact to={'/'} className="navbar-brand"><b><span style={{ color: "#ff5733" }}>CIN</span>E<span style={{ color: "#ff5733" }}>MAZ</span>E</b></NavLink>
        <div className="d-lg-none">
          <button className="navbar-toggler" type="button" onClick={toggleOffcanvas} aria-expanded={isOffcanvasOpen ? "true" : "false"}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className={`offcanvas offcanvas-end ${isOffcanvasOpen ? 'show' : ''}`} ref={offcanvasRef} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel" style={{ backgroundColor: "#F0F3F4", width: '50%' }}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"><b><span style={{ color: "#ff5733" }}>CIN</span>E<span style={{ color: "#ff5733" }}>MAZ</span>E</b></h5>
            <button type="button" className="btn-close text-reset" onClick={closeOffcanvas} aria-label="Close"></button>
          </div>
          <div className="offcanvas-body" style={{ backgroundColor: "#154360 ", color: "#000", transition: 'transform 0.3s ease' }}>
            <ul className="navbar-nav flex-grow-1 pe-3">
              {admin &&
                <>
                  <li className="nav-item">
                    <NavLink to={'/allMovies'} onClick={closeOffcanvas} className="nav-link" activeClassName="active">All Movies</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/addMovie'} onClick={closeOffcanvas} className="nav-link" activeClassName="active">Add Movies</NavLink>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" onClick={handleAdminLogout}>Logout</a>
                  </li>
                </>
              }
              {user &&
                <>
                  <li className="nav-item">
                    <NavLink to={'/'} onClick={closeOffcanvas} className="nav-link" activeClassName="active">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/allMoviesUser'} onClick={closeOffcanvas} className="nav-link" activeClassName="active">All Movies</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/myBooking'} onClick={closeOffcanvas} className="nav-link" activeClassName="active">My Bookings</NavLink>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" onClick={handleUserLogout}>Logout</a>
                  </li>
                </>
              }
              {!admin && !user &&
                <>
                  <li className="nav-item">
                    <NavLink to={'/userLogin'} onClick={closeOffcanvas} className="nav-link" activeClassName="active">User</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/adminLogin'} onClick={closeOffcanvas} className="nav-link" activeClassName="active">Admin</NavLink>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
