import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const navigationMenu = () => {
  return (
    <div className={css.container}>
      <NavLink className={css.navLink}>Home</NavLink>
      <NavLink className={css.navLink}>Movie</NavLink>
    </div>
  );
};

export default navigationMenu;
