import React, { useState } from "react";
import styles from "./DeleteWaterModal.module.css";
import Modal from "../Modal/Modal";

import ButtonComponent from "../ButtonComponent/ButtonComponent";

const DeleteWaterModal = ({ isOpen, onClose, entryId }) => {
  return (
    <Modal modalTitle="Delete entry" onClose={onClose}>
      <div>
        <p className={styles.text}>
          Are you sure you want to delete the entry?
        </p>
        <div className={styles.div}>
          <ButtonComponent
            text="Cancel"
            color="rgba(64, 123, 255, 1)"
            backgroundColor="rgba(215, 227, 255, 1)"
          />
          <ButtonComponent
            text="Delete"
            color="rgba(255, 255, 255, 1)"
            backgroundColor="rgba(239, 80, 80, 1)"
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
