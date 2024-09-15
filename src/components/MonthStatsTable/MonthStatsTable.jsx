import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWaterByMonth } from '../../redux/water/operations';
import { chosenDate as date, selectMonthly } from '../../redux/water/selectors';
import css from './MonthStatsTable.module.css';
import Pagitation from './Pagitation/Pagitation';
import MonthStatsItem from './MonthStatsItem/MonthStatsItem';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';

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

  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const monthRange = useMemo(() => getMonthRange(chosenDate), [chosenDate]);

  useEffect(() => {
    dispatch(getWaterByMonth(monthRange));
  }, [dispatch, monthRange]);

  const handleOpenModal = (event, day) => {
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const dataArr = month?.data || [];

  return (
    <div className={css.container}>
      <Pagitation />

      <ul className={css.calendar}>
        {dataArr.map((day) => (
          <li key={day.date}>
            <MonthStatsItem 
              day={day} 
              handleOpenModal={(event) => handleOpenModal(event, day)} 
            />
          </li>
        ))}
      </ul>

      {isModalOpen && selectedDay && (
        <div 
          className={css.modal} 
          style={{ top: modalPosition.top, left: modalPosition.left }}
        >
          <DaysGeneralStats day={selectedDay} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}
