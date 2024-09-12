import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
// import { googleLogin } from '../redux/actions';
import css from './GoogleButton.module.css';

const GoogleButton = () => {

const handleGoogleLogin = () => {
  window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
    'client_id=YOUR_CLIENT_ID&' +
    'redirect_uri=https://project-water-bac.onrender.com/auth/google/callback&' +
    'scope=email profile&' +
    'response_type=code&' +
    'access_type=offline&' +
    'include_granted_scopes=true';
};

  return (
    <button onClick={handleGoogleLogin} className={css.google_button}>
      <FcGoogle size={20} /> Continue with Google
    </button>
  );
};

export default GoogleButton;
