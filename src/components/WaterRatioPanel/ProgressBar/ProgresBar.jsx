import css from "./ProgressBar.module.css"
import { Line } from 'rc-progress';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodayWaterAmount } from '../../../redux/water/selectors';
import { selectUserWaterAmount } from "../../../redux/user/selectors"
import { getTodayWater } from '../../../redux/water/operations';
import TodayListModal from "../../TodayListModal/TodayListModal"

const ProgressBar = () => {
    const dailyAmount = useSelector(selectTodayWaterAmount);
  const dailyNorma = useSelector( selectUserWaterAmount );
  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getTodayWater());
  }, [dispatch]);


    let value = Math.round(dailyAmount / (dailyNorma * 10));
  let percent = value > 100 ? 100 : value;
  useEffect(() => {
    if (dailyNorma > 0) {
      value = Math.round(dailyAmount / (dailyNorma * 10));
      percent = value > 100 ? 100 : value;
    }
  }, [dailyAmount, dailyNorma]);


  

   const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
    return (

        <div className={css.progressConatiner}>
             <div className={css.progressContainer}>
      <div className={css.progressBarWrapper}>
       <Line
         percent={percent}
          strokeColor="#9EBBFF"
          trailColor="#D7E3FF"
          className={css.progressBarLine}
        />
       <div
          style={{ left: `calc(${percent}% - 0px)` }}
          className={css.progressCircle}
        />
      </div>
      <div className={css.progressLabels}>
       <span>
         
         0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
            <div className={css.addWaterBtnContainer}>
                <button className={css.addWaterBtn} type="button" onClick={handleOpenModal}>
                    <svg className={css.buttonIcon} width="18" height="18px">
                        <use className={css.strokePlus} href="/src/assets/img/icons.svg#icon-circle-plus"></use>
                    </svg>
        Add water
          </button>
    </div>
  </div>
    )
}

export default ProgressBar;