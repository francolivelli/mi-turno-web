import branchesService from "../services/branches.js";
import responseHelper from "../helpers/response.helper.js";

const create = async (req, res) => {
  try {
    const { name, email, phone, maxCapacity, startTime, endTime } = req.body;

    console.log(name, email, phone, maxCapacity, startTime, endTime)

    const branch = await branchesService.create({
      name,
      email,
      phone,
      maxCapacity,
      startTime,
      endTime,
    });

    responseHelper.created(res, {
      ...branch._doc,
      id: branch.id,
    });
  } catch {
    responseHelper.error(res);
  }
};

export default { create };
