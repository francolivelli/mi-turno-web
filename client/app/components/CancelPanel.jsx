import styles from "../../styles/components/CancelPanel.module.css";
import ConfirmCancelation from "./ConfirmCancelation";

const CancelPanel = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cancelar reserva</h1>
      <div className={styles.header}>
        <p className={styles.greeting}>Hola Ivan,</p>
        <p className={styles.question}>¿Por qué desea cancelar su reserva?</p>
      </div>
      <hr className={styles.divider} />
      <form className={styles.form}>
        <div className="checkbox-container">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Ya no quiero ir</label>
        </div>
        <hr className={styles.divider} />
        <div className="checkbox-container">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Me equivoqué de horario</label>
        </div>
        <ConfirmCancelation />
        <hr className={styles.divider} />
        <div className="checkbox-container">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Encontré un lugar mejor</label>
        </div>
        <hr className={styles.divider} />
        <div className="checkbox-container">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Me cancelaron</label>
        </div>
        <hr className={styles.divider} />
        <div className="checkbox-container">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Otro</label>
        </div>
      </form>
    </div>
  );
};

export default CancelPanel;
