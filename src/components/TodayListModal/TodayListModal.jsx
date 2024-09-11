import css from "./TodayListModal.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { postWater } from "../../redux/water/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/user/selectors";
// import ButtonComponent from "../Modal/ButtonComponent/ButtonComponent";

export default function TodayListModal({ onClose }) {
  const [amount, setAmount] = useState(50); // Amount of water in ml
  const [currentTime, setCurrentTime] = useState(new Date()); // Current time

  const dispatch = useDispatch();

  const handleSave = () => {
    const formattedDate = currentTime.toISOString().slice(0, 16); // Format date as "YYYY-MM-DDTHH:mm"

    const waterData = {
      waterVolume: amount,
      date: formattedDate,
    };

    // Dispatch action to save water data
    dispatch(postWater(waterData));
    console.log(waterData);
  };



  const handleTimeChange = (event) => {
    const [hours, minutes] = event.target.value.split(":");
    const updatedTime = new Date(currentTime);
    updatedTime.setHours(hours);
    updatedTime.setMinutes(minutes);
    setCurrentTime(updatedTime); // Update time based on user input
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
    setAmount((prevAmount) => Math.max(0, prevAmount + adjustment)); // Adjust amount, ensuring it doesn't go below 0
  };
return (
    <Modal modalTitle="Add water" onClose={onClose}>
      <div className={css.modalContainer}>
        <p className={css.large_text}>Choose a value:</p>
        <p className={css.small_text}>Amount of water:</p>
        <div className={css.div}>
          <button
            className={css.icon}
            onClick={() => handleAmountAdjustment(-50)} // Decrease by 50 ml
          >
            <svg width="24" height="24" fill=" #407bff">
              <use href="/src/assets/img/icons.svg#icon-minus"></use>
            </svg>
          </button>
          <span className={css.amount}>{amount} ml</span>
          <button
            className={css.icon}
            onClick={() => handleAmountAdjustment(50)} // Increase by 50 ml
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
          value={currentTime.toTimeString().substring(0, 5)} // Display current time
          onChange={handleTimeChange}
        />

        <p className={css.large_text}>Enter the value of the water used:</p>
        <input
          className={css.input}
          type="number"
          value={amount}
          onChange={handleInputAmountChange} // Update amount when the user inputs a value
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