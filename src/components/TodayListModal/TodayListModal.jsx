import css from "./TodayListModal.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { postWater } from "../../redux/water/operations";
import { useDispatch } from "react-redux";
// import ButtonComponent from "../Modal/ButtonComponent/ButtonComponent";

export default function TodayListModal({ onClose }) {
  const [amount, setAmount] = useState(50);
  const [inputAmount, setInputAmount] = useState(50);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useDispatch();

  const handleSave = () => {
    const formattedDate = currentTime.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"

    const waterData = {
      waterVolume: amount,
      date: formattedDate,
    };
    console.log(formattedDate);
    // Dispatch the postWater action to save data to the server
    dispatch(postWater(waterData));

    // onSave({ amount, time: currentTime.toTimeString().substring(0, 5) });
    onClose();
  };

  const handleTimeChange = (event) => {
    const [hours, minutes] = event.target.value.split(":");
    const updatedTime = new Date(currentTime);
    updatedTime.setHours(hours);
    updatedTime.setMinutes(minutes);
    setCurrentTime(updatedTime);
  };

  const handleInputAmountChange = (event) => {
    setInputAmount(parseInt(event.target.value, 10));
  };

  const handleAmountAdjustment = (adjustment) => {
    setAmount((prevAmount) => Math.max(0, prevAmount + adjustment));
  };

  return (
    <Modal modalTitle="Add water" onClose={onClose}>
      <div>
        <p className={css.large_text}>Choose a value:</p>
        <p className={css.small_text}>Amount of water:</p>
        <div className={css.div}>
          <button
            className={css.icon}
            onClick={() => handleAmountAdjustment(-parseInt(inputAmount, 10))}>
            <svg width="24" height="24" fill=" #407bff">
              <use href="/src/assets/img/icons.svg#icon-minus"></use>
            </svg>
          </button>
          <span className={css.amount}>{amount} ml</span>
          <button
            className={css.icon}
            onClick={() => handleAmountAdjustment(parseInt(inputAmount, 10))}>
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
          value={inputAmount}
          onChange={handleInputAmountChange}
          min="0"
        />
        <button type="button" onClick={handleSave}>
          Save
        </button>
        {/* <div className={css.btn_save}>
          <ButtonComponent text="Save" onClick={handleSave} />
        </div> */}
      </div>
    </Modal>
  );
}
