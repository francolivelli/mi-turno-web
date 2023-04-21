"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/components/GeneralForm.module.css";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";

const EditOperatorForm = () => {
  const [operator, setOperator] = useState("");
  const [success, setSuccess] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [branch, setBranch] = useState("");
  const searchParams = useSearchParams();
  const operatorId = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const branchesResponse = await axios.get(
          "https://mi-turno-web-api.vercel.app/api/branches"
        );
        setBranches(branchesResponse.data);

        const operatorResponse = await axios.get(
          `https://mi-turno-web-api.vercel.app/api/users/operator/${operatorId}`
        );
        setOperator(operatorResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [operatorId]);

  useEffect(() => {
    if (operator) {
      setName(operator.name);
      setEmail(operator.email);
      setDni(operator.dni);
    }
  }, [operator]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const branchToSend = branch === "" ? null : branch;

    const response = await axios.put(
      `https://mi-turno-web-api.vercel.app/api/users/update/${operatorId}`,
      { name, email, dni, branch: branchToSend }
    );

    setLoading(false);

    if (response.status === 200) {
      setSuccess(true);
    }
  };

  return (
    <div className={styles["wide-container"]}>
      <div className={styles.header} style={{ gap: "20px" }}>
        <div className={`${styles.back} link`} onClick={() => router.back()}>
          <MdArrowBack />
          <p>Atrás</p>
        </div>
        <h1
          className={styles.title}
          style={{ textAlign: "left", fontSize: "20px" }}>
          Editar operador
        </h1>
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
              className="input"
              onChange={(e) =>
                setBranch(e.target.value === "" ? null : e.target.value)
              }
              value={branch}>
              <option value={null}>Seleccione una sucursal</option>
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

export default EditOperatorForm;
