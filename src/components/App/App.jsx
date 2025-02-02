import { Suspense, useEffect } from 'react';
import axios from 'axios';
import SharedLayout from '../SharedLayout/SharedLayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import Loader from '../Loader/Loader';
import css from './App.module.css';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/user/operations';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';


import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { setIsLoggedIn } from '../../redux/auth/slice';



const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

const key = 'persist:auth';
const value = localStorage.getItem(key);

if (value) {
  try {
    const parsedValue = JSON.parse(value);
    console.log(parsedValue)
    if (parsedValue.accessToken !== 'null') {
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setIsLoggedIn(false));
    }
  } catch (e) {
    console.error('Error parsing JSON from Local Storage:', e);
    dispatch(setIsLoggedIn(false));
  }
} else {
  dispatch(setIsLoggedIn(false));
}

  


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>...Refreshing user</div>
  ) : (
    <div className={css.container}>
      <SharedLayout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/"  element={<WelcomePage />}/>
            <Route path="/welcome" element={<WelcomePage />}></Route>
            <Route path="/signin" element={<RestrictedRoute component={<SignInPage/> } redirectTo="/home"/>}></Route>
            <Route path="/signup" element={<RestrictedRoute component={<SignUpPage/> } redirectTo="/signin"/>}></Route>
            <Route
              path="/home"
              element={
                <PrivateRoute component={<HomePage />} redirectTo="/signin" />
              }
            ></Route>
          
            <Route path="/*" element={<NotFoundPage />}></Route>
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
}
