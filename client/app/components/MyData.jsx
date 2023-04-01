import styles from "../../styles/components/MyData.module.css";

const MyData = () => {
  return (
    <div className={styles["my-data"]}>
      <h1 className={styles["my-data__title"]}>Mis datos</h1>
      <form className={styles["my-data__form"]}>
        <div className="input__field">
          <label className="input__label" for="name">
            Nombre
          </label>
          <input className="input" name="name" id="name" />
        </div>
        <div className="input__field">
          <label className="input__label" for="mail">
            Mail
          </label>
          <input className="input" name="mail" id="mail" />
        </div>
        <div style="input__rowContainer">
          <div className="input__field">
            <label className="input__label" for="dni">
              DNI
            </label>
            <input className="input" name="dni" id="dni" />
          </div>
          <div className="input__field">
            <label className="input__label" for="phone">
              Teléfono
            </label>
            <input className="input" name="phone" id="phone" />
          </div>
        </div>
        <div className="input__field">
          <label className="input__label" for="password">
            Contraseña
          </label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <input
              className="input"
              name="password"
              id="password"
              type="password"
            />
            <a href="" className="link">
              Editar contraseña
            </a>
          </div>
        </div>
        <button className="btn-primary" type="submit">
          Aceptar
        </button>
      </form>
    </div>
  );
};

export default MyData;
