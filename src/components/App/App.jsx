import { Suspense } from "react";
import SharedLayout from "../SharedLayout/SharedLayout";
import { Route, Routes } from "react-router-dom";
// import PrivateRoute from '../PrivateRoute/PrivateRoute'
import { lazy } from "react";
// import RestrictedRoute from '../RestrictedRoute/RestrictedRoute'
import Loader from "../Loader/Loader";
import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

export default function App() {
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <SharedLayout path="/">
          <Routes>
            <Route path="/welcome" element={<WelcomePage />}></Route>
            <Route path="/signin" element={<SignInPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/*" element={<NotFoundPage />}></Route>
          </Routes>
        </SharedLayout>
      </Suspense>
    </div>
  );
}
