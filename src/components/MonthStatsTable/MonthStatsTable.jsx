import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWaterByMonth } from '../../redux/water/operations';
import { chosenDate as date, selectMonthly } from '../../redux/water/selectors';
import css from './MonthStatsTable.module.css';
import Pagitation from './Pagitation/Pagitation';
import MonthStatsItem from './MonthStatsItem/MonthStatsItem';

const getMonthRange = (dateString) => {
  const date = new Date(dateString);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return {
    firstDate: formatDate(firstDay),
    lastDate: formatDate(lastDay)
  };
};

export default function MonthStatsTable() {
  const chosenDate = useSelector(date);
  const month = useSelector(selectMonthly);
  const dispatch = useDispatch();

  const monthRange = useMemo(() => getMonthRange(chosenDate), [chosenDate]);

  useEffect(() => {
    dispatch(getWaterByMonth(monthRange));
  }, [dispatch, monthRange]);

  const dataArr = month?.data || [];
  console.log(dataArr);

  return (
    <div className={css.container}>
      <Pagitation />
      <ul className={css.calendar}>
        {dataArr.map((day) => (
          <li key={day.date}>
            <MonthStatsItem day={day} />
          </li>
        ))}
      </ul>
    </div>
  );
}
