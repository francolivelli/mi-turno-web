import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    maxShifts: {
      type: Number,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  modelOptions
);

const branchModel = mongoose.model("Branch", branchSchema);

export default branchModel;
