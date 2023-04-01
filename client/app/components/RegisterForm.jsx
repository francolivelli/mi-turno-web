"use client";
import styles from "../../styles/components/RegisterForm.module.css";
import Button from "../commons/Button";
import { MdArrowBack } from "react-icons/md";
import {
  AiOutlineEye,
  AiFillEye,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { useEffect, useState } from "react";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null);

  const rules = [
    {
      id: "uppercase-warning",
      regex: /[A-Z]/,
      messages: ["ABC", "Una letra mayúscula"],
    },
    {
      id: "lowercase-warning",
      regex: /[a-z]/,
      messages: ["abc", "Una letra minúscula"],
    },
    {
      id: "number-warning",
      regex: /[0-9]/,
      messages: ["123", "Un número"],
    },
    {
      id: "length-warning",
      validate: (value) => value.length >= 8,
      messages: ["***", "Mínimo 8 caracteres"],
    },
  ];

  useEffect(() => {
    for (const { id, regex, validate, messages } of rules) {
      const element = document.getElementById(id);
      if (password === "") {
        element.style.color = "#6e6e6e";
      } else if (
        (regex && regex.test(password)) ||
        (validate && validate(password))
      ) {
        element.style.color = "#00a541";
      } else {
        element.style.color = "#e53939";
      }
      element.innerHTML = `<p>${messages[0]}</p><p>${messages[1]}</p>`;
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword === "") {
      setPasswordsMatch(null);
    } else if (password === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={`${styles.back} link`}>
          <MdArrowBack />
          Atrás
        </p>
        <h1 className={styles.title}>Crear cuenta</h1>
      </div>
      <form className={styles.form}>
        <div className="input__rowContainer">
          <div className="input__field">
            <label for="name" className="input__label">
              Nombre y Apellido
            </label>
            <input type="text" name="name" id="name" className="input" />
          </div>
          <div className="input__field">
            <label for="dni" className="input__label">
              DNI
            </label>
            <input type="text" name="name" id="name" className="input" />
          </div>
        </div>
        <div className="input__field">
          <label for="mail" className="input__label">
            Mail
          </label>
          <input type="email" name="mail" id="mail" className="input" />
        </div>
        <div className="input__rowContainer">
          <div className="input__field">
            <label for="password" className="input__label">
              Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                name="password"
                id="password"
                className="input"
                type={showPassword ? "text" : "password"}
                style={{ paddingRight: "40px" }}
                onChange={handlePasswordChange}
              />
              <div
                style={{
                  position: "absolute",
                  top: "55%",
                  transform: "translateY(-50%)",
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
          </div>
          <div className="input__field">
            <label name="confirmPassword" className="input__label">
              Repetir Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                name="confirmPassword"
                id="confirmPassword"
                className="input"
                type={showConfirmPassword ? "text" : "password"}
                style={{ paddingRight: "50px" }}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPassword !== "" && (
                <div
                  style={{
                    position: "absolute",
                    top: "55%",
                    transform: "translateY(-50%)",
                    right: "30px",
                    color: passwordsMatch ? "#00a541" : "#e53939",
                  }}>
                  {passwordsMatch ? (
                    <AiFillCheckCircle />
                  ) : (
                    <AiFillCloseCircle />
                  )}
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  top: "55%",
                  transform: "translateY(-50%)",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? (
                  <AiFillEye className="input__eye" />
                ) : (
                  <AiOutlineEye className="input__eye" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.warnings}>
          <div className={styles.warnings__header}>
            <p className={styles.warnings__sentence}>
              La contraseña debe contener:
            </p>
            <hr className={styles.divider} />
          </div>
          <div className={styles.warnings__container}>
            <div className={styles.warnings__row}>
              <div className={styles.warnings__column}>
                <div
                  className={styles.warnings__warning}
                  id="uppercase-warning"></div>
              </div>
              <div className={styles.warnings__column}>
                <div
                  className={styles.warnings__warning}
                  id="lowercase-warning"></div>
              </div>
            </div>
            <div className={styles.warnings__row}>
              <div className={styles.warnings__column}>
                <div
                  className={styles.warnings__warning}
                  id="number-warning"></div>
              </div>
              <div className={styles.warnings__column}>
                <div
                  className={styles.warnings__warning}
                  id="length-warning"></div>
              </div>
            </div>
          </div>
        </div>
        <Button
          className={"btn-primary w100"}
          title="Registrarme"
          type="submit"
        />
      </form>
      <hr className={styles.divider} />
      <Button
        className={"btn-secondary w100"}
        title="¿Ya tenés cuenta? Iniciá sesión"
      />
    </div>
  );
}

export default RegisterForm;
