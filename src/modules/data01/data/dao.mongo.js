import data from './model.js'
import DaoMongo from '../../../libraries/customs/dao.mongo.js';

export default class Data01DaoMongo extends DaoMongo {
  constructor() {
    super(data)
  }
  createMany  = async (newElements) => await this.model.insertMany(newElements)
}

