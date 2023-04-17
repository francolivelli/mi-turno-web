import bookingsService from "../services/bookings.js";
import responseHelper from "../helpers/response.helper.js";

// BOOK
const create = async (req, res) => {
  try {
    const { name, email, phone, branch, date, time } = req.body;

    const newBooking = await bookingsService.create({
      name,
      email,
      phone,
      branch,
      date,
      time,
    });

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

    responseHelper.ok(res, turns)
  } catch {
    responseHelper.error(res);
  }
};

export default { create, getByBranchAndDate };
