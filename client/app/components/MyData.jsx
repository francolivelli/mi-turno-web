"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/components/MyData.module.css";
import { logoutAsync, selectUser } from "../features/userSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MyData = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutAsync())
  }

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className={styles["my-data"]}>
      <h1 className={styles["my-data__title"]}>Mis datos</h1>
      <form className={styles["my-data__form"]}>
        <div className="input__field">
          <label className="input__label" htmlFor="name">
            Nombre
          </label>
          <input className="input" name="name" id="name" />
        </div>
        <div className="input__field">
          <label className="input__label" htmlFor="mail">
            Mail
          </label>
          <input className="input" name="mail" id="mail" />
        </div>
        <div className="input__rowContainer">
          <div className="input__field">
            <label className="input__label" htmlFor="dni">
              DNI
            </label>
            <input className="input" name="dni" id="dni" />
          </div>
          <div className="input__field">
            <label className="input__label" htmlFor="phone">
              Teléfono
            </label>
            <input className="input" name="phone" id="phone" />
          </div>
        </div>
        <a href="" className="link">
          Editar contraseña
        </a>
        <button className="btn-primary" type="submit">
          Aceptar
        </button>
      </form>
      <hr className={styles.divider} />
      <button
        className="btn-secondary w100"
        onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default MyData;
