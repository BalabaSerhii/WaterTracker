import css from './DailyNorma.module.css'

export default function DailyNorma() {
    return (
        <div className={css.container}>

    <div className={css.waterDailyContainer}>
      <p className={css.waterDailyText}>My daily norma</p>
      <div className={css.dailyNormaContainer}>
         <h2 className={css.waterDailyTitle}>? L</h2>
      <button type="button" className={css.editbutton}>Edit</button>
      </div>
    </div>
        </div>
    )
}