import Logo from '../Logo/Logo'
import UserAuth from '../UserAuth/UserAuth'
// import UserLogo from '../UserLogo/UserLogo'
import css from './Header.module.css'

export default function Header() {
    return (
        <header className={css.container}>
            <Logo/>
            {/* <UserLogo/> */}
            <UserAuth/>
        </header>
    )
}