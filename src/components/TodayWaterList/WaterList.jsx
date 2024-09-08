import React, { useEffect, useMemo } from 'react';
import WaterListItem from "./WaterListItem";
import { useDispatch, useSelector } from 'react-redux';
import { selectTodayWater } from '../../redux/water/selectors';
import { getTodayWater } from "../../redux/water/operations";

export default function WaterList() {
  const day = useSelector(selectTodayWater) || {};
  const dispatch = useDispatch();

  // Використовуємо useMemo для запам'ятовування обчисленого значення dayArr
  const dayArr = useMemo(() => day.data || [], [day]);

  // Використовуємо useMemo для запам'ятовування об'єкта з сьогоднішньою датою
  const obj = useMemo(() => {
    const getTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    return {
      date: getTodayDate(),
    };
  }, []); 

  useEffect(() => {
    dispatch(getTodayWater(obj));
  }, [dispatch, obj]);
    

  return (
    <ul>
      {dayArr.length > 0 ? (
        dayArr.map((d) => (
          <li key={d._id}>
            <WaterListItem day={d} />
          </li>
        ))
      ) : (
        <li>No data available</li>
      )}
    </ul>
  );
}
