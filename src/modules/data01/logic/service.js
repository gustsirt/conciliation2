import CustomServiceCsv from "../../../libraries/customs/service.csv.js";
import Data01DaoMongo from "../data/dao.mongo.js";
import TransformOriginData from '../logic/dtos.js'

class Data01Service extends CustomServiceCsv {
  constructor () {
    super(new Data01DaoMongo, TransformOriginData)
  }

  getMonths = async (field) => await this.dao.getMonths(field);

  summary = async (flag, payment_month) => this.dao.summary(flag, payment_month);
}

export default new Data01Service()