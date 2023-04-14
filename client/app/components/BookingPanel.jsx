"use client";
import ProgressBar from "./ProgressBar";
import styles from "../../styles/components/BookingPanel.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentStep, setCurrentStep } from "../features/stepSlice";

const BookingPanel = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [formInputs, setFormInputs] = useState({
    time: "",
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchBranches = async () => {
      const res = await fetch("http://localhost:5000/api/branches");
      const data = await res.json();
      setBranches(data);
    };
    fetchBranches();
  }, []);

  const handleSelectBranch = (event) => {
    const selectedValue = event.target.value;
    setSelectedBranch(selectedValue);
    if (selectedValue === "") {
      dispatch(setCurrentStep(1));
    } else {
      dispatch(setCurrentStep(2));
    }
  };
  
  useEffect(() => {
    if (currentStep === 1) {
      setSelectedBranch("");
    }
  }, [currentStep]);

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const inputsAreComplete = () => {
    return Object.values(formInputs).every((value) => value !== "");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Reserva</h3>
        {currentStep === 1 && (
          <p className={styles.text}>Seleccioná tu sucursal</p>
        )}
        {currentStep === 2 && (
          <p className={styles.text}>Seleccioná el día en el calendario</p>
        )}
        {currentStep === 3 && (
          <p className={styles.text}>Completá el formulario</p>
        )}
      </div>
      <ProgressBar step={currentStep} />
      <form className={styles.form}>
        <div>
          <label className={styles.text}>Sucursal</label>
          <select
            className="input"
            value={selectedBranch}
            onChange={handleSelectBranch}>
            <option value="" />
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        {currentStep === 3 && (
          <>
            <div>
              <label className={styles.text}>Horario</label>
              <input
                className="input"
                name="time"
                value={formInputs.time}
                onChange={handleInput}></input>
            </div>
            <div style={{ flexDirection: "row", gap: "1rem" }}>
              <div>
                <label className={styles.text}>Nombre y Apellido</label>
                <input
                  className="input"
                  name="name"
                  value={formInputs.name}
                  onChange={handleInput}></input>
              </div>
              <div>
                <label className={styles.text}>Teléfono</label>
                <input
                  className="input"
                  name="phone"
                  value={formInputs.phone}
                  onChange={handleInput}></input>
              </div>
            </div>
            <div>
              <label className={styles.text}>Mail</label>
              <input
                className="input"
                name="email"
                value={formInputs.email}
                onChange={handleInput}></input>
            </div>
          </>
        )}
        <button
          className="btn-primary"
          style={{ width: "fit-content", marginTop: "1.25rem" }} disabled={!inputsAreComplete()}>
          Confirmar reserva
        </button>
      </form>
    </div>
  );
};

export default BookingPanel;
