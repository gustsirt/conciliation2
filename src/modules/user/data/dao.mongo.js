import DaoMongo from "../../../libraries/customs/dao.mongo.js";
import usersModel from "./model.js";

export default class UserDaoMongo extends DaoMongo{
  constructor() {
    super (usersModel);
  }
  
  get = async (filter = {}, excludePassword = true) => {
    const query = this.model.find(filter);
    if (excludePassword) {
      query.select('-password');
    }
    return await query;
  };
}