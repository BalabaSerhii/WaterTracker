import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAvatar, selectUserInfo } from '../../redux/user/selectors';
import { logOut } from '../../redux/auth/operations';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';
import SettingModal from '../SettingModal/SettingModal';
import UserLogoModal from '../UserLogoModal/UserLogoModal';
import icon from '../../assets/img/icons.svg';
import defaultAvatar from '../../assets/img/desc/User.png'; 
import css from './UserLogo.module.css';

const UserLogo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const userAvatar = useSelector(selectUserAvatar); 

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isUserLogoModalOpen, setIsUserLogoModalOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const buttonRef = useRef(null);

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    dispatch(logOut());
    setIsLogoutModalOpen(false);
  };

  const handleCloseSettingModal = () => {
    setIsSettingModalOpen(false);
  };

  const handleUserLogoClick = e => {
    if (e.target.closest('svg')) {
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        setAnchorPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
      setIsUserLogoModalOpen(false);
    }
  };

  const handleCloseUserLogoModal = () => {
    setIsUserLogoModalOpen(false);
  };

  const getUserInitial = () => {
    if (userInfo?.name) {
      return userInfo.name.charAt(0).toUpperCase();
    }
    if (userInfo?.email) {
      return userInfo.email.charAt(0).toUpperCase();
    }
    return '?';
  };

  const handleToggleModal = () => {
    setIsUserLogoModalOpen(prevState => !prevState);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.point}>
        <p>{userInfo?.name || userInfo?.email || 'User'}</p>
        <button
          ref={buttonRef}
          className={css.userLogoButton}
          onClick={handleUserLogoClick}
        >
          {userAvatar ? (
            <img
              src={userAvatar} 
              alt={`${userInfo?.name || 'User'}'s avatar`}
              className={css.avatar}
            />
          ) : (
            <img
              src={defaultAvatar}
              alt="Default avatar"
              className={css.avatar}
            />
          )}
        </button>
        <svg className={css.icon} onClick={handleToggleModal}>
          <use href={`${icon}#icon-arrow-down`} />
        </svg>
      </div>

      {isLogoutModalOpen && (
        <UserLogoutModal
          isOpen={isLogoutModalOpen}
          onClose={handleCloseLogoutModal}
          onLogout={handleConfirmLogout}
        />
      )}

      {isSettingModalOpen && (
        <SettingModal
          isOpen={isSettingModalOpen}
          onClose={handleCloseSettingModal}
        />
      )}

      {isUserLogoModalOpen && (
        <UserLogoModal
          isOpen={isUserLogoModalOpen}
          onClose={handleCloseUserLogoModal}
          anchorPosition={anchorPosition}
          userAvatar={userAvatar}
        />
      )}
    </div>
  );
};

export default UserLogo;
