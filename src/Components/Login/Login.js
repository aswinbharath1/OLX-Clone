import React, { useState, useContext, useEffect, useRef } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [EmailError, setEmailError] = useState('')
  const [PasswordError, setPasswordError] = useState('')
  const { firebase } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const emailInput = useRef(null)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) navigate('/')
    function focusInput() {  
      emailInput.current.focus();
    }
    focusInput()
  }, [user, navigate])

  const handleLogin = async (event) => {      
    try {
      event.preventDefault()
      setEmail((email).toLowerCase().trimEnd())
      let isError = false

      if (password.trim() == '') {
        setPasswordError('Empty password')
        isError = true
      } else {
        setPasswordError('')
      }

      if (email.trim() == '' || !email.endsWith('@gmail.com')) {
        setEmailError('invalid email')
        isError = true
      } else {
        setEmailError('')
      }

      if (isError) {
        return
      }


      const auth = firebase.firebaseAuth.getAuth();
      await firebase.firebaseAuth.signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.displayName + " Logged in")   //test
          Swal.fire({ position: 'top-end', icon: 'success', text: 'Login success', width: 200, showConfirmButton: false, timer: 1500 })
          navigate('/')
        }).catch((err) => {
          if (err.message === "Firebase: Error (auth/network-request-failed).") {
            Swal.fire({
              icon: 'warning',
              title: 'Network Error',
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Wrong Credentials',
            })
          }
        })

    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <div>
      <div className="row mx-5 p-4 ">
        <div className="col-12 col-md-4 p-4"></div>
        <div className="col-12 col-md-4 p-4 box">
          <div className="text-center" style={{ cursor: 'pointer' }}>
            <img width="150em" onClick={() => navigate('/')} src={Logo} alt='OLX-Logo'></img>
          </div>

          <div className="p-3">
            <form className="formData" onSubmit={handleLogin} noValidate>
              <div className="col-12 px-2">

                <div className="mb-3">
                  <label htmlFor="email" ref={emailInput} className="form-label">Email address</label>
                  <input type="email" name="email" className="form-control" id="email" 
                    placeholder="Enter email ID"
                    value={email} onChange={(input) => setEmail(input.target.value)} />
                  <div className='error' >{EmailError}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" placeholder="Enter password"
                    id="password"
                    value={password} onChange={(input) => setPassword(input.target.value)} />
                  <div className='error' >{PasswordError}</div>

                </div>

                <div className="text-center mb-2">
                  <button type="submit" className="btn btn-primary w-50">Login</button>
                </div>
                <p className="text-center">New to OLX? <span onClick={() => navigate("/signup")} style={{ cursor: 'pointer' }}>Signup</span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
