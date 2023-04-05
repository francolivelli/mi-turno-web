"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import styles from "../../styles/components/GeneralForm.module.css";
import InvalidToken from "./InvalidToken";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillEye,
  AiOutlineCheckCircle,
  AiOutlineEye,
} from "react-icons/ai";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

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
    const token = searchParams.get("token");
    if (token) {
      axios
        .get(`http://localhost:5000/api/users/verifyToken/${token}`)
        .then((response) => {
          setIsValidToken(true);
        })
        .catch((error) => {
          setIsValidToken(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [router.query?.token]);

  useEffect(() => {
    setTimeout(() => {
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
    }, 100);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    const token = searchParams.get("token");
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/users/reset-password",
      {
        token: token,
        password: password,
      }
    );
    if (response.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div style={{ position: "relative" }}>
        <span
          className="spinner"
          style={{ position: "absolute", top: "3rem" }}
        />
      </div>
    );
  }

  if (!isValidToken) {
    return <InvalidToken />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recuperar contraseña</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="input__field">
          <label className="input__label" htmlFor="password">
            Nueva contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <label className="input__label" htmlFor="confirm-password">
            Confirmar contraseña
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <button
          className={"btn-primary w100"}
          style={success ? { backgroundColor: "#00a541" } : {}}
          type="submit">
          {success ? (
            <AiOutlineCheckCircle
              style={{ color: "#fff", fontSize: "1.5rem" }}
            />
          ) : (
            "Cambiar contraseña"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
