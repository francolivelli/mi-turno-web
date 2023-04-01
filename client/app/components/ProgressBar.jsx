import styles from "../../styles/components/ProgressBar.module.css";
import Step from "../commons/Step";

const ProgressBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <Step />
        <p className={styles.text}>Elegí tu sucursal</p>
      </div>
      <div className={styles.step}>
        <Step />
        <p className={styles.text}>Seleccioná el día</p>
      </div>
      <div className={styles.step}>
        <Step />
        <p className={styles.text}>Completá el formulario</p>
      </div>
    </div>
  );
};

export default ProgressBar;
