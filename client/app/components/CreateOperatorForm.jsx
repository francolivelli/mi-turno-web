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
import PasswordWarnings from "../commons/PasswordWarnings";
import Link from "next/link";

const CreateOperatorForm = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [branch, setBranch] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post(
      "http://localhost:5000/api/users/create",
      {
        name,
        email,
        dni,
        branch,
        password,
        confirmPassword,
      }
    );

    setLoading(false);

    if (response.status === 201) {
      setSuccess(true);
    }
  };

  useEffect(() => {
    if (confirmPassword === "") {
      setPasswordsMatch(null);
    } else if (password === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    async function fetchBranches() {
      try {
        const response = await axios.get("http://localhost:5000/api/branches");
        setBranches(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBranches();
  }, []);

  return (
    <div className={styles.container} style={{ width: "64%" }}>
      <h1
        className={styles.title}
        style={{ textAlign: "left", fontSize: "20px" }}>
        Crear un nuevo operador
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="input__field">
          <label className="input__label">Nombre</label>
          <input
            type="text"
            required
            className="input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input__field">
          <label className="input__label">Correo electrónico</label>
          <input
            type="email"
            required
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input__rowContainer">
          <div className="input__field">
            <label className="input__label">DNI</label>
            <input
              type="text"
              required
              className="input"
              onChange={(e) => setDni(e.target.value)}
            />
          </div>
          <div className="input__field">
            <label className="input__label">Sucursal</label>
            <select
              type="text"
              required
              className="input"
              onChange={(e) => setBranch(e.target.value)}
              value={branch}>
              <option value="">Seleccione una sucursal</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input__rowContainer">
          <div className="input__field">
            <label className="input__label">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="input"
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
            <label className="input__label">Confirmar contraseña</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              className="input"
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
        </div>
        <div style={{ width: "70%", alignSelf: "center" }}>
          <PasswordWarnings password={password} />
        </div>
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
            "Enviar"
          )}
        </button>
      </form>
      <hr className={styles.divider} />
      <Link href="/operators/promote">
        <button className={"btn-secondary w100"}>Promover usuario</button>
      </Link>
    </div>
  );
};

export default CreateOperatorForm;
