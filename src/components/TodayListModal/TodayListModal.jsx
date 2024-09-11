import css from "./TodayListModal.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { postWater } from "../../redux/water/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/user/selectors";
// import ButtonComponent from "../Modal/ButtonComponent/ButtonComponent";

export default function TodayListModal({ onClose, isOpen, setIsOpen }) {1
  const [amount, setAmount] = useState(50); 
  const [currentTime, setCurrentTime] = useState(new Date()); 

  const dispatch = useDispatch();

  const handleSave = () => {
    const formattedDate = currentTime.toISOString().slice(0, 16); 

    const waterData = {
      waterVolume: amount,
      date: formattedDate,
    };

    dispatch(postWater(waterData));
    console.log(waterData);
  };



  const handleTimeChange = (event) => {
    const [hours, minutes] = event.target.value.split(":");
    const updatedTime = new Date(currentTime);
    updatedTime.setHours(hours);
    updatedTime.setMinutes(minutes);
    setCurrentTime(updatedTime); 
  };

 const handleInputAmountChange = (event) => {
  const value = event.target.value;

 
  if (value === '') {
    setAmount(''); 
  } else {
    setAmount(parseInt(value, 10) || 0); 
  }
};


  const handleAmountAdjustment = (adjustment) => {
    setAmount((prevAmount) => Math.max(0, prevAmount + adjustment)); 
  };
return (
    <Modal modalTitle="Add water" onClose={onClose} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={css.modalContainer}>
        <p className={css.large_text}>Choose a value:</p>
        <p className={css.small_text}>Amount of water:</p>
        <div className={css.div}>
          <button
            className={css.icon}
            onClick={() => handleAmountAdjustment(-50)} 
          >
            <svg width="24" height="24" fill=" #407bff">
              <use href="/src/assets/img/icons.svg#icon-minus"></use>
            </svg>
          </button>
          <span className={css.amount}>{amount} ml</span>
          <button
            className={css.icon}
            onClick={() => handleAmountAdjustment(50)} 
          >
            <svg width="24" height="24" stroke=" #407bff">
              <use href="/src/assets/img/icons.svg#icon-plus"></use>
            </svg>
          </button>
        </div>

        <p className={css.small_text}>Recording time:</p>
        <input
          className={css.input}
          type="time"
          value={currentTime.toTimeString().substring(0, 5)} 
          onChange={handleTimeChange}
        />

        <p className={css.large_text}>Enter the value of the water used:</p>
        <input
          className={css.input}
          type="number"
          value={amount}
          onChange={handleInputAmountChange} 
          min="0"
        />

        <div className={css.buttonSaveContainer}>
          <h2 className={css.amountDown}>{amount} ml</h2>
          <button className={css.buttonSave} type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}