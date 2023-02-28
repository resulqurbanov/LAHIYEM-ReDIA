import React, { useState } from 'react'
import "./Auth.scss"
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from '../../actions/AuthActions';


const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState( {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  // const dispatch = useDispatch()

  // input sifirlama
  const resetForm = () => {
    setData( {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
    setConfirmPass(confirmPass);
  };

  // login datasini goturmek
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // formun tesdiqini gondermek
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };


  return (
    <div className="Auth">
      <div className="blur" style={{ top: '18%', right: '0' }}></div>
      <div className="blur" style={{ top: '10%', left: '5rem' }}></div>
      <div className="blur" style={{ bottom: '0%', left: '40rem' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
      <div className="blur" style={{ top: '2%', right: '30rem' }}></div>
      <div className="blur" style={{ top: '63%', right: '0rem' }}></div>
      <div className="blur" style={{ top: '60%', left: '11rem', color: '#e4f925' }}></div>
      <div className="a-left">
        <div className='logo'>
          <img src="https://www.pngkey.com/png/full/380-3809630_shop-r-letter-png-logo.png" alt="" />
        </div>
        <div className="Webname">
          <h1>ReDIA</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

    {/* right form side */}

    <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;