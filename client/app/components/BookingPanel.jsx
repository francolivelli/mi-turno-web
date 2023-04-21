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
import { selectUser } from "../features/userSlice";

const BookingPanel = ({ onBookingSuccess }) => {
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
  const [formCompleted, setFormCompleted] = useState(false);
  const date = useSelector(selectDate);
  const user = useSelector(selectUser);

  const handleSelectBranch = (event) => {
    const selectedValue = event.target.value;
    setSelectedBranch(selectedValue);
    if (selectedValue === "") {
      dispatch(setCurrentStep(1));
    } else {
      axios
        .get(`https://mi-turno-web-api.vercel.app/api/branches/${selectedValue}`)
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
      `https://mi-turno-web-api.vercel.app/api/branches/${selectedBranch}`
    );
    const branchCapacity = branch.data.maxCapacity;

    const bookings = await axios.get(
      `https://mi-turno-web-api.vercel.app/api/bookings/find/${selectedBranch}/${moment(
        date,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD")}`
    );

    const activeBookings = bookings.data.filter((booking) => booking.status);

    const availableTurns = [];

    for (let i = 0; i < turnsArr.length; i++) {
      const turn = turnsArr[i];
      const numBookings = activeBookings.reduce(
        (acc, booking) =>
          moment(booking.time, "HH:mm").format("HH:mm") === turn
            ? acc + 1
            : acc,
        0
      );
      const isCapacityFull = numBookings >= branchCapacity;
      if (!isCapacityFull) {
        availableTurns.push(turn);
      }
    }

    return availableTurns;
  };

  const inputsAreComplete = () => {
    return Object.values(formInputs).every((value) => value !== "");
  };

  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  useEffect(() => {
    const fetchBranches = async () => {
      const res = await axios.get("https://mi-turno-web-api.vercel.app/api/branches");
      setBranches(res.data);
    };
    fetchBranches();
  }, []);

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
    setFormInputs((prevState) => ({
      ...prevState,
      userId: user.id,
      date: date,
      branch: selectedBranch,
      name: user.name,
      phone: user.phone || "",
      email: user.email,
    }));
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "https://mi-turno-web-api.vercel.app/api/bookings",
      formInputs
    );

    if (response.status === 201) {
      const bookingId = response.data.id;
      onBookingSuccess(bookingId);
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
        {currentStep > 2 && (
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
