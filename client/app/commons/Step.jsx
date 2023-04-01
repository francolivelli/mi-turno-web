import styles from "../../styles/commons/Step.module.css";

const Step = () => {
  return (
    <div className={styles.container}>
        <div className={styles.arm}></div>
        <div className={styles.main}>1</div>
        <div className={styles.arm}></div>
    </div>
  );
};

export default Step;
