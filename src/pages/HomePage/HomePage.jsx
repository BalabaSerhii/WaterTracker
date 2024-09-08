import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import css from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className={css.container}>
      <MonthStatsTable/>
    </div>
  );
}
