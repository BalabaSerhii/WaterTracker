import css from './HomePage.module.css'

import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
export default function HomePage() {
  return (
    <div className={css.container}>
      <div className={css.WaterInfocontainer}>
      <DailyNorma />
      <WaterRatioPanel/>
    </div>
    </div>
    
  );
}
