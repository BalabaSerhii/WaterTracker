import React from 'react';
import css from './WaterListItem.module.css';
import { deleteWater } from '../../redux/water/operations';
import { useDispatch } from 'react-redux';
import TodayListEditModal from '../TodayListEditModal/TodayListEditModal';
import { useState } from 'react';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';

export default function WaterListItem({ day }, { openEditModal }) {
  const date = new Date(day.createdAt);
  const dispatch = useDispatch();

  const formattedTime = date.toLocaleString("en-US", {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York'
  });

  const handleDelete = () => {
    dispatch(deleteWater(day._id));
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true)
  }

  const [isDeleteModalOpen, setIsDeleteMpdalOpen] = useState(false)

  const handleOpenDeleteModal = () => {
    setIsDeleteMpdalOpen(true)
  }
    
  return (
    <div className={css.container}>
      <div className={css.operationContainer}>
        <div className={css.amountInfoContainer}>
          <svg className={css.iconWaterGlass} width={36} height={36}>
            <use href="/src/assets/img/icons.svg#icon-glass"></use>
          </svg>
          <p className={css.amountInfo}>{day.waterVolume} ml</p>
          <p className={css.timeInfo}>{formattedTime}</p>
        </div>
        <div className={css.iconsContainer}>
          <button className={css.iconsButton} type="button" onClick={handleOpenEditModal}>
            <svg className={css.notebook} width={11} height={13}>
              <use href="/src/assets/img/icons.svg#icon-notebook"></use>
            </svg>
          </button>
          <button className={css.iconsButton} type="button" onClick={handleOpenDeleteModal}>
            <svg className={css.trashbox} width={11} height={13}>
              <use href="/src/assets/img/icons.svg#icon-trashbox"></use>
            </svg>
          </button>
        </div>
      </div>
      {isEditModalOpen && <TodayListEditModal />}
      {isDeleteModalOpen && <DeleteWaterModal/>}
    </div>
  );
}
