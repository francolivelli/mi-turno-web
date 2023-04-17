import bookingModel from "../models/Booking.js";
import branchModel from "../models/Branch.js";
import responseHelper from "../helpers/response.helper.js";

// BOOK
const create = async ({ name, email, phone, branch, date, time }) => {
  const selectedBranch = await branchModel.findById(branch);

  const branchCapacity = selectedBranch.maxCapacity;

  const existingBookingsCount = await bookingModel.countDocuments({
    branch,
    date,
    time,
  });

  if (existingBookingsCount < branchCapacity) {
    const booking = new bookingModel();

    booking.name = name;
    booking.email = email;
    booking.phone = phone;
    booking.branch = branch;
    booking.date = date;
    booking.time = time;

    await booking.save();

    return booking;
  } else {
    responseHelper.error(
      res,
      "La capacidad máxima de la sucursal ha sido alcanzada"
    );
  }
};

// GET BOOKINGS BY BRANCH AND DATE
const getByBranchAndDate = async (branch, date) => {
  const turns = await bookingModel.find({branch, date});

  return turns
};

export default { create, getByBranchAndDate };
