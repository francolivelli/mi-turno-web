import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  modelOptions
);

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;
