import styles from "../../styles/components/LoginForm.module.css";
import Button from "../commons/Button";

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Usuario</label>
          <input type="text" className="input" />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Contraseña</label>
          <input type="password" className="input" />
        </div>
        <div className={styles.questionContainer}>
          <h4 className="link">¿Olvidaste tu contraseña?</h4>
        </div>
        <Button className={"btn-primary w100"} title="Ingresar" type="submit" />
      </form>
      <hr className={styles.divider} />
      <Button className={"btn-secondary w100"} title="¿No tenés cuenta? Registrate"/>
    </div>
  );
};

export default LoginForm;
