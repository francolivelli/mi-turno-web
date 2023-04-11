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

  await branch.save()

  return branch
};

export default { create };
