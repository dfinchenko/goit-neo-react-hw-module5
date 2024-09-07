import { NavLink } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <>
      <h1>Not found Page</h1>
      <NavLink to="/" className={css.link}>
        Home
      </NavLink>
    </>
  );
};

export default NotFoundPage;
