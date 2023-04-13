"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/components/GeneralForm.module.css";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

const PromoteForm = () => {
  const [operator, setOperator] = useState("");
  const [success, setSuccess] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [branch, setBranch] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchBranches() {
      try {
        const response = await axios.get("http://localhost:5000/api/branches");
        const branchesData = response.data;
        setBranches(branchesData);
      } catch (error) {
        console.error(error);
        setBranches([]);
      }
    }

    fetchBranches();
  }, []);

  useEffect(() => {
    async function fetchOperator() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${email}`
        );
        const operatorData = response.data;
        setOperator(operatorData);
      } catch (error) {
        console.error(error);
        setOperator(null);
      }
    }

    if (email) {
      fetchOperator();
    }
  }, [email]);

  useEffect(() => {
    if (operator) {
      setName(operator.name);
      setDni(operator.dni);
    } else {
      setName("");
      setDni("");
    }
  }, [operator]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const branchToSend = branch === "" ? null : branch;

    const response = await axios.put(
      `http://localhost:5000/api/users/update/${operator.id}`,
      { name, email, dni, branch: branchToSend }
    );

    setLoading(false);

    if (response.status === 200) {
      setSuccess(true);
    }
  };

  return (
    <div className={styles.container} style={{ width: "64%" }}>
      <div className={styles.header} style={{ gap: "20px" }}>
        <div className={`${styles.back} link`} onClick={() => router.back()}>
          <MdArrowBack />
          <p>Atrás</p>
        </div>
        <div>
          <h1
            className={styles.title}
            style={{ textAlign: "left", fontSize: "20px" }}>
            Promover usuario
          </h1>
          <p style={{ textAlign: "left", fontSize: "14px" }}>
            Tipeá el correo electrónico del usuario para cargar su información.
          </p>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="input__field">
          <label className="input__label">Nombre</label>
          <input
            type="text"
            value={name}
            required
            className="input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input__field">
          <label className="input__label">Correo electrónico</label>
          <input
            type="email"
            value={email}
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
              value={dni}
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
    </div>
  );
};

export default PromoteForm;
