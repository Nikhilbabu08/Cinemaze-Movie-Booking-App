import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import  API_BASE_URL  from '../../../config'

const UserSignup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${API_BASE_URL}/user/signup`, {
      name:name,
      email: email,
      password: password
    })
      .then((res) => {
        setErrorMsg('')
        navigate('/userLogin')
      }).catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMsg(error.response.data.message);
        }  else {
          setErrorMsg('Failed to connect to api');
        }
      })
  }
  return (
    <div className='container mt-5'>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h1 className='text-dark text-center mt-5 mb-3'><b>Signup</b></h1>
          <form>
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ''}
          <div className="form-floating mb-3">
              <input type="text" className="form-control" placeholder="usename" value={name} onInput={(e) => setName(e.target.value)} />
              <label className='text-dark'>Full Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" placeholder="name@example.com" value={email} onInput={(e) => setEmail(e.target.value)} />
              <label className='text-dark'>Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control"  placeholder="Password" value={password} onInput={(e) => setPassword(e.target.value)} />
              <label className='text-dark'>Password</label>
            </div>
            <Link type="button" onClick={handleSubmit} className="btn btn-primary col-12 my-3 mx-auto btn-lg"><b>Submit</b></Link>
            <div className='text-center'>
            <p><Link to={'/userLogin'}
              className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover"><b>Already have
                account?</b></Link></p>
                </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
