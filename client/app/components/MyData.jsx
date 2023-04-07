"use client";
import { useDispatch } from "react-redux";
import styles from "../../styles/components/GeneralForm.module.css";
import { logoutAsync } from "../features/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

const MyData = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    axios.post("http://localhost:5000/api/users/signout")
    dispatch(logoutAsync());
    router.push("/")
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mis datos</h1>
      <form className={styles.form}>
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
      <button className="btn-secondary w100" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default MyData;
