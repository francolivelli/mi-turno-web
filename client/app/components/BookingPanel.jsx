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
import { selectDate } from "../features/dateSlice";
import { useRouter } from "next/navigation";
import { selectUser } from "../features/userSlice";

const BookingPanel = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [formInputs, setFormInputs] = useState({
    branch: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [turns, setTurns] = useState([]);
  const date = useSelector(selectDate);
  const user = useSelector(selectUser);
  const router = useRouter();

  console.log(formInputs)

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

  const generateTurns = async (start, end, date, selectedBranch) => {
    const startTime = moment(start, "HH:mm");
    const endTime = moment(end, "HH:mm");
    const diff = endTime.diff(startTime, "minutes");
    const numTurns = Math.floor((diff - 15) / 15) + 1;
    const turnsArr = [...Array(numTurns).keys()].map((i) =>
      moment(startTime)
        .add(i * 15, "minutes")
        .format("HH:mm")
    );

    const branch = await axios.get(
      `http://localhost:5000/api/branches/${selectedBranch}`
    );

    const branchCapacity = branch.data.maxCapacity;

    const bookings = await axios.get(
      `http://localhost:5000/api/bookings/find/${selectedBranch}/${moment(
        date,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD")}`
    );

    const availableTurns = [];

    for (let i = 0; i < turnsArr.length; i++) {
      const turn = turnsArr[i];

      // Verificar si hay una reserva en este turno
      const booking = bookings.data.find(
        (booking) => moment(booking.time, "HH:mm").format("HH:mm") === turn
      );

      // Verificar si la capacidad de la sucursal está llena en este turno
      const numBookings = bookings.data.filter(
        (booking) => moment(booking.time, "HH:mm").format("HH:mm") === turn
      ).length;
      const isCapacityFull = numBookings >= branchCapacity;

      if (!booking && !isCapacityFull) {
        availableTurns.push(turn);
      }
    }

    return availableTurns;
  };

  useEffect(() => {
    const generateNewTurns = async () => {
      if (startTime && endTime && date && selectedBranch) {
        const newTurns = await generateTurns(
          startTime,
          endTime,
          date,
          selectedBranch
        );
        setTurns(newTurns);
      }
    };
    generateNewTurns();
  }, [startTime, endTime, date, selectedBranch]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setFormInputs({
        userId: user.id,
        date: date,
        branch: selectedBranch,
        name: userData.name,
        phone: userData.phone || "",
        email: userData.email,
      });
    }
  }, [date, selectedBranch]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "http://localhost:5000/api/bookings",
      formInputs
    );

    if (response.status === 201) {
      const bookingId = response.data.id;
      router.push(`/bookings/confirmation?id=${bookingId}`);
    }
  };

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
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="input__field">
          <label className="input__label">Sucursal</label>
          <select
            className="input"
            required
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
                required
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
                  required
                  name="name"
                  value={formInputs.name}
                  onChange={handleInput}
                />
              </div>
              <div className="input__field">
                <label className="input__label">Teléfono</label>
                <input
                  className="input"
                  required
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
                required
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
