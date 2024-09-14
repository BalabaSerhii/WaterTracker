import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';
import styles from './SettingModal.module.css';
import IconComponent from '../IconComponent/IconComponent';
import defaultAvatar from '../../assets/img/desc/User.png';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { selectUserData } from '../../redux/user/selectors';
import { updateUserInfo, updateUserPhoto } from '../../redux/user/operations';

const SettingModal = ({ onClose, isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  const defaultUser = {
    photo: '',
    gender: 'woman',
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  };

  const [userData, setUserData] = useState(user || defaultUser);
  const [initialUserData, setInitialUserData] = useState(user || defaultUser);
  const [localPhotoURL, setLocalPhotoURL] = useState(null); 
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      const email = user.email;
      const nameFromEmail = email.split('@')[0];

      const updatedUser = {
        ...user,
        email: user.email,
        name: user.name || nameFromEmail,
        photo: user.photo || defaultAvatar,
        gender: user.gender || 'woman',
      };

      setUserData(updatedUser);
      setInitialUserData(updatedUser);
    }
  }, [user]);

  useEffect(() => {
    const isDataChanged =
      JSON.stringify(userData) !== JSON.stringify(initialUserData);
    setIsSaveDisabled(!isDataChanged);
  }, [userData, initialUserData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setLocalPhotoURL(URL.createObjectURL(file)); 
      setUserData(prevData => ({ ...prevData, photo: file }));
    }
  };

  const handleSave = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      
      if (
        userData.newPassword &&
        userData.newPassword !== userData.confirmPassword
      ) {
        setErrorMessage('Passwords do not match!');
        return;
      }

      // Если был изменен аватар
      if (userData.photo && typeof userData.photo === 'object') {
        const formData = new FormData();
        formData.append('photo', userData.photo);

        dispatch(updateUserPhoto(formData))
          .then(() => {
            setSuccessMessage('Avatar updated successfully!');
          })
          .catch(() => {
            setErrorMessage('Failed to update avatar.');
          });
      }

      const updatedUserInfo = {
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        oldPassword: userData.password, 
        password: userData.newPassword,
      };

      dispatch(updateUserInfo(updatedUserInfo))
        .then(() => {
          setSuccessMessage(
            'User information and password updated successfully!'
          );
        })
        .catch(error => {
          setErrorMessage('Failed to update user information or password.');
        });

      onClose(); 
    } catch (error) {
      setErrorMessage('Failed to update user information.');
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        modalTitle="Setting"
        onClose={onClose}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className={styles.settingContainer}>
          <div>
            <div className={styles.section}>
              <label htmlFor="photo" className={styles.labelPhoto}>
                Your photo
              </label>
              <div className={styles.photoSection}>
                <img
                  src={localPhotoURL || userData.photo || defaultAvatar}
                  alt="user avatar"
                  className={styles.avatar}
                  onClick={() => document.getElementById('photo').click()}
                  style={{ cursor: 'pointer' }}
                />
                <button
                  className={styles.uploadButton}
                  onClick={() => document.getElementById('photo').click()}
                >
                  <IconComponent id="upload" width="16" height="16" />
                  Upload a photo
                </button>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className={styles.hiddenInput}
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            <div className={styles.section}>
              <label className={styles.labelGender}>Your gender identity</label>
              <div className={styles.radioGroup}>
                <label className={styles.labelInput}>
                  <input
                    type="radio"
                    name="gender"
                    value="woman"
                    checked={userData.gender === 'woman'}
                    onChange={handleChange}
                  />
                  Woman
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="man"
                    checked={userData.gender === 'man'}
                    onChange={handleChange}
                  />
                  Man
                </label>
              </div>
            </div>

            <div className={styles.section}>
              <label htmlFor="name" className={styles.YourName}>
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.section}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div>
            <div className={styles.section}>
              <p className={styles.passText}>Password</p>
              <label htmlFor="password">Outdated password:</label>
              <div className={styles.inputWrap}>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Password"
                />
                <button
                  className={styles.buttonSvg}
                  aria-label="Show password"
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <IconComponent
                    className={styles.svg}
                    id={showCurrentPassword ? `open-eye` : `close-eye`}
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>

            <div className={styles.section}>
              <label htmlFor="newPassword">New Password</label>
              <div className={styles.inputWrap}>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={userData.newPassword}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Password"
                />
                <button
                  className={styles.buttonSvg}
                  aria-label="Show password"
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <IconComponent
                    className={styles.svg}
                    id={showNewPassword ? `open-eye` : `close-eye`}
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>

            <div className={styles.section}>
              <label htmlFor="confirmPassword">Repeat new password</label>
              <div className={styles.inputWrap}>
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Password"
                />
                <button
                  className={styles.buttonSvg}
                  aria-label="Show password"
                  type="button"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                >
                  <IconComponent
                    className={styles.svg}
                    id={showConfirmNewPassword ? `open-eye` : `close-eye`}
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>
          </div>

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          {successMessage && (
            <div className={styles.success}>{successMessage}</div>
          )}

          <div className={styles.buttonContainer}>
            <ButtonComponent
              text="Save"
              onClick={handleSave}
              width="256px"
              height="44px"
              disabled={isSaveDisabled}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingModal;
