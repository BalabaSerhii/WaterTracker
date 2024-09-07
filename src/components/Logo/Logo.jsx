import css from './Logo.module.css'

export default function Logo() {
    return (
        <div className={css.container}>
            <button className={css.logoButton}>
                <svg width={102} height={48}>
                    <use href='/src/assets/img/icons.svg#icon-logo'></use>
                </svg>
            </button>
        </div>
    )
}