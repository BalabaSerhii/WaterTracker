import css from "./UserLogoutModal.module.css";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
// import ButtonComponent from "../Modal/ButtonComponent/ButtonComponent";

export default function UserLogoutModal({ onClose }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    console.log("logout");
  };

  return (
    <Modal modalTitle="Log out" onClose={onClose}>
      <div>
        <p className={css.text}>Do you really want to leave?</p>
        <div className={css.div}>
          {/* <ButtonComponent

            text="Cancel"
            color="#407BFF"
            backgroundColor="#D7E3FF"
          />
          <ButtonComponent
            text="Log out"
            color="#FFFFFF"
            backgroundColor="#EF5050"   
          /> */}
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </Modal>
  );
}
