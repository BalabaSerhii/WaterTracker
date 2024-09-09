import React from 'react';
import css from './MonthStatsItem.module.css'
const MonthStatsItem = ({ day }) => {

  const dayNum = day.date.split(',')[0].trim(); 

  return (
      <div className={css.calendarDay}>
          <div className={css.dayNumber}>{dayNum}</div>
          <div className={css.dailyTotal}>{day.dailyTotal}%</div>
    </div>
  );
}

export default MonthStatsItem;
