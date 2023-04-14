import styles from "../../styles/components/ProgressBar.module.css";
import Step from "../commons/Step";

const ProgressBar = ({ step }) => {
  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <Step number={1} active={step === 1} text="Elegí tu sucursal" />
      </div>
      <div className={styles.step}>
        <Step number={2} active={step === 2} text="Seleccioná el día" />
      </div>
      <div className={styles.step}>
        <Step number={3} active={step === 3} text="Completá el formulario" />
      </div>
    </div>
  );
};

export default ProgressBar;
