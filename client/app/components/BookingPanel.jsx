import ProgressBar from "./ProgressBar";
import styles from "../../styles/components/BookingPanel.module.css";

const BookingPanel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Reserva</h3>
        <p className={styles.text}>Completa el formulario</p>
      </div>
      <ProgressBar />
      <form className={styles.form}>
        <div>
          <label className={styles.text}>Sucursal</label>
          <input className="input"></input>
        </div>
        <div>
          <label className={styles.text}>Horario</label>
          <input className="input"></input>
        </div>
        <div style={{ flexDirection: "row", gap: "1rem" }}>
          <div>
            <label className={styles.text}>Nombre y Apellido</label>
            <input className="input"></input>
          </div>
          <div>
            <label className={styles.text}>Teléfono</label>
            <input className="input"></input>
          </div>
        </div>
        <div>
          <label className={styles.text}>Mail</label>
          <input className="input"></input>
        </div>
        <button className="btn-primary" style={{ width: "fit-content", marginTop:"1.25rem" }}>
          Confirmar reserva
        </button>
      </form>
    </div>
  );
};

export default BookingPanel;
