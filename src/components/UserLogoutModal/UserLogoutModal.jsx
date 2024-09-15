import { useState } from 'react';
import css from './UserLogoutModal.module.css';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';

export default function UserLogoutModal({ onClose, isOpen }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem('persist:auth');
  };

  return (
    <Modal modalTitle="Log out" onClose={onClose} isOpen={isOpen}>
      <div>
        <p className={css.text}>Do you really want to leave?</p>
        <div className={css.div}>
          <button className={css.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={css.logout} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </Modal>
  );
}
