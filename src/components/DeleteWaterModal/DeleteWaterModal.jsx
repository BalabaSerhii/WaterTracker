import React from 'react';
import styles from './DeleteWaterModal.module.css';
import Modal from '../Modal/Modal';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { deleteWater } from '../../redux/water/operations';
import { useDispatch } from 'react-redux';

const DeleteWaterModal = ({ isOpen, onClose, entryId, setIsOpen }) => {
  const dispatch = useDispatch();

  // const handleCloseModal = () => {
  //   setIsOpen(false); // Use setIsOpen to manage state
  // };
  const handleWaterDelete = () => {
    dispatch(deleteWater(entryId));
    onClose();
  };

  return (
    <Modal
      modalTitle="Delete entry"
      onClose={onClose}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className={styles.container}>
        <p className={styles.text}>
          Are you sure you want to delete this entry?
        </p>
        <div className={styles.buttonContainer}>
          <ButtonComponent
            text="Cancel"
            color="rgba(64, 123, 255, 1)"
            backgroundColor="rgba(215, 227, 255, 1)"
            onClick={onClose}
          />
          <ButtonComponent
            text="Delete"
            color="rgba(255, 255, 255, 1)"
            backgroundColor="rgba(239, 80, 80, 1)"
            onClick={handleWaterDelete}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
