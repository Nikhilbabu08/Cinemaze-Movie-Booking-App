import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { adminLogout, userLogout } from '../../store/AuthSlice';
import API_BASE_URL from './../../config';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector(store => store.auth.admin);
  const user = useSelector(store => store.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAdminLogout = () => {
    if (admin) {
      axios.post(`${API_BASE_URL}/admin/logout`, {}, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      dispatch(adminLogout());
      navigate('adminLogin');
    }
  };

  const handleUserLogout = () => {
    if (user) {
      axios.post(`${API_BASE_URL}/user/logout`, {}, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      dispatch(userLogout());
      navigate('userLogin');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg fixed-top" style={{ backgroundColor: "#154360", color: "#000" }}>
        <div className="container-fluid">
          <NavLink to={'/'} className="navbar-brand"><b><span style={{ color: "#ff5733" }}>CIN</span>E<span style={{ color: "#ff5733" }}>MAZ</span>E</b></NavLink>
          <button className="navbar-toggler" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink to={'/'} className='nav-link'>Home</NavLink>
            </div>
            <div className="navbar-nav ms-auto">
              {admin ?
                <>
                  <NavLink to={'/allMovies'} className="nav-link">All Movies</NavLink>
                  <NavLink to={'/addMovie'} className="nav-link">Add Movies</NavLink>
                  <Link onClick={handleAdminLogout} className="nav-link">Logout</Link>
                </> : <></>}
              {user ?
                <>
                  <NavLink to={'/allMoviesUser'} className="nav-link">All Movies</NavLink>
                  <NavLink to={'/myBooking'} className="nav-link">My Bookings</NavLink>
                  <Link onClick={handleUserLogout} className="nav-link">Logout</Link>
                </> : <></>}

              {!admin && !user ?
                <>
                  <NavLink to={'/userLogin'} className="nav-link">User</NavLink>
                  <NavLink to={'/adminLogin'} className="nav-link">Admin</NavLink>
                </> : <></>}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
