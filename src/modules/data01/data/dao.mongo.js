import data from './model.js'
import DaoMongo from '../../../libraries/customs/dao.mongo.js';

export default class Data01DaoMongo extends DaoMongo {
  constructor() {
    super(data)
  }
  createMany = async (newElements) => await this.model.insertMany(newElements)

  getMonths = async (field) => {
    const months = await this.model.aggregate([
    { $project: { month: { $month: `$${field}` } } },
    { $group:   { _id: '$month'  } },
    { $sort:    { _id: 1 } }
    ]); 
    const monthArray = months.map(month => month._id);
    return monthArray;
  }
}

