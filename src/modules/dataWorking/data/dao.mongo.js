import DaoMongo from '../../../libraries/customs/dao.mongo.js';
import model from './model.js';

export default class WorkingFile extends DaoMongo {
  constructor() {
    super(model)
  }
}

