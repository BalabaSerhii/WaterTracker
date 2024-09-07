// import { Suspense } from "react";
// import SharedLayout from "../SharedLayout/SharedLayout";
// import { Route, Routes } from "react-router-dom";
// // import PrivateRoute from '../PrivateRoute/PrivateRoute'
// import { lazy } from "react";
// // import RestrictedRoute from '../RestrictedRoute/RestrictedRoute'
// import Loader from "../Loader/Loader";
// import css from "./App.module.css";

// const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
// const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
// const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
// const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));
// const NotFoundPage = lazy(() =>
//   import("../../pages/NotFoundPage/NotFoundPage")
// );

// export default function App() {
//   return (
//     <div className={css.container}>
//       <Suspense fallback={<Loader />}>
//         <SharedLayout path="/">
//           <Routes>
//             <Route path="/welcome" element={<WelcomePage />}></Route>
//             <Route path="/signin" element={<SignInPage />}></Route>
//             <Route path="/signup" element={<SignUpPage />}></Route>
//             <Route path="/home" element={<HomePage />}></Route>
//             <Route path="/*" element={<NotFoundPage />}></Route>
//           </Routes>
//         </SharedLayout>
//       </Suspense>
//     </div>
//   );
// }
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, logIn, logOut } from "../../redux/auth/operations"; // Убедитесь, что путь правильный
import { selectAuthError, selectAuthLoading } from "../../redux/auth/selectors"; // Ваши селекторы
import { selectToken } from "../../redux/auth/selectors";
import {
  fetchUser,
  updateUserInfo,
  updateUserPhoto,
} from "../../redux/user/operations";

export default function App() {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  // Получаем состояние загрузки и ошибки из Redux
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // Обработчик выбора файла
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Если файл не выбран, ничего не делаем
    if (!avatar) {
      return;
    }

    // Создаем FormData и добавляем файл аватара
    const formData = new FormData();
    formData.append("avatar", avatar);

    // Отправляем данные через операцию updateUserPhoto
    try {
      const result = await dispatch(updateUserPhoto(formData));

      if (updateUserPhoto.fulfilled.match(result)) {
        console.log("Avatar updated successfully", result.payload);
      } else {
        console.log("Failed to update avatar", result.error.message);
      }
    } catch (error) {
      console.error("Error during avatar update", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="avatar">Upload Avatar:</label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleFileChange}
          required
        />
      </div>

      {isLoading && <p>Updating avatar...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <button type="submit" disabled={isLoading || !avatar}>
        Update Avatar
      </button>
    </form>
  );
  //   const dispatch = useDispatch();
  //   const token = useSelector(selectToken); // Проверяем наличие токена
  //   const isLoading = useSelector(selectAuthLoading); // Состояние загрузки
  //   const error = useSelector(selectAuthError); // Ошибка
  //   // Состояние формы
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     avatar: null, // Аватар может быть файлом
  //   });
  //   // Обработчик изменений полей ввода
  //   const handleChange = (e) => {
  //     const { name, value, files } = e.target;
  //     if (name === "avatar" && files) {
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         [name]: files[0], // Если загружается файл, используем первый элемент массива файлов
  //       }));
  //     } else {
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         [name]: value,
  //       }));
  //     }
  //   };
  //   // Обработчик отправки формы
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     // Создаем formData для отправки на сервер (нужно для multipart/form-data)
  //     const updatedData = new FormData();
  //     updatedData.append("name", formData.name);
  //     updatedData.append("email", formData.email);
  //     if (formData.avatar) {
  //       updatedData.append("avatar", formData.avatar); // Если есть новый аватар, добавляем его
  //     }
  //     try {
  //       const result = await dispatch(updateUserPhoto(updatedData));
  //       if (updateUserInfo.fulfilled.match(result)) {
  //         console.log("User updated successfully:", result.payload);
  //       } else {
  //         console.log("Failed to update user:", result.error.message);
  //       }
  //     } catch (error) {
  //       console.error("Error during user update:", error);
  //     }
  //   };
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label htmlFor="name">Name:</label>
  //         <input
  //           type="text"
  //           name="name"
  //           id="name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="email">Email:</label>
  //         <input
  //           type="email"
  //           name="email"
  //           id="email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="avatar">Avatar:</label>
  //         <input
  //           type="file"
  //           name="avatar"
  //           id="avatar"
  //           onChange={handleChange}
  //           accept="image/*"
  //         />
  //       </div>
  //       {isLoading && <p>Updating...</p>}
  //       {error && <p style={{ color: "red" }}>Error: {error}</p>}
  //       <button type="submit" disabled={isLoading}>
  //         Update User
  //       </button>
  //     </form>
  //   );
  //   const dispatch = useDispatch();
  //   const token = useSelector(selectToken); // Проверяем наличие токена
  //   const isLoading = useSelector(selectAuthLoading); // Состояние загрузки
  //   const [userData, setUserData] = useState(null); // Состояние для хранения данных пользователя
  //   // Запрос данных пользователя при монтировании компонента
  //   useMemo(() => {
  //     if (token) {
  //       dispatch(fetchUser())
  //         .unwrap() // Для того, чтобы получить чистый результат из промиса
  //         .then((data) => {
  //           console.log(data.data.email);
  //           setUserData(data);
  //         })
  //         .catch((error) => {
  //           console.error("Failed to fetch user data:", error);
  //         });
  //     }
  //   }, [dispatch, token]);
  //   // Отображаем данные пользователя
  //   if (isLoading) {
  //     return <p>Loading user data...</p>;
  //   }
  //   if (!userData) {
  //     return <p>No user data available</p>;
  //   }
  //   return (
  //     <div>
  //       <h1>User Profile</h1>
  //       <p>Name: {userData.name}</p>
  //       <p>Email: {userData.email}</p>
  //     </div>
  //   );
  //   const dispatch = useDispatch();
  //   const isLoading = useSelector(selectAuthLoading);
  //   const handleLogout = async () => {
  //     try {
  //       const result = await dispatch(logOut());
  //       console.log(result);
  //       if (logOut.fulfilled.match(result)) {
  //         console.log("Logout successful");
  //       } else {
  //         console.log("Logout failed:", result.error.message);
  //       }
  //     } catch (error) {
  //       console.error("Error during logout", error);
  //     }
  //   };
  //   return (
  //     <button onClick={handleLogout} disabled={isLoading}>
  //       {isLoading ? "Logging out..." : "Logout"}
  //     </button>
  //   );

  //   const dispatch = useDispatch();
  //   const [formData, setFormData] = useState({
  //     email: "",
  //     password: "",
  //   });
  //   // Получаем состояние загрузки и ошибки из Redux
  //   const isLoading = useSelector(selectAuthLoading);
  //   const error = useSelector(selectAuthError);
  //   // Обработчик изменений в полях ввода
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };
  //   // Обработчик отправки формы
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const result = await dispatch(logIn(formData));
  //     console.log(result);
  //   };
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label htmlFor="email">Email:</label>
  //         <input
  //           type="email"
  //           name="email"
  //           id="email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="password">Password:</label>
  //         <input
  //           type="password"
  //           name="password"
  //           id="password"
  //           value={formData.password}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       {isLoading && <p>Registering...</p>}
  //       {error && <p style={{ color: "red" }}>Error: {error}</p>}
  //       <button type="submit" disabled={isLoading}>
  //         Register
  //       </button>
  //     </form>
  //   );
}
