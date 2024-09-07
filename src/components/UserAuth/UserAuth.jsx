import css from './UserAuth.module.css'

export default function UserAuth() {
    return (
        <div className={css.container}>
            <p className={css.name}>David</p>
            <img className={css.userAvatar} src="/src/assets/img/mobile/SignInBottle.png" alt="user-avatar" />
            <button className={css.iconButton}>
                <svg className={css.iconSvg} width={16} height={16}>
                    <use className={css.iconDown} href='/src/assets/img/icons.svg#icon-arrow-down'></use>
                </svg>
            </button>
        </div>
    )
}