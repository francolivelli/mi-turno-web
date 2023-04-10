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
import PasswordWarnings from "../commons/PasswordWarnings";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

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
    if (confirmNewPassword === "") {
      setPasswordsMatch(null);
    } else if (newPassword === confirmNewPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [newPassword, confirmNewPassword]);

  const handleSubmit = async (e) => {
    const token = searchParams.get("token");
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(
      "http://localhost:5000/api/users/reset-password",
      {
        token: token,
        newPassword: newPassword,
      }
    );
    setLoading(false);
    if (response.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {confirmNewPassword !== "" && (
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
        <PasswordWarnings password={newPassword} />
        <button
          className={"btn-primary w100"}
          style={success ? { backgroundColor: "#00a541" } : {}}
          type="submit">
          {success ? (
            <AiOutlineCheckCircle
              style={{ color: "#fff", fontSize: "1.5rem" }}
            />
          ) : loading ? (
            <span className="spinner" />
          ) : (
            "Cambiar contraseña"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
