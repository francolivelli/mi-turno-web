"use client";
import Link from "next/link";
import styles from "../../styles/components/GeneralForm.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectUser } from "../features/userSlice";
import { useRouter } from "next/navigation";
import { AiFillCloseCircle, AiFillEye, AiOutlineEye } from "react-icons/ai";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginAsync({ email, password }));
    setTimeout(() => {
      if (!user) {
        setShowError(true);
      }
      setLoading(false);
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (user?.role === "client") {
      router.push("/bookings/create");
    } else if (user?.role === "admin") {
      router.push("/branches");
    }
    setLoading(false);
  }, [user]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className="input__field">
          <label className="input__label">Mail</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input__field">
          <label className="input__label">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            value={password}
            style={{ paddingRight: "40px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            style={{
              top: "55%",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={togglePasswordVisibility}>
            {showPassword ? (
              <AiFillEye className="input__eye" />
            ) : (
              <AiOutlineEye className="input__eye" />
            )}
          </div>
        </div>
        {showError && (
          <section className={styles.messageContainer}>
            <AiFillCloseCircle className={styles.crossIcon} />
            <div>
              <p>Usuario inexistente o contraseña incorrecta.</p>
            </div>
          </section>
        )}
        <div className={styles.questionContainer}>
          <Link href="/forgot-password">
            <h4 className="link">¿Olvidaste tu contraseña?</h4>
          </Link>
        </div>
        <button className={"btn-primary w100"}>
          {loading ? <span className="spinner" /> : "Ingresar"}
        </button>
      </form>
      <hr className={styles.divider} />
      <Link href="/signup">
        <button className={"btn-secondary w100"}>
          ¿No tenés cuenta? Registrate
        </button>
      </Link>
    </div>
  );
};

export default LoginForm;
