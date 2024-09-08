import css from './HomePage.module.css'

import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList'
export default function HomePage() {
  return (
    <div className={css.container}>
          <div>
            <DailyNorma />
            <div className={css.bottleBG}></div>
            <WaterRatioPanel />
          </div>
          <div className={css.calendarBox}>
            <TodayWaterList/>
          </div>
    </div>
  );
}
