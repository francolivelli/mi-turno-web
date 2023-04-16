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

export default { create };
