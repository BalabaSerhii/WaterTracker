import WaterList from './WaterList'
import css from './TodayWaterList.module.css'


export default function TodayWaterList() {
   
    
    return (
        <div className={css.container}>
            <h2 className={css.title}>Today</h2>
            <WaterList className={css.addWaterBox}/>
            <button className={css.button} type="button">+ Add water</button>
        </div>
    )
}