import branchModel from "../models/Branch.js";

// CREATE BRANCH
const create = async ({
  name,
  email,
  phone,
  maxCapacity,
  startTime,
  endTime,
}) => {
  const branch = new branchModel();

  branch.name = name;
  branch.email = email;
  branch.phone = phone;
  branch.maxCapacity = maxCapacity;
  branch.startTime = startTime;
  branch.endTime = endTime;

  await branch.save();

  return branch;
};

// GET BRANCHES
const getAll = async () => {
  const branches = await branchModel.find();

  return branches;
};

// GET BRANCH
const getOne = async (id) => {
  const branch = await branchModel.findById(id);

  return branch;
};

// UPDATE BRANCH
const update = async (
  id,
  name,
  email,
  phone,
  maxCapacity,
  startTime,
  endTime,
) => {
  const branch = await branchModel.findById(id);

  if (!branch) return responseHelper.notFound(res);

  branch.name = name || branch.name;
  branch.email = email || branch.email;
  branch.phone = phone || branch.phone;
  branch.maxCapacity = maxCapacity || branch.maxCapacity;
  branch.startTime = startTime || branch.startTime;
  branch.endTime = endTime || branch.endTime;

  return await branch.save();
};

export default { create, getAll, getOne, update };
