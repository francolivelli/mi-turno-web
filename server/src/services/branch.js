import Branch from "../models/Branch.js";

class BranchService {
  static async getAll() {
    try {
      return await Branch.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getById(id) {
    try {
      return await Branch.findById(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async create(body) {
    try {
      return await Branch.create(body);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async update(id, body) {
    try {
      return await Branch.findByIdAndUpdate(id, body);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default BranchService;
