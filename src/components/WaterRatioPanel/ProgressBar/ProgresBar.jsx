import css from "./ProgressBar.module.css"
import { Line } from 'rc-progress';

const ProgressBar = () => {
    let percent = 89
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
                <button className={css.addWaterBtn} type="button">
                    <svg className={css.buttonIcon} width="18px" height="18px">
                        <use href="../../../assets/img/icons.svg#icon-plus"></use>
                    </svg>
        Add water
      </button>
    </div>
        </div>
    )
}

export default ProgressBar;