import css from './DailyNorma.module.css'
import { useSelector } from 'react-redux'
import { selectUserData, selectUserWaterAmount } from "../../redux/user/selectors"
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal"
import { useState } from 'react';


export default function DailyNorma() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const dailyNorma = useSelector(selectUserWaterAmount)

    return (
        <div className={css.container}>
          <div className={css.waterDailyContainer}>
            <p className={css.waterDailyText}>My daily norma</p>
            <div className={css.dailyNormaContainer}>
              <h2 className={css.waterDailyTitle}>{dailyNorma ? dailyNorma : 0}L</h2>
              <button type="button" className={css.editbutton} onClick={handleOpenModal}>Edit</button>
            </div>
            <DailyNormaModal
              closeModal={handleCloseModal}
              isOpen={modalIsOpen}/>
          </div>
        </div>
    )
}