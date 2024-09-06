import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import css from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className={css.container}>
      <TodayWaterList/>
    </div>
  );
}
