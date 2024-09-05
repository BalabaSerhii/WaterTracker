import css from "./UserLogoutModal.module.css";
import Modal from "../Modal/Modal";
import css from "./logout.module.css";
// import ButtonComponent from "../Modal/ButtonComponent/ButtonComponent";

export default function UserLogoutModal({ onClose }) {
  return (
    <Modal modalTitle="Log out" onClose={onClose}>
      <div>
        <p className={css.text}>Do you really want to leave?</p>
        <div className={css.div}>
          <ButtonComponent
            text="Cancel"
            color="#407BFF"
            backgroundColor="#D7E3FF"
          />
          <ButtonComponent
            text="Log out"
            color="#FFFFFF"
            backgroundColor="#EF5050"
          />
        </div>
      </div>
    </Modal>
  );
}
