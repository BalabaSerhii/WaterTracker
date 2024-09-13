import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logInGoogle } from "../../redux/auth/operations"; // Оновіть шлях до правильного місця

const GoogleCallback = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      dispatch(logInGoogle(code));
    }
  }, [dispatch]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
