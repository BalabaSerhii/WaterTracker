import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
// import { googleLogin } from '../redux/actions';
import css from './GoogleButton.module.css';

const GoogleButton = () => {

  const handleGoogleLogin = () => {
  const clientId = '1023602385270-fvjc183aqggcs1q49l8090rtjqg2nvus.apps.googleusercontent.com';
  const redirectUri = 'https://water-tracker-project-8.vercel.app/home';
  const scope = 'email profile';
  const responseType = 'code';
  const accessType = 'offline';
  const includeGrantedScopes = 'true';

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(clientId)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `response_type=${encodeURIComponent(responseType)}&` +
    `access_type=${encodeURIComponent(accessType)}&` +
    `include_granted_scopes=${encodeURIComponent(includeGrantedScopes)}`;

  window.location.href = authUrl;
};

  return (
    <button onClick={handleGoogleLogin} className={css.google_button}>
      <FcGoogle size={20} /> Continue with Google
    </button>
  );
};

export default GoogleButton;
