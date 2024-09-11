import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import axios from 'axios';
import css from './GoogleButton.module.css';

const GoogleButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const { data } = await axios.get('/auth/get-oauth-url');
      if (data && data.url) {
        window.location.href = data.url;
      } else {
        console.error('URL для OAuth не отримано.');
      }
    } catch (error) {
      toast.error('Error getting Google OAuth URL');
    }
  };

  return (
    <button onClick={handleGoogleLogin} className={css.google_button}>
      <FcGoogle size={20} /> Continue with Google
    </button>
  );
};

export default GoogleButton;
