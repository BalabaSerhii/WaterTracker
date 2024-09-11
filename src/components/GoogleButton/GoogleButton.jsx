import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
// import { googleLogin } from '../redux/actions';
import css from './GoogleButton.module.css';

const GoogleButton = () => {

  const handleGoogleLogin = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=1023602385270-fvjc183aqggcs1q49l8090rtjqg2nvus.apps.googleusercontent.com&redirect_uri=http://localhost:5173/home&scope=email profile`;
    window.location.href = authUrl;
  };

  return (
    <button onClick={handleGoogleLogin} className={css.google_button}>
      <FcGoogle size={20} /> Continue with Google
    </button>
  );
};

export default GoogleButton;
