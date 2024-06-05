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

  summary = async (flag, payment_month) => {
    const summary = await this.model.aggregate([
      { $match: { // filtra segun criterio
          flag: flag,
          payment_month: payment_month,
      }},
      { $group: { // agrupa segun forma determinada
          _id: "$payment_date",
          totalAmount: { $sum: "$amount" }
      }},
      { $sort: { _id: 1 }
      }
    ]);
    // REPASAR MODELOS DE AGREGACION
    return summary
  };
}

