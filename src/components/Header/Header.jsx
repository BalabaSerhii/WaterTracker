import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import UserAuth from "../UserAuth/UserAuth";
export default function Header() {
  return (
    <header className={css.container}>
      <Logo />
      <UserAuth />
    </header>
  );
}
