import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./style.module.scss";

import PropTypes from "prop-types";

export default function Modal({ modalTitle, children }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleCloseModal = () => setIsVisible(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";

    const handleKeyDown = ({ key }) => {
      if (key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className={`${styles.modalWrapper} ${isVisible ? styles.visible : ""}`}
      onClick={handleCloseModal}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTop}>
          <h3>{modalTitle}</h3>
          <button onClick={handleCloseModal}>
            <svg className={styles.svg} width={20} height={20}>
              <use className={styles.use} href="/src/assets/img/icons.svg#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
