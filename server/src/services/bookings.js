import mongoose from "mongoose";
import bookingModel from "../models/Booking.js";

// BOOK
const create = async ({ name, email, phone, branch, date, time }) => {
  const { ObjectId } = mongoose.Types;

  const booking = new bookingModel();

  booking.name = name;
  booking.email = email;
  booking.phone = phone;
  booking.branch = ObjectId(branch);
  booking.date = date;
  booking.time = time;

  await booking.save();

  return booking;
};

export default { create };
