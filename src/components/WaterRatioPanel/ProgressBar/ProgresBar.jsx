import css from "./ProgressBar.module.css"
import { Line } from 'rc-progress';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodayWater, selectTodayWaterAmount } from '../../../redux/water/selectors';
import { selectUserWaterAmount } from "../../../redux/user/selectors"
import { getTodayWater } from '../../../redux/water/operations';
import TodayListModal from "../../TodayListModal/TodayListModal"

const ProgressBar = () => {
  const dispatch = useDispatch();
  const water = useSelector(selectTodayWater)
  console.log(water)
    useEffect(() => {
    dispatch(getTodayWater());
  }, [dispatch]);


  const [isOpen, setIsOpen] = useState(false)

     const handleOpenModal = () => setIsOpen(true);
     const handleCloseModal = () => setIsOpen(false);
    
    return (

        <div className={css.progressConatiner}>
             <div className={css.progressContainer}>
      <div className={css.progressBarWrapper}>
       <Line
         percent={water.WaterProcent}
          strokeColor="#9EBBFF"
          trailColor="#D7E3FF"
          className={css.progressBarLine}
        />
       <div
          style={{ left: `calc(${water.WaterProcent}% - 0px)` }}
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
          {isOpen && <TodayListModal isOpen={isOpen} onClose={handleCloseModal}  setIsOpen={setIsOpen}/>}
    </div>
  </div>
    )
}

export default ProgressBar;