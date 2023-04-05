"use client";
import styles from "../../styles/components/GeneralForm.module.css";
import { MdArrowBack } from "react-icons/md";
import {
  AiOutlineEye,
  AiFillEye,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const router = useRouter();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

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

    if (confirmPassword === "") {
      setPasswordsMatch(null);
    } else if (password === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (user?.role === "client") {
      router.push("/booking/create");
    }
  }, [user]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const formData = new FormData(form);

    // Valida que las contraseñas coincidan
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Envía la información del usuario al servidor
    axios
      .post("http://localhost:5000/api/users/signup", {
        name: formData.get("name"),
        dni: formData.get("dni"),
        email: formData.get("email"),
        password: password,
      })
      .then((response) => {
        // Redirecciona al usuario a la página de inicio de sesión
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Ha ocurrido un error al registrar al usuario");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={`${styles.back} link`} onClick={() => router.back()}>
          <MdArrowBack />
          Atrás
        </p>
        <h1 className={styles.title}>Crear cuenta</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="input__rowContainer">
          <div className="input__field">
            <label htmlFor="name" className="input__label">
              Nombre y Apellido
            </label>
            <input type="text" name="name" id="name" className="input" />
          </div>
          <div className="input__field">
            <label htmlFor="dni" className="input__label">
              DNI
            </label>
            <input type="text" name="dni" id="dni" className="input" />
          </div>
        </div>
        <div className="input__field">
          <label htmlFor="email" className="input__label">
            Mail
          </label>
          <input type="email" name="email" id="email" className="input" />
        </div>
        <div className="input__rowContainer">
          <div className="input__field">
            <label htmlFor="password" className="input__label">
              Contraseña
            </label>
            <input
              name="password"
              id="password"
              className="input"
              type={showPassword ? "text" : "password"}
              style={{ paddingRight: "40px" }}
              onChange={handlePasswordChange}
            />
            <div onClick={togglePasswordVisibility}>
              {showPassword ? (
                <AiFillEye className="input__eye" />
              ) : (
                <AiOutlineEye className="input__eye" />
              )}
            </div>
          </div>
          <div className="input__field">
            <label htmlFor="password" className="input__label">
              Repetir Contraseña
            </label>
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
                className="input__checkCross"
                style={{
                  fontSize: "1rem",
                  right: "35px",
                  color: passwordsMatch ? "#00a541" : "#e53939",
                }}>
                {passwordsMatch ? <AiFillCheckCircle /> : <AiFillCloseCircle />}
              </div>
            )}
            <div onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? (
                <AiFillEye className="input__eye" />
              ) : (
                <AiOutlineEye className="input__eye" />
              )}
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
        <button className={"btn-primary w100"}>
          {loading ? <span className="spinner" /> : "Registrarme"}
        </button>
      </form>
      <hr className={styles.divider} />
      <Link href="/">
        <button className={"btn-secondary w100"}>
          ¿Ya tenés cuenta? Iniciá sesión
        </button>
      </Link>
    </div>
  );
}

export default SignUpForm;
