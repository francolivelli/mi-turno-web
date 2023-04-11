import branchesService from "../services/branches.js";
import responseHelper from "../helpers/response.helper.js";

// CREATE BRANCH
const create = async (req, res) => {
  try {
    const { name, email, phone, maxCapacity, startTime, endTime } = req.body;

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

// GET BRANCHES
const getAll = async (req, res) => {
  try {
    const branches = await branchesService.getAll();

    responseHelper.ok(res, branches);
  } catch {
    responseHelper.error(res);
  }
};

// GET BRANCH
const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await branchesService.getOne(id);

    responseHelper.ok(res, branch);
  } catch {
    responseHelper.error(res);
  }
};

// UPDATE BRANCH
const update = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { name, email, phone, maxCapacity, startTime, endTime } = req.body;

    const updatedBranch = await branchesService.update(
      id,
      name,
      email,
      phone,
      maxCapacity,
      startTime,
      endTime
    );

    responseHelper.ok(res, updatedBranch);
  } catch {
    responseHelper.error(res);
  }
};

export default { create, getAll, getOne, update };
