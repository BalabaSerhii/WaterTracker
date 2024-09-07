import css from './UserLogo.module.css'
import { useNavigate } from 'react-router-dom';

export default function UserLogo() {
    const navigate = useNavigate();

    const handleNavigateToSignIn = () => {
    navigate("/signin");
    };
    
    return (
        <div className={css.container}>
            <button className={css.userButton} onClick={handleNavigateToSignIn}>Sign in
                <svg className={css.userIcon} width={28} height={28}>
                    <use className={css.userIconUse} href='/src/assets/img/icons.svg#icon-user'></use>
                </svg>
            </button>
        </div>
    )
}