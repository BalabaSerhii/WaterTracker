import { Suspense, useEffect, useSelector } from 'react'
import axios from "axios"
import SharedLayout from '../SharedLayout/SharedLayout'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { lazy } from 'react'
import Loader from '../Loader/Loader'
import css from './App.module.css'

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"))
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"))
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"))
const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"))
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"))



export default function App() {
      useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

    return (
        <div className={css.container}>
            <Suspense fallback={<Loader/>}>
                <SharedLayout path ='/' element={
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
            }>
                        <Routes>
                            <Route path='/welcome' element={<WelcomePage/>}/>
                            <Route path='/signin' element={<SignInPage/>}/>
                            <Route path='/signup' element={<SignUpPage/>}/>
                            <Route path='/home' element={
                                <PrivateRoute>
                                    <HomePage />
                                </PrivateRoute>}/>
                            
                            <Route path='/*' element={<NotFoundPage/>}></Route>
                        </Routes>
                </SharedLayout>
            </Suspense>
        </div>
    )
}