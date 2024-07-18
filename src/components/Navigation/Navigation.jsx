import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const cssActiveLink = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

const Navigation = () => {
  return (
    <div className={css.container}>
      <NavLink to="/" className={cssActiveLink}>
        Home
      </NavLink>
      <NavLink to="/movie" className={cssActiveLink}>
        Movie
      </NavLink>
    </div>
  );
};

export default Navigation;
