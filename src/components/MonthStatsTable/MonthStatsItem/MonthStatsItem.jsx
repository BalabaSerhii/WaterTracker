import React from 'react';
import css from './MonthStatsItem.module.css';

const MonthStatsItem = ({ day, handleOpenModal }) => {
  const dayNum = day.date.split(',')[0].trim();

  return (
    <div className={css.box}>
      <div className={css.calendarDay} onClick={handleOpenModal}>
        <div className={css.dayNumber}>
          {dayNum}
        </div>
        <div className={css.dailyTotal}>
          {parseInt(day.waterPercent)}%
        </div>
      </div>
    </div>
  );
};

export default MonthStatsItem;
