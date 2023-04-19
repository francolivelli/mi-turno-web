import bookingModel from "../models/Booking.js";
import branchModel from "../models/Branch.js";
import responseHelper from "../helpers/response.helper.js";

// BOOK
const create = async ({ name, email, phone, branch, date, time, userId }) => {
  const selectedBranch = await branchModel.findById(branch);

  const branchCapacity = selectedBranch.maxCapacity;

  const existingBookingsCount = await bookingModel.countDocuments({
    branch,
    date,
    time,
    status: true,
  });

  if (existingBookingsCount < branchCapacity) {
    const booking = new bookingModel();

    const lastBooking = await bookingModel.findOne().sort({ createdAt: -1 });
    let newNumber = "";
    if (!lastBooking) {
      newNumber = "0000000000000-01";
    } else {
      const lastNumber = lastBooking.number;
      const [block1, block2] = lastNumber.split("-");
      const number = parseInt(block1 + block2, 10) + 1;
      const formattedNumber = number.toString().padStart(15, "0");
      newNumber = `${formattedNumber.slice(0, 13)}-${formattedNumber.slice(
        13,
        15
      )}`;
    }

    booking.name = name;
    booking.email = email;
    booking.phone = phone;
    booking.branch = branch;
    booking.date = date;
    booking.time = time;
    booking.number = newNumber;
    booking.userId = userId;

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
  const turns = await bookingModel.find({ branch, date, status: true });

  return turns;
};

// GET BOOKING
const getOne = async (id) => {
  const booking = await bookingModel.findById(id);

  return booking;
};

// CANCEL BOOKING
const cancel = async (id, cancelReason) => {
  const booking = await bookingModel.findById(id);

  booking.status = false;
  booking.cancelReason = cancelReason;

  await booking.save();

  return booking;
};

// GET BOOKINGS BY USER
const getAllOfUser = async (userId) => {
  const bookings = await bookingModel.find({ userId, status: true });

  return bookings;
};

export default { create, getByBranchAndDate, getOne, cancel, getAllOfUser };
