import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import { useNavigate } from 'react-router-dom';
import { decoder } from '../jwt.mjs';
import Logo from '../image/valo.png';
import './dashboard.css';

function Dashboard() {
  const [user, setUser] = useState({});
  const converttodatetime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };


  //form area
  const [formData, setFormData] = useState({
    userid: "",
    email: "",
    name: "",
    login_time: "",
    logout_time: ""
  });

  const sendFormDataToBackend = (data) => {
    axios.post('http://localhost:4000/submit', data)
      .then(response => {
        console.log('Data sent to backend:', response.data);
      })
      .catch(error => {
        console.error('Error sending data to backend:', error);
        if (error.response) {
          console.error('Error response from server:', error.response.data);
        }
      });
  };
  

  const handleGoogleSignInClick = () => {
    const googleSignInDiv = document.getElementsByClassName('googleSignInDiv')[0];
    if (googleSignInDiv) {
      googleSignInDiv.click();  // Simulate click on Google Sign-In button
    }
  };

  //form area

  const handleCredentialResponse = (response) => {
    // console.log('Encoded JWT ID token: ' + response.credential);

    // Decode the JWT
    const decoded = decoder(response.credential);
    setUser(decoded);
    // console.log('Decoded:', decoded);
    
    const logintime = converttodatetime(decoded.iat);
    // console.log("login time:",logintime);

    setFormData({
      userid: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      login_time: logintime,
      logout_time: ""
    });


    const mainElement = document.querySelector('.main');
    if (mainElement) {
      mainElement.style.display = 'none';
    } else {
      console.error('Element with class "main" not found.');
    }
    const loginbt = document.querySelector(".loginbtn");
    loginbt.style.display = 'none';

    //sending data to backend
    sendFormDataToBackend({
      userid: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      login_time: logintime,
      logout_time: ""
    });

  };

  const handlelogin = () => {
    const mainElement = document.querySelector('.main');
    if (mainElement) {
      mainElement.style.display = 'flex';
    } else {
      console.error('Element with class "main" not found.');
    }
  };

  const handlelogout = () => {
    setUser({});
    const loginbt = document.querySelector(".loginbtn");
    loginbt.style.display = 'flex';
    const logout_time = new Date();
    console.log(logout_time)
  }

  useEffect(() => {
    // Function to initialize Google Sign-In
    const initializeGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id: '830804336719-nrg0p8v285fb5a4f1kkaaf6ctafj5eeq.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });

      const googleSignInDiv = document.getElementsByClassName('googleSignInDiv')[0];
      if (googleSignInDiv) {
        window.google.accounts.id.renderButton(googleSignInDiv, { theme: 'outline', size: 'large' });
      } else {
        console.error('Google Sign-In div not found');
      }
    };

    // Check if the Google Sign-In script is loaded
    if (window.google) {
      initializeGoogleSignIn();
    } else {
      // Add an event listener to initialize after the script is loaded
      window.addEventListener('google-loaded', initializeGoogleSignIn);
    }

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('google-loaded', initializeGoogleSignIn);
    };
  }, [handleCredentialResponse]);



  return (
    <>
      {/* Navbar */}
      <div className="navi">
        <div className="logooo">MyWEB</div>
        <div className="abou">ABOUT</div>
        {user &&

          <div className='userinfo'>
            <img src={user.picture} alt="" />
            <h3>{user.name}</h3>
          </div>

        }
        {Object.keys(user).length !== 0 &&
          <button className="logoutbtn" onClick={(e) => handlelogout(e)}>Log Out</button>
        }
        <button className="loginbtn" onClick={(e) => handlelogin(e)}>Log In</button>
      </div >

      {/* Content */}
      < h1 > WELCOME TO MY WEB</h1 >
      <div className="containt">
        <div className='blocker'></div>
        <div className='blocker'></div>
        <div className='blocker'></div>
        <div className='blocker'></div>
        <div className='blocker'></div>
        <div className='blocker'></div>
      </div>
      <div className="containt">
        <div className='blocker'></div>
        <div className='blocker'></div>
        <div className='blocker'></div>
        <div className='blocker'></div>
        <div className='blocker'></div>
        <div className='blocker'></div>
        <div className='blocker'></div>
      </div>

      {/* Login */}
      <div className="main">
        <img src={Logo} alt="" className="logo" />
        <form action="">
          <div className='solo'>Sign In</div>
          <div className='emaildiv'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email' />
          </div>
          <div className='pswddiv'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter Password' />
          </div>
          <div className='submitdiv'>
            <button type='submit' className='submitbtn'>Login</button>
          </div>
          <div className='solo-1'>or log in with</div>
          <button className='googleSignInDiv' onClick={handleGoogleSignInClick}></button> {/* This div is for rendering the Google Sign-In button */}
        </form>
      </div>
    </>
  );
}

export default Dashboard;
