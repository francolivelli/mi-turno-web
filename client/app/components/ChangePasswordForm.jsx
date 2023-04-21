"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/components/GeneralForm.module.css";
import axios from "axios";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillEye,
  AiOutlineCheckCircle,
  AiOutlineEye,
} from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import PasswordWarnings from "../commons/PasswordWarnings";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const response = await axios.post(
      "https://mi-turno-web-api.vercel.app/api/users/change-password/",
      { currentPassword, newPassword, id: user.id }
    );

    setLoading(false);
    if (response.status === 200) {
      setSuccess(true);
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword((prev) => !prev);
  };

  useEffect(() => {
    if (confirmNewPassword === "") {
      setPasswordsMatch(null);
    } else if (newPassword === confirmNewPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [newPassword, confirmNewPassword]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.back} link`} onClick={() => router.back()}>
          <MdArrowBack />
          <p>Atrás</p>
        </div>
        <h1 className={styles.title}>Cambiar contraseña</h1>
      </div>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className="input__field">
          <label className="input__label">Contraseña actual</label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            className="input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <div onClick={toggleCurrentPasswordVisibility}>
            {showCurrentPassword ? (
              <AiFillEye className="input__eye" />
            ) : (
              <AiOutlineEye className="input__eye" />
            )}
          </div>
        </div>
        <div className="input__field">
          <label className="input__label">Nueva contraseña</label>
          <input
            type={showNewPassword ? "text" : "password"}
            className="input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div onClick={toggleNewPasswordVisibility}>
            {showNewPassword ? (
              <AiFillEye className="input__eye" />
            ) : (
              <AiOutlineEye className="input__eye" />
            )}
          </div>
        </div>
        <div className="input__field">
          <label className="input__label">Confirmar nueva contraseña</label>
          <input
            type={showConfirmNewPassword ? "text" : "password"}
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
          <div onClick={toggleConfirmNewPasswordVisibility}>
            {showConfirmNewPassword ? (
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
            "Guardar cambios"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
