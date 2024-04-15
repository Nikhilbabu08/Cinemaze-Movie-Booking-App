import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <nav className="navbar navbar-dark navbar-expand-lg fixed-top space-between " style={{ backgroundColor: "#154360 ", color: "#000" }}>
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand"><b><span style={{ color: "#ff5733" }}>CIN</span>E<span style={{ color: "#ff5733" }}>MAZ</span>E</b></Link>
        <div className="d-lg-none">
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
       {/* <div className="collapse navbar-collapse d-lg-block">
          <div className="navbar-nav">
            <NavLink to={'/'} className='nav-link'>Home</NavLink>
          </div>
  </div> */}
        <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel" style={{backgroundColor:"#F0F3F4",width: '50%' }}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"><b><span style={{ color: "#ff5733" }}>CIN</span>E<span style={{ color: "#ff5733" }}>MAZ</span>E</b></h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body" style={{ backgroundColor: "#154360 ", color: "#000", transition: 'transform 0.3s ease' }}>
            <ul className="navbar-nav flex-grow-1 pe-3">
              {admin &&
                <>
                  <li className="nav-item">
                    <Link to={'/allMovies'} className="nav-link" onClick={() => document.getElementById("offcanvasNavbar").classList.remove("show")}>All Movies</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/addMovie'} className="nav-link" onClick={() => document.getElementById("offcanvasNavbar").classList.remove("show")}>Add Movies</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleAdminLogout}>Logout</Link>
                  </li>
                </>
              }
              {user &&
                <>
                  <li className="nav-item">
                    <Link to={'/allMoviesUser'} className="nav-link" onClick={() => document.getElementById("offcanvasNavbar").classList.remove("show")}>All Movies</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/myBooking'} className="nav-link" onClick={() => document.getElementById("offcanvasNavbar").classList.remove("show")}>My Bookings</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleUserLogout}>Logout</Link>
                  </li>
                </>
              }
              {!admin && !user &&
                <>
                  <li className="nav-item">
                    <Link to={'/userLogin'} className="nav-link" onClick={() => document.getElementById("offcanvasNavbar").classList.remove("show")}>User</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/adminLogin'} className="nav-link" onClick={() => document.getElementById("offcanvasNavbar").classList.remove("show")}>Admin</Link>
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
