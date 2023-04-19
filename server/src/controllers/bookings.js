import bookingsService from "../services/bookings.js";
import responseHelper from "../helpers/response.helper.js";
import nodemailer from "nodemailer";
import branchesService from "../services/branches.js";

// BOOK
const create = async (req, res) => {
  try {
    const { name, email, phone, branch, date, time, userId } = req.body;

    const newBooking = await bookingsService.create({
      name,
      email,
      phone,
      branch,
      date,
      time,
      userId,
    });

    const selectedBranch = await branchesService.getOne(branch);

    // Configurar nodemailer para enviar el correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Definir las opciones del correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Detalles de la reserva",
      text: `Hola,\n\nNos complace confirmar que hemos registrado su reserva.\n\nPor favor, revise los detalles de la misma a continuación:\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nSucursal: ${selectedBranch.name}\nFecha: ${date}\nHora: ${time}\n\n¡Gracias por utilizar nuestro servicio!\n\nAtentamente,\nMi Turno Web`,
    };

    // Enviar correo electrónico
    transporter.sendMail(mailOptions);

    responseHelper.created(res, {
      ...newBooking._doc,
      id: newBooking.id,
    });
  } catch {
    responseHelper.error(res);
  }
};

// GET BOOKINGS BY BRANCH AND DATE
const getByBranchAndDate = async (req, res) => {
  try {
    const { branch, date } = req.params;

    const dateParts = date.split("-");
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    const turns = await bookingsService.getByBranchAndDate(
      branch,
      formattedDate
    );

    responseHelper.ok(res, turns);
  } catch {
    responseHelper.error(res);
  }
};

// GET BOOKING
const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await bookingsService.getOne(id);

    responseHelper.ok(res, booking);
  } catch {
    responseHelper.error(res);
  }
};

// CANCEL BOOKING
const cancel = async (req, res) => {
  try {
    const { id } = req.params;

    const { cancelReason } = req.body;

    await bookingsService.cancel(id, cancelReason);

    responseHelper.ok(res);
  } catch {
    responseHelper.error(res);
  }
};

// GET BOOKINGS BY USER
const getAllOfUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await bookingsService.getAllOfUser(userId);

    responseHelper.ok(res, bookings);
  } catch {
    responseHelper.error(res);
  }
};

export default { create, getByBranchAndDate, getOne, cancel, getAllOfUser };
