import React, { useState } from 'react';
import css from './WaterListItem.module.css';
import TodayListEditModal from '../TodayListEditModal/TodayListEditModal';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';

export default function WaterListItem({ day }) {
  const date = new Date(day.createdAt);

  const formattedTime = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York',
  });

  // Manage state for modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className={css.container} key={day._id}>
      <div className={css.operationContainer}>
        <div className={css.amountInfoContainer}>
          <svg className={css.iconWaterGlass} width={36} height={36}>
            <use href="/src/assets/img/icons.svg#icon-glass"></use>
          </svg>
          <p className={css.amountInfo}>{day.waterVolume} ml</p>
          <p className={css.timeInfo}>{formattedTime}</p>
        </div>
        <div className={css.iconsContainer}>
          <button
            className={css.iconsButton}
            type="button"
            onClick={handleOpenEditModal}
          >
            <svg className={css.notebook} width={11} height={13}>
              <use href="/src/assets/img/icons.svg#icon-notebook"></use>
            </svg>
          </button>
          <button
            className={css.iconsButton}
            type="button"
            onClick={handleOpenDeleteModal}
          >
            <svg className={css.trashbox} width={11} height={13}>
              <use href="/src/assets/img/icons.svg#icon-trashbox"></use>
            </svg>
          </button>
        </div>
      </div>
      {isEditModalOpen && (
        <TodayListEditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          setIsOpen={setIsEditModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteWaterModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          entryId={day._id}
          setIsOpen={setIsEditModalOpen}
        />
      )}
    </div>
  );
}
