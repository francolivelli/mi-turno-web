"use client";
import Link from "next/link";
import styles from "../../styles/components/LoginForm.module.css";
import Button from "../commons/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectUser } from "../features/userSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAsync({ email, password }));
  };

  useEffect(() => {
    if (user?.role === "client") {
      router.push("/booking/create");
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Mail</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Contraseña</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.questionContainer}>
          <h4 className="link">¿Olvidaste tu contraseña?</h4>
        </div>
        <Button className={"btn-primary w100"} title="Ingresar" type="submit" />
      </form>
      <hr className={styles.divider} />
      <Link href="/signup">
        <Button
          className={"btn-secondary w100"}
          title="¿No tenés cuenta? Registrate"
        />
      </Link>
    </div>
  );
};

export default LoginForm;
