import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    branch: {
      type: String,
      ref: "Branch",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true
    },
  },
  modelOptions
);

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;
