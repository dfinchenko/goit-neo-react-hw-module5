import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : css.link
        }
        end
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : css.link
        }
      >
        Movies
      </NavLink>
    </>
  );
};

export default Navigation;
