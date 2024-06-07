import data from './model.js'
import DaoMongo from '../../../libraries/customs/dao.mongo.js';

export default class Data02DaoMongo extends DaoMongo {
  constructor() {
    super(data)
  }
  createMany  = async (newElements) => await this.model.insertMany(newElements)

  summary = async (match) => {
    const summary = await this.model.aggregate([
      { $match: match },
      { $group: { // agrupa segun forma determinada
          _id: {
            flag: "$flag",
            payment_date: "$payment_date"
          },
          totalAmount: { $sum: "$amount" }
      }},
      {
        $sort: { "_id.payment_date": 1 }
      }
    ]);
    return summary
  }
}

