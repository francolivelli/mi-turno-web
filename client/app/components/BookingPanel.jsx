"use client";
import ProgressBar from "./ProgressBar";
import styles from "../../styles/components/GeneralForm.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentStep, setCurrentStep } from "../features/stepSlice";
import { useMediaQuery } from "react-responsive";
import Calendar from "./Calendar";
import axios from "axios";
import moment from "moment";

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
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [turns, setTurns] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      const res = await axios.get("http://localhost:5000/api/branches");
      setBranches(res.data);
    };
    fetchBranches();
  }, []);

  const handleSelectBranch = (event) => {
    const selectedValue = event.target.value;
    setSelectedBranch(selectedValue);
    if (selectedValue === "") {
      dispatch(setCurrentStep(1));
    } else {
      axios
        .get(`http://localhost:5000/api/branches/${selectedValue}`)
        .then((response) => {
          setStartTime(response.data.startTime);
          setEndTime(response.data.endTime);
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(setCurrentStep(2));
    }
  };

  const generateTurns = (start, end) => {
    const startTime = moment(start, "HH:mm");
    const endTime = moment(end, "HH:mm");
    const diff = endTime.diff(startTime, "minutes");
    const numTurns = Math.floor((diff - 15) / 15) + 1;
    const turnsArr = [...Array(numTurns).keys()].map((i) =>
      moment(startTime)
        .add(i * 15, "minutes")
        .format("HH:mm")
    );
    return turnsArr;
  };

  useEffect(() => {
    if (startTime && endTime) {
      const newTurns = generateTurns(startTime, endTime);
      setTurns(newTurns);
    }
  }, [startTime, endTime]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setFormInputs({
        time: "",
        name: userData.name,
        phone: userData.phone || "",
        email: userData.email,
      });
    }
  }, []);

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

  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <div className={styles.container__bp}>
      <div className={styles.header__bp}>
        <h3 className={styles.title__bp}>Reserva</h3>
        {currentStep === 1 && (
          <p className={styles.text__bp}>Seleccioná tu sucursal</p>
        )}
        {currentStep === 2 && (
          <p className={styles.text__bp}>Seleccioná el día en el calendario</p>
        )}
        {currentStep === 3 && (
          <p className={styles.text__bp}>Completá el formulario</p>
        )}
      </div>
      <ProgressBar step={currentStep} />
      <form className={styles.form}>
        <div className="input__field">
          <label className="input__label">Sucursal</label>
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
        {currentStep > 1 && !isDesktop && (
          <div className={styles.calendar}>
            <Calendar />
          </div>
        )}
        {currentStep === 3 && (
          <>
            <div className="input__field">
              <label className="input__label">Horario</label>
              <select
                className="input"
                name="time"
                value={formInputs.time}
                onChange={handleInput}>
                <option value="" />
                {turns.map((turn, index) => (
                  <option key={index} value={turn}>
                    {turn}
                  </option>
                ))}
              </select>
            </div>
            <div className="input__rowContainer">
              <div className="input__field">
                <label className="input__label">Nombre y Apellido</label>
                <input
                  className="input"
                  name="name"
                  value={formInputs.name}
                  onChange={handleInput}
                />
              </div>
              <div className="input__field">
                <label className="input__label">Teléfono</label>
                <input
                  className="input"
                  name="phone"
                  value={formInputs.phone}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="input__field">
              <label className="input__label">Mail</label>
              <input
                className="input"
                name="email"
                value={formInputs.email}
                onChange={handleInput}
              />
            </div>
          </>
        )}
        <button
          className="btn-primary"
          style={{ width: "fit-content", marginTop: "10px" }}
          disabled={!inputsAreComplete()}>
          Confirmar reserva
        </button>
      </form>
    </div>
  );
};

export default BookingPanel;
