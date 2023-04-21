"use client";
import { useDispatch } from "react-redux";
import styles from "../../styles/components/GeneralForm.module.css";
import { logoutAsync } from "../features/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";

const MyData = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    axios.post("https://mi-turno-web-api.vercel.app/api/users/signout");
    localStorage.removeItem("user")
    dispatch(logoutAsync());
    router.push("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, email, dni, phone } = userData;

      const response = await axios.put(
        `https://mi-turno-web-api.vercel.app/api/users/update/${userData.id}`,
        { name: name, email: email, dni: dni, phone: phone }
      );

      // Actualizamos los datos en localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.back} link`} onClick={() => router.back()}>
          <MdArrowBack />
          <p>Atrás</p>
        </div>
        <h1 className={styles.title}>Mis datos</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="input__field">
          <label className="input__label" htmlFor="name">
            Nombre
          </label>
          <input
            className="input"
            name="name"
            id="name"
            value={userData.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="input__field">
          <label className="input__label" htmlFor="mail">
            Mail
          </label>
          <input
            className="input"
            name="email"
            id="mail"
            value={userData.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="input__rowContainer">
          <div className="input__field">
            <label className="input__label" htmlFor="dni">
              DNI
            </label>
            <input
              className="input"
              name="dni"
              id="dni"
              value={userData.dni || ""}
              onChange={handleChange}
            />
          </div>
          <div className="input__field">
            <label className="input__label" htmlFor="phone">
              Teléfono
            </label>
            <input
              className="input"
              name="phone"
              id="phone"
              value={userData.phone || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input__field">
          <Link href="/account/change-password">
            <p className="link">Editar contraseña</p>
          </Link>
        </div>
        <button
          className="btn-primary"
          style={success ? { backgroundColor: "#00a541" } : {}}
          type="submit">
          {success ? (
            <AiOutlineCheckCircle
              style={{ color: "#fff", fontSize: "1.5rem" }}
            />
          ) : (
            "Guardar cambios"
          )}
        </button>
      </form>
      <hr className={styles.divider} />
      <button className="btn-secondary w100" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default MyData;
