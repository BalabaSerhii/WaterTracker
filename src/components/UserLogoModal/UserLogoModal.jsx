import { useEffect, useRef, useState } from 'react';
import css from './UserLogoModal.module.css';
import SettingModal from '../SettingModal/SettingModal';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';
import icon from '../../assets/img/icons.svg';

const UserLogoModal = ({ isOpen, onClose, anchorPosition }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const modalRef = useRef(null);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  

  const handleOpenSettings = () => {
    
    setIsSettingModalOpen(true);
      setIsModalVisible(false);

  };

  const handleOpenLogout = () => {
    setIsLogoutModalOpen(true);
      setIsModalVisible(false);

  };

  const handleCloseSettings = () => {
    setIsSettingModalOpen(false);
     setIsModalVisible(false);
  };

  const handleCloseLogout = () => {
    setIsLogoutModalOpen(false);
     setIsModalVisible(false);
  };

  useEffect(() => {
    if (isOpen && anchorPosition) {
      const modalElement = modalRef.current;
      modalElement.style.top = `${anchorPosition.top}px`;
      modalElement.style.left = `${anchorPosition.left}px`;
    }
  }, [isOpen, anchorPosition]);

if (!isOpen)  return null;

  return (
 <div className={css.backdrop} onClick={handleBackdropClick}>
      {isModalVisible && (
        <div
          className={`${css.modal} ${
            isSettingModalOpen || isLogoutModalOpen ? css.hidden : ''
          }`} 
          ref={modalRef}
        >
          <div className={css.buttons}>
            <div className={css.buttonsSettings}>
              <svg className={css.buttonsSettingsImg}>
                <use href={`${icon}#icon-settings`} />
              </svg>
              <button className={css.settingsButton} onClick={handleOpenSettings}>
                Settings
              </button>
            </div>
            <div className={css.buttonsLogout}>
              <svg className={css.buttonsLogoutImg}>
                <use href={`${icon}#icon-logout`} />
              </svg>
              <button className={css.logoutButton} onClick={handleOpenLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

        {isSettingModalOpen && (
          <SettingModal
            isOpen={isSettingModalOpen}
            onClose={handleCloseSettings}
            setIsOpen={setIsSettingModalOpen}
          />
        )}
        {isLogoutModalOpen && (
          <UserLogoutModal
            isOpen={isLogoutModalOpen}
            onClose={handleCloseLogout}
            onLogout={() => {
              setIsLogoutModalOpen(false);
            }}
          />
        )}
      </div>
  );
};

export default UserLogoModal;
