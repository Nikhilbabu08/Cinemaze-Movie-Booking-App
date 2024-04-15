import React from 'react';
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
    <nav className="navbar navbar-dark bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <NavLink to={'/'} className="navbar-brand"><b><span style={{ color: "#ff5733" }}>CIN</span>E<span style={{ color: "#ff5733" }}>MAZ</span>E</b></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><b><span style={{ color: "#ff5733" }}>CIN</span>E<span style={{ color: "#ff5733" }}>MAZ</span>E</b></h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to={'/'} className="nav-link">Home</NavLink>
              </li>
              {admin &&
                <>
                  <li className="nav-item">
                    <NavLink to={'/allMovies'} className="nav-link">All Movies</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/addMovie'} className="nav-link">Add Movies</NavLink>
                  </li>
                  <li className="nav-item">
                    <Link onClick={handleAdminLogout} className="nav-link">Logout</Link>
                  </li>
                </>
              }
              {user &&
                <>
                  <li className="nav-item">
                    <NavLink to={'/allMoviesUser'} className="nav-link">All Movies</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/myBooking'} className="nav-link">My Bookings</NavLink>
                  </li>
                  <li className="nav-item">
                    <Link onClick={handleUserLogout} className="nav-link">Logout</Link>
                  </li>
                </>
              }
              {!admin && !user &&
                <>
                  <li className="nav-item">
                    <NavLink to={'/userLogin'} className="nav-link">User</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/adminLogin'} className="nav-link">Admin</NavLink>
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
