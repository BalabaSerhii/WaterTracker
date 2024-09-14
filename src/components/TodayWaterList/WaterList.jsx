import React, { useEffect, useMemo } from 'react';
import WaterListItem from './WaterListItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodayWater } from '../../redux/water/selectors.js';
import { getTodayWater } from '../../redux/water/operations.js';
import css from './WaterList.module.css';
import { format } from "date-fns";
export default function WaterList() {
  const dayArr = useSelector(selectTodayWater) || [];
  const dispatch = useDispatch();

   const obj = useMemo(() => {
    const getTodayDate = () => {
      const today = new Date();
      return format(today, "yyyy-MM-dd"); 
    };
    console.log(dayArr);
    return {
      date: getTodayDate(),
    };
  }, []);
console.log(obj)
  useEffect(() => {
    dispatch(getTodayWater(obj));
  }, [dispatch, obj]);

  return (
    <ul className={css.list}>
      {dayArr.length > 0 ? (
        dayArr.map((d, index) => (
          <li key={d._id || index}> 
            <WaterListItem day={d} />
          </li>
        ))
      ) : (
        <li>No notes yet</li>
      )}
    </ul>
  );
}
